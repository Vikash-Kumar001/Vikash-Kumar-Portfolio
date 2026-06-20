import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/default
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { sendContactEmail } from './server/sendContactEmail.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function contactApiDevPlugin(env) {
  return {
    name: 'dev-contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url !== '/api/contact') {
          return next();
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          return next();
        }

        try {
          const body = await readRequestBody(req);
          const result = await sendContactEmail(body, {
            RESEND_API_KEY: env.RESEND_API_KEY,
            CONTACT_RECIPIENT_EMAIL: env.CONTACT_RECIPIENT_EMAIL,
            CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
          });

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (!result.ok) {
            res.statusCode = result.status ?? 500;
            res.end(JSON.stringify({ error: result.error }));
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: 'Message sent successfully.' }));
        } catch (error) {
          console.error('Contact API dev error:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactApiDevPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion', 'gsap'],
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});
