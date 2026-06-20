import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/about#experience', label: 'Experience' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-surface-secondary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,88,12,0.06),transparent_40%)] pointer-events-none" />

      <div className="relative page-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-2xl font-semibold text-[var(--color-text)] mb-4">
                Vikash Kumar<span className="text-primary">.</span>
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 max-w-md">
                Full-stack SaaS developer crafting scalable products with React, Node.js, and production-grade
                engineering practices.
              </p>

              <div className="flex gap-3">
                {[
                  {
                    href: 'https://github.com/Vikash-Kumar001',
                    label: 'GitHub',
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    ),
                  },
                  {
                    href: 'https://www.linkedin.com/in/vikash-kumar-2068b9219/',
                    label: 'LinkedIn',
                    icon: (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    ),
                  },
                  {
                    href: 'mailto:vikashkumarsudhi8527@gmail.com',
                    label: 'Email',
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    ),
                    stroke: true,
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-primary/50 hover:text-primary text-[var(--color-text-muted)] transition-all"
                    data-cursor="pointer"
                    whileHover={{ y: -2 }}
                    aria-label={social.label}
                  >
                    <svg className="w-5 h-5" fill={social.stroke ? 'none' : 'currentColor'} stroke={social.stroke ? 'currentColor' : undefined} viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-5">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[var(--color-text-muted)] hover:text-primary transition-colors text-sm"
                    data-cursor="pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-5">Contact</h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
              <li>
                <a href="mailto:vikashkumarsudhi8527@gmail.com" className="hover:text-primary transition-colors" data-cursor="pointer">
                  vikashkumarsudhi8527@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918595654823" className="hover:text-primary transition-colors" data-cursor="pointer">
                  +91 8595654823
                </a>
              </li>
              <li>Gurugram, Haryana, India</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[var(--color-text-muted)] text-sm">
            &copy; {currentYear} Vikash Kumar. All rights reserved.
          </p>
          <p className="text-[var(--color-text-muted)] text-sm">Designed & built with intention.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
