import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';

import ProjectCard from '@/components/ProjectCard/ProjectCard';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import SplitHeading from '@/components/SplitHeading/SplitHeading';
import { trackProjectView } from '@/lib/analytics';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

const sampleProjects = [
  {
    id: 3,
    category: 'SaaS',
    title: 'AI Usage Discovery & Shadow AI Risk Dashboard',
    description:
      'B2B SaaS platform that detects which AI tools employees use inside an organization via a privacy-first Chrome extension.',
    fullDescription:
      'Built a B2B SaaS platform that detects which AI tools employees use inside an organization via a privacy-first Chrome browser extension. Developed multi-tenant backend with FastAPI and PostgreSQL covering organizations, users, departments, AI tool catalog, sessions, and event ingestion. Built Shadow AI detection with rule-based risk scoring (0–100) across tools, users, and departments. Designed event-driven architecture where browser activity generates structured events powering analytics, alerts, and reports.',
    image: null,
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React.js', 'Tailwind CSS', 'SQLAlchemy', 'Alembic'],
    links: { live: 'https://shadowsnitch.vercel.app/' },
  },
  {
    id: 1,
    category: 'Full-Stack',
    title: 'StareX | Real-Time Chat Application',
    description: 'Full-stack real-time chat with Socket.io, JWT auth, and MongoDB message persistence.',
    fullDescription:
      'Built a full-stack real-time chat application with Socket.io enabling instant bidirectional messaging, JWT-based auth, and MongoDB message persistence. Implemented secure login, protected routes, and session management. Designed a clean, responsive UI with Tailwind CSS featuring real-time message delivery, chat history, and intuitive navigation.',
    image: null,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.io', 'Tailwind CSS', 'JWT'],
    links: {
      live: 'https://starex-hub.onrender.com/',
      github: 'https://github.com/Vikash-Kumar001/starex-hub',
    },
  },
  {
    id: 2,
    category: 'Full-Stack',
    title: 'College Complaint Management System',
    description:
      'A full-stack complaint management system with separate dashboards for admins, resolvers, and students.',
    fullDescription:
      'Created a full-stack complaint management system that lets students file complaints, track status, and receive feedback. Separate dashboards for admins, resolvers, and students with JWT auth, attachments, assignment workflows, and real-time Socket.io notifications.',
    image: null,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.io', 'JWT', 'Framer Motion'],
    links: {
      live: 'https://complaint-management.vercel.app',
      github: 'https://github.com/Vikash-Kumar001/College-Complaint-Management',
    },
  },
];

const filters = ['All', 'SaaS', 'Full-Stack'];

const processSteps = [
  {
    title: 'Discover',
    description: 'Understand the problem, users, and constraints before writing a single line of code.',
  },
  {
    title: 'Architect',
    description: 'Design scalable data models, APIs, and system boundaries for long-term maintainability.',
  },
  {
    title: 'Build',
    description: 'Ship iteratively with clean code, thoughtful UI, and production-ready patterns.',
  },
  {
    title: 'Deploy',
    description: 'Configure cloud infrastructure, monitoring, and reliable release workflows.',
  },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [autoOpenId, setAutoOpenId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return sampleProjects;
    return sampleProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    initScrollAnimations();

    const projectId = searchParams.get('project');
    if (projectId) {
      const id = parseInt(projectId, 10);
      const project = sampleProjects.find((p) => p.id === id);
      if (project) {
        const timer = setTimeout(() => {
          setAutoOpenId(id);
          document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
        return () => {
          clearTimeout(timer);
          cleanupScrollAnimations();
        };
      }
    }

    return () => cleanupScrollAnimations();
  }, [searchParams]);

  const clearDeepLink = () => {
    setSearchParams({});
    setAutoOpenId(null);
  };

  return (
    <div className="min-h-screen bg-surface">
      <section className="inner-hero">
        <div className="page-container">
          <SectionReveal>
            <span className="section-label">Portfolio</span>
            <SplitHeading as="h1" className="inner-hero-title" lead="Selected" accent="work" />
            <p className="inner-hero-lead">
              Production applications spanning B2B SaaS, real-time systems, and full-stack platforms — each built
              with scalability, polish, and user experience at the center.
            </p>

            <div className="projects-hero-meta">
              <div className="projects-hero-stat">
                <strong>{sampleProjects.length}</strong>
                <span>Projects</span>
              </div>
              <div className="projects-hero-stat">
                <strong>100%</strong>
                <span>Deployed</span>
              </div>
              <div className="projects-hero-stat">
                <strong>SaaS</strong>
                <span>Specialization</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section bg-surface-secondary" id="projects-grid">
        <div className="page-container">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <span className="section-label">Case Studies</span>
                <SplitHeading as="h2" className="section-heading mb-0" lead="Featured" accent="projects" />
              </div>
              <div className="filter-pills mb-0">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                    data-cursor="pointer"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {filteredProjects.length === 0 ? (
            <p className="text-[var(--color-text-muted)] text-center py-16">No projects in this category yet.</p>
          ) : (
            <div className="projects-bento">
              {filteredProjects.map((project, index) => (
                <SectionReveal key={project.id} delay={index * 0.08} className="h-full">
                  <ProjectCard
                    project={project}
                    featured={index === 0 && activeFilter === 'All'}
                    autoOpen={autoOpenId === project.id}
                    onView={() => trackProjectView(project.title)}
                    onOpen={clearDeepLink}
                  />
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionReveal>
            <span className="section-label">Process</span>
            <SplitHeading as="h2" className="section-heading" lead="How I build" accent="products" />
            <p className="max-w-2xl text-[var(--color-text-muted)] text-base leading-relaxed mb-12">
              A disciplined approach from discovery to deployment — ensuring every project ships with quality and
              intention.
            </p>
          </SectionReveal>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <SectionReveal key={step.title} delay={index * 0.08} className="h-full">
                <div className="process-step h-full">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-surface-secondary">
        <div className="page-container">
          <SectionReveal>
            <div className="editorial-card p-10 sm:p-14 text-center">
              <span className="section-label justify-center mb-5">Collaborate</span>
              <SplitHeading
                as="h2"
                className="section-heading mb-4"
                lead="Have a product"
                accent="in mind?"
              />
              <p className="max-w-xl mx-auto text-[var(--color-text-muted)] mb-8">
                I&apos;m open to full-time roles, contract work, and ambitious product builds. Let&apos;s talk about
                what you&apos;re creating.
              </p>
              <Link to="/contact" className="btn-primary" data-cursor="pointer">
                Start a conversation
                <HiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Projects;
