import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiArrowUpRight,
  HiBriefcase,
  HiCalendarDays,
  HiClock,
  HiCodeBracket,
  HiEnvelope,
  HiGlobeAlt,
  HiLightBulb,
  HiMapPin,
  HiPhone,
  HiRocketLaunch,
} from 'react-icons/hi2';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import SectionReveal from '@/components/SectionReveal/SectionReveal';
import SplitHeading from '@/components/SplitHeading/SplitHeading';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';
import { trackFormSubmission } from '@/lib/analytics';
import { sendContactMessage } from '@/lib/contactService';

const collaborationTypes = [
  {
    icon: HiBriefcase,
    title: 'Full-time roles',
    description: 'Product engineering teams building SaaS at scale.',
  },
  {
    icon: HiRocketLaunch,
    title: 'Freelance projects',
    description: 'Scoped builds, MVPs, and feature delivery.',
  },
  {
    icon: HiLightBulb,
    title: 'Consulting',
    description: 'Architecture reviews, UI audits, and technical guidance.',
  },
  {
    icon: HiCodeBracket,
    title: 'Open source',
    description: 'Meaningful contributions and community projects.',
  },
];

const contactHighlights = [
  { icon: HiClock, label: 'Response time', value: 'Within 24 hours' },
  { icon: HiGlobeAlt, label: 'Availability', value: 'Remote worldwide' },
  { icon: HiMapPin, label: 'Timezone', value: 'IST (UTC+5:30)' },
];

const faqs = [
  {
    icon: HiClock,
    q: 'What is your typical response time?',
    a: 'I respond to all inquiries within 24 hours on business days.',
  },
  {
    icon: HiGlobeAlt,
    q: 'Are you open to remote work?',
    a: 'Yes — I have extensive experience working remotely with distributed teams.',
  },
  {
    icon: HiCodeBracket,
    q: 'What kind of projects do you prefer?',
    a: 'SaaS products, full-stack platforms, and projects where UI quality matters.',
  },
  {
    icon: HiCalendarDays,
    q: 'Can we schedule a call?',
    a: 'Absolutely. Send a message with your availability and I will set up a time.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initScrollAnimations();
    return () => cleanupScrollAnimations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await sendContactMessage(formData);
      setStatus({
        type: 'success',
        message: 'Thank you! Your message was sent — I will get back to you within 24 hours.',
      });
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      trackFormSubmission('contact');
    } catch (error) {
      console.error('Error sending contact message:', error);
      setStatus({
        type: 'error',
        message:
          error.userMessage ||
          error.message ||
          'Sorry, there was an error sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface contact-page">
      <section className="inner-hero contact-hero">
        <div className="page-container">
          <SectionReveal className="contact-header">
            <div className="contact-header-eyebrow">
              <span className="section-label contact-section-label">Contact</span>
              <span className="availability-badge contact-availability-badge">Open to opportunities</span>
            </div>

            <div className="contact-header-copy">
              <SplitHeading
                as="h1"
                className="inner-hero-title contact-hero-title"
                lead="Let's build"
                accent="something great"
              />
              <p className="inner-hero-lead contact-hero-lead">
                Whether you have a product idea, a role to fill, or a technical challenge — I&apos;d love to hear
                from you. Every great collaboration starts with a conversation.
              </p>
            </div>

            <div className="contact-header-aside">
              {contactHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="contact-highlight">
                    <span className="contact-highlight-icon">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="contact-highlight-label">{item.label}</span>
                      <span className="contact-highlight-value">{item.value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12} className="contact-studio">
            <div className="contact-studio-services">
              <img
                src="/images/contact-character.png"
                alt="Friendly developer character waving hello"
                className="contact-studio-character"
                loading="lazy"
              />
              <div className="contact-studio-services-head">
                <span className="contact-studio-kicker">Ways to collaborate</span>
                <p>Choose the engagement model that fits your goals.</p>
              </div>
              <div className="contact-services-grid">
                {collaborationTypes.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="contact-service-card">
                      <span className="contact-service-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="contact-service-icon">
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="contact-studio-main">
              <div className="contact-details">
                <div className="contact-panel-head">
                  <span className="contact-panel-kicker">Direct channels</span>
                  <h2>Get in touch</h2>
                  <p>Reach out directly or connect on social platforms.</p>
                </div>

                <div className="contact-channel-list">
                  <a href="mailto:vikashkumarsudhi8527@gmail.com" className="contact-channel" data-cursor="pointer">
                    <span className="contact-channel-icon">
                      <HiEnvelope className="w-4 h-4" />
                    </span>
                    <span className="contact-channel-body">
                      <span className="contact-channel-label">Email</span>
                      <span className="contact-channel-value">vikashkumarsudhi8527@gmail.com</span>
                    </span>
                  </a>
                  <a href="tel:+918595654823" className="contact-channel" data-cursor="pointer">
                    <span className="contact-channel-icon">
                      <HiPhone className="w-4 h-4" />
                    </span>
                    <span className="contact-channel-body">
                      <span className="contact-channel-label">Phone</span>
                      <span className="contact-channel-value">+91 8595654823</span>
                    </span>
                  </a>
                  <div className="contact-channel contact-channel-static">
                    <span className="contact-channel-icon">
                      <HiMapPin className="w-4 h-4" />
                    </span>
                    <span className="contact-channel-body">
                      <span className="contact-channel-label">Location</span>
                      <span className="contact-channel-value">Gurugram, Haryana, India</span>
                    </span>
                  </div>
                </div>

                <div className="contact-social-row">
                  <a
                    href="https://github.com/Vikash-Kumar001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    data-cursor="pointer"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vikash-kumar-2068b9219/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    data-cursor="pointer"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="contact-form-panel" id="contact-message">
                <div className="contact-panel-head">
                  <span className="contact-panel-kicker">Message</span>
                  <h2>Send a message</h2>
                  <p>Share a few details and I&apos;ll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Project inquiry, role, collaboration..."
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Tell me about your project, timeline, and goals..."
                    />
                  </div>

                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl mb-3 text-sm ${
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
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                    {!isSubmitting && <HiArrowUpRight className="w-4 h-4" />}
                  </MagneticButton>
                </form>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section contact-faq-section">
        <div className="page-container">
          <SectionReveal>
            <span className="section-label">FAQ</span>
            <SplitHeading as="h2" className="section-heading" lead="Common" accent="questions" />
            <p className="about-section-lead">
              Quick answers before you reach out — though I&apos;m always happy to discuss specifics.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="contact-faq">
            <div className="contact-faq-list">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <article key={faq.q} className="contact-faq-item">
                    <div className="contact-faq-item-top">
                      <span className="contact-faq-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="contact-faq-icon">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </article>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
