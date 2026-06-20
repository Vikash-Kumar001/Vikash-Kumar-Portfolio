import { sendContactEmail } from '../server/sendContactEmail.js';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function readNodeBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      resolve(req.body);
      return;
    }

    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : null);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await readNodeBody(req);

    if (!body) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const result = await sendContactEmail(body);

    if (!result.ok) {
      return res.status(result.status ?? 500).json({ error: result.error });
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
