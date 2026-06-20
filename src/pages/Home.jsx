import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpRight, HiArrowDownTray } from 'react-icons/hi2';
import {
  HiCloud,
  HiCodeBracket,
  HiPencilSquare,
  HiRocketLaunch,
} from 'react-icons/hi2';
import ExpertiseCard from '@/components/ExpertiseCard/ExpertiseCard';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import TechIcon from '@/components/TechIcon/TechIcon';
import { techStack } from '@/data/techStack';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

const expertise = [
  {
    icon: HiRocketLaunch,
    title: 'SaaS Development',
    description: 'Multi-tenant products, billing flows, and production-grade feature delivery.',
    action: '/projects',
  },
  {
    icon: HiCodeBracket,
    title: 'Full-Stack Expertise',
    description: 'React, Node.js, REST APIs, and real-time systems built for scale.',
    action: '/about',
  },
  {
    icon: HiCloud,
    title: 'Cloud & DevOps',
    description: 'AWS EC2 deployments, Nginx, PM2, and reliable production operations.',
    action: '/about#experience',
  },
  {
    icon: HiPencilSquare,
    title: 'Clean Code',
    description: 'Maintainable architecture, RBAC, and thoughtful interface craftsmanship.',
    action: '/projects',
  },
];

const featuredProjects = [
  {
    id: 3,
    category: 'SaaS',
    title: 'ShadowSnitch',
    description: 'B2B SaaS platform for AI usage discovery and Shadow AI risk scoring across organizations.',
    tech: 'FastAPI · PostgreSQL · React.js',
    link: '/projects?project=3',
  },
  {
    id: 1,
    category: 'Full-Stack',
    title: 'StareX Chat',
    description: 'Real-time messaging application with JWT auth and MongoDB persistence.',
    tech: 'React.js · Node.js · Socket.io',
    link: '/projects?project=1',
  },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initScrollAnimations();
    return () => cleanupScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <section className="hero-editorial">
        <div className="page-container">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">Full-Stack SaaS Developer</span>
              <h1>Vikash Kumar</h1>
              <p className="hero-tagline">I build scalable SaaS products that solve real problems.</p>
              <p className="hero-description">
                Full-stack developer with production experience across Wise Student, Inavora, and
                enterprise-grade web platforms. I specialize in React, Node.js, AWS, MongoDB, real-time
                systems, and polished interfaces that feel premium from the first interaction.
              </p>

              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => navigate('/projects')}
                  data-cursor="pointer"
                >
                  See Projects
                  <HiArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href="/resume/Vikash-Kumar-Fullstack-Resume.pdf"
                  download
                  className="btn-text"
                  data-cursor="pointer"
                >
                  <HiArrowDownTray className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-portrait-glow" aria-hidden="true" />
              <div className="hero-portrait-wrap">
                <img
                  src="/images/vikash-image.png"
                  alt="Vikash Kumar - Full-Stack SaaS Developer"
                  className="hero-portrait"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hero-portrait-fallback" aria-hidden="true">
                  <span className="hero-portrait-fallback-initials">VK</span>
                </div>
              </div>
              <p className="hero-portrait-caption">
                Building digital products users love since 2021
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-section hero-expertise-section">
        <div className="page-container">
          <div className="expertise-grid">
            {expertise.map((item, index) => (
              <ExpertiseCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index}
                onClick={() => navigate(item.action)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section home-section">
        <div className="page-container">
          <SectionReveal>
            <span className="section-label">Featured Work</span>
            <h2 className="section-heading">Recent projects</h2>
            <p className="about-section-lead">
              Production-ready applications spanning SaaS dashboards, real-time systems, and full-stack platforms.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="home-featured-grid">
              {featuredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  className="home-featured-card group"
                  onClick={() => navigate(project.link)}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  data-cursor="pointer"
                >
                  <div className="home-featured-card-top">
                    <span className="home-featured-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="home-featured-category">{project.category}</span>
                    <HiArrowUpRight className="home-featured-arrow w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="home-featured-title">{project.title}</h3>
                  <p className="home-featured-description">{project.description}</p>
                  <p className="home-featured-tech">{project.tech}</p>
                </motion.button>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <div className="about-skills-cta">
              <button type="button" className="btn-outline" onClick={() => navigate('/projects')} data-cursor="pointer">
                View all projects
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionReveal>
            <span className="section-label">Tech Stack</span>
            <h2 className="section-heading">Tools I build with</h2>
            <p className="max-w-2xl text-[var(--color-text-muted)] text-base sm:text-lg leading-relaxed mb-10">
              Official, recognizable technologies chosen for performance, scalability, and maintainability.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
            {techStack.map((tech, index) => (
              <SectionReveal key={tech.name} delay={index * 0.04}>
                <TechIcon name={tech.name} Icon={tech.Icon} color={tech.color} index={index} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-surface-secondary">
        <div className="page-container">
          <SectionReveal>
            <div className="editorial-card p-8 sm:p-12 text-center">
              <span className="section-label justify-center mb-5">Let&apos;s work together</span>
              <h2 className="section-heading mb-4">Ready to build something exceptional?</h2>
              <p className="max-w-2xl mx-auto text-[var(--color-text-muted)] text-base sm:text-lg leading-relaxed mb-8">
                Open to full-time roles, freelance collaborations, and product-focused engineering opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button type="button" className="btn-primary" onClick={() => navigate('/contact')} data-cursor="pointer">
                  Start a conversation
                </button>
                <button type="button" className="btn-outline" onClick={() => navigate('/about')} data-cursor="pointer">
                  Learn more about me
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
