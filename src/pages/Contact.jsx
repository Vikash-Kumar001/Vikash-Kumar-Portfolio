import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';
import { trackFormSubmission } from '@/lib/analytics';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initScrollAnimations();

    // Initialize EmailJS
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }

    return () => {
      cleanupScrollAnimations();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Valid email is required' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const recipientEmail = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL || 'vikashkumarsudhi8527@gmail.com';

      // Fallback to Formspree if EmailJS is not configured
      if (!serviceId || !templateId || !publicKey) {
        const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
        if (formspreeId) {
          const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
            trackFormSubmission('contact');
            return;
          } else {
            throw new Error('Submission failed');
          }
        } else {
          throw new Error('Email service not configured. Please set up EmailJS or Formspree.');
        }
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Contact Form Submission',
        message: formData.message,
        to_email: recipientEmail,
      };

      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (response.status === 200) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent. I will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        trackFormSubmission('contact');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Sorry, there was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Let&apos;s Connect
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
                Have a project in mind? Let&apos;s collaborate and bring your ideas to life. I&apos;m always open to 
                discussing new opportunities and interesting projects.
              </p>
            </div>
          </SectionReveal>

          {/* Main Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Contact Form */}
            <SectionReveal delay={0.2}>
              <div className="glass p-6 sm:p-8 rounded-2xl border border-neutral-800/50">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-3 text-neutral-300">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/10 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-black placeholder:text-neutral-500 transition-all backdrop-blur-sm"
                        style={{ color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                        placeholder="Your name"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-3 text-neutral-300">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/10 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-black placeholder:text-neutral-500 transition-all backdrop-blur-sm"
                        style={{ color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                        placeholder="your.email@example.com"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-3 text-neutral-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white/10 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-black placeholder:text-neutral-500 transition-all backdrop-blur-sm"
                      style={{ color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-3 text-neutral-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3.5 bg-white/10 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-black placeholder:text-neutral-500 resize-none transition-all backdrop-blur-sm"
                      style={{ color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      placeholder="Tell me about your project..."
                      aria-required="true"
                    />
                  </div>

                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl ${
                        status.type === 'success'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                      role="alert"
                    >
                      {status.message}
                    </motion.div>
                  )}

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </MagneticButton>
                </form>
              </div>
            </SectionReveal>

            {/* Contact Info */}
            <SectionReveal delay={0.4}>
              <div className="glass p-8 rounded-2xl border border-neutral-800/50 flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Feel free to reach out through any of these channels. I typically respond within 24 hours.
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                  {/* Email */}
                  <motion.a
                    href="mailto:vikashkumarsudhi8527@gmail.com"
                    className="group glass p-4 rounded-xl border border-neutral-800/50 flex items-start gap-3 hover:border-primary/50 transition-all"
                    data-cursor="pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold mb-1 text-white">Email</h3>
                      <p className="text-xs text-neutral-400 group-hover:text-primary transition-colors break-words">
                        vikashkumarsudhi8527@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  {/* Phone */}
                  <motion.a
                    href="tel:+918595654823"
                    className="group glass p-4 rounded-xl border border-neutral-800/50 flex items-start gap-3 hover:border-primary/50 transition-all"
                    data-cursor="pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-1 text-white">Phone</h3>
                      <p className="text-xs text-neutral-400 group-hover:text-primary transition-colors">
                        +91 8595654823
                      </p>
                    </div>
                  </motion.a>

                  {/* Location */}
                  <div className="group glass p-4 rounded-xl border border-neutral-800/50 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-1 text-white">Location</h3>
                      <p className="text-xs text-neutral-400">
                        Gurugram, Haryana, India
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="glass p-4 rounded-xl border border-neutral-800/50 mt-4">
                    <h3 className="text-sm font-semibold mb-3 text-white">Follow Me</h3>
                    <div className="flex gap-3">
                      <motion.a
                        href="https://github.com/Vikash-Kumar001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 glass p-3 rounded-lg border border-neutral-800/50 text-center hover:border-primary/50 transition-all"
                        data-cursor="pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5 mx-auto mb-1.5 text-neutral-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-neutral-400 group-hover:text-primary transition-colors">GitHub</span>
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/vikash-kumar-2068b9219/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 glass p-3 rounded-lg border border-neutral-800/50 text-center hover:border-primary/50 transition-all"
                        data-cursor="pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5 mx-auto mb-1.5 text-neutral-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-xs text-neutral-400 group-hover:text-primary transition-colors">LinkedIn</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

