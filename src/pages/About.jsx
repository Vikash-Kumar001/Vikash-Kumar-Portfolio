import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiArrowUpRight,
  HiBriefcase,
  HiCircleStack,
  HiMapPin,
  HiSparkles,
} from 'react-icons/hi2';

import ResumeButton from '@/components/ResumeButton/ResumeButton';
import CertificateCard from '@/components/CertificateCard/CertificateCard';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import TechIcon from '@/components/TechIcon/TechIcon';
import { certifications } from '@/data/certifications';
import { aboutConcepts, aboutSkillCategories, resolveTech } from '@/data/techStack';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

const principles = [
  {
    icon: HiSparkles,
    title: 'Craft with intent',
    description: 'Every interface decision should feel deliberate — typography, spacing, and motion included.',
  },
  {
    icon: HiCircleStack,
    title: 'Build for scale',
    description: 'Multi-tenant architecture, RBAC, and event-driven systems designed for real production load.',
  },
  {
    icon: HiArrowUpRight,
    title: 'Ship with confidence',
    description: 'From Razorpay webhooks to AWS deployments — features that work reliably in the wild.',
  },
];

const experiences = [
  {
    year: '2025',
    title: 'Full-Stack Developer',
    company: 'Inavora & Wise Student',
    companyDetail: 'Magorix Pvt Ltd',
    location: 'Remote',
    period: 'Jun 2025 – Jun 2026',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'AWS EC2', 'Nginx', 'PM2', 'Socket.IO'],
    achievements: [
      'Led full-stack development of Inavora and Wise Student, contributing ~70% of engineering and leading the dev team.',
      'Built multi-tenant architecture, real-time Socket.IO systems, REST APIs, and role-based access control.',
      'Integrated Razorpay with webhook verification, subscription lifecycle, and automated billing cron jobs.',
      'Deployed on AWS EC2 with Nginx reverse proxy, SSL, and PM2 cluster mode.',
    ],
    links: [
      { label: 'Wise Student', url: 'https://wisestudent.org/' },
      { label: 'Inavora', url: 'https://www.inavora.com/' },
    ],
  },
  {
    year: '2025',
    title: 'ML Intern',
    company: 'Emotion Detection from Facial Expressions',
    companyDetail: 'Pheme Software Pvt. Ltd.',
    location: 'Remote',
    period: 'Apr 2025 – Jun 2025',
    techStack: ['Python', 'Computer Vision', 'Machine Learning'],
    achievements: [
      'Built an emotion detection system using facial expression recognition with Python and computer vision.',
      'Delivered a real-world ML project under mentorship in a remote professional setting.',
    ],
  },
];

const education = [
  {
    degree: 'B.Tech Computer Science',
    field: 'Computer Science',
    institution: 'Starex University',
    location: 'Gurugram, Haryana',
    period: '2021 – 2025',
    grade: 'CGPA 7.49',
  },
  {
    degree: 'Higher Secondary (XII)',
    field: '',
    institution: 'GMSSS',
    location: 'Gurugram, Haryana',
    period: '2020 – 2021',
    grade: '87.60%',
  },
  {
    degree: 'Secondary (X)',
    field: '',
    institution: 'GMSSS',
    location: 'Gurugram, Haryana',
    period: '2018 – 2019',
    grade: '70%',
  },
];

const aboutStats = [
  { value: '1+', label: 'Years Experience' },
  { value: '3', label: 'Production Apps' },
  { value: '5', label: 'Certifications' },
  { value: '70%', label: 'Core Engineering' },
];

const getCertificationGroups = () => {
  const groups = [];

  certifications.forEach((cert) => {
    const existing = groups.find((group) => group.issuer === cert.issuer);
    if (existing) {
      existing.items.push(cert);
      return;
    }
    groups.push({ issuer: cert.issuer, items: [cert] });
  });

  return groups;
};

const AboutSectionIntro = ({ label, title, description }) => (
  <SectionReveal>
    <span className="section-label">{label}</span>
    <h2 className="section-heading">{title}</h2>
    <p className="about-section-lead">{description}</p>
  </SectionReveal>
);

const TechTag = ({ label }) => {
  const tech = resolveTech(label);

  if (!tech) {
    return <span className="about-tech-tag about-tech-tag--plain">{label}</span>;
  }

  const { Icon, color } = tech;

  return (
    <span className="about-tech-tag">
      <span className="about-tech-tag-icon" style={{ color }}>
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </span>
      {label}
    </span>
  );
};

const About = () => {
  const [portraitError, setPortraitError] = useState(false);
  const certificationGroups = useMemo(() => getCertificationGroups(), []);

  useEffect(() => {
    initScrollAnimations();

    if (window.location.hash === '#experience') {
      const timer = setTimeout(() => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
      return () => {
        clearTimeout(timer);
        cleanupScrollAnimations();
      };
    }

    return () => cleanupScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-surface about-page">
      <section className="inner-hero about-hero">
        <div className="page-container">
          <SectionReveal className="about-header">
            <div className="about-header-copy">
              <div className="about-header-eyebrow">
                <span className="section-label about-section-label">About Me</span>
              </div>
              <h1 className="inner-hero-title about-hero-title">Engineering products people trust</h1>
              <p className="inner-hero-lead about-hero-lead">
                I&apos;m a full-stack developer who cares as much about interface quality as backend
                reliability — building SaaS products that feel premium from the first click.
              </p>
            </div>

            <div className="about-header-aside">
              <span className="about-role-badge">Full-Stack Developer</span>
              <div className="about-location">
                <HiMapPin className="w-4 h-4" />
                <span>Gurugram, Haryana, India</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12} className="about-studio">
            <div className="about-studio-stats">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="about-stat-item">
                  <div className="about-stat-value">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-studio-main">
              <div className="about-portrait-col">
                <div className="about-portrait-frame">
                  <div className="about-portrait-accent" aria-hidden="true" />
                  {portraitError ? (
                    <div className="about-portrait-placeholder" aria-label="Vikash Kumar">
                      VK
                    </div>
                  ) : (
                    <img
                      src="/images/vikash-image.png"
                      alt="Vikash Kumar"
                      loading="eager"
                      onError={() => setPortraitError(true)}
                    />
                  )}
                </div>
                <p className="about-portrait-name">Vikash Kumar</p>
                <p className="about-portrait-role">Full-Stack Developer</p>
              </div>

              <div className="about-bio-col">
                <span className="contact-panel-kicker">Profile</span>
                <p className="about-bio-lead">
                  <span className="accent">Full-Stack Developer</span> with production experience across{' '}
                  <span className="highlight">Inavora</span>, <span className="highlight">Wise Student</span>, and
                  enterprise web platforms.
                </p>
                <p className="about-bio-text">
                  Skilled in React, Node.js, MongoDB, PostgreSQL, AWS, Socket.IO, multi-tenant systems, and payment
                  integrations — with a sharp eye for UI craftsmanship.
                </p>
                <ResumeButton variant="editorial" />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section about-section">
        <div className="page-container">
          <AboutSectionIntro
            label="Philosophy"
            title="How I approach building"
            description="Principles that guide every product decision — from architecture to the smallest interaction detail."
          />
          <SectionReveal delay={0.08} className="about-panel">
            <div className="about-panel-body">
              <div className="about-principles-grid">
                {principles.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="about-principle-card">
                      <div className="about-principle-top">
                        <span className="about-principle-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="about-principle-icon">
                          <Icon className="w-4 h-4" />
                        </span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="experience" className="page-section about-section scroll-mt-28">
        <div className="page-container">
          <AboutSectionIntro
            label="Experience"
            title="Where I've built"
            description="Real-world roles shipping production features, leading teams, and solving complex engineering challenges."
          />
          <SectionReveal delay={0.08} className="about-panel">
            <div className="about-panel-body about-panel-body--flush">
              <div className="about-experience-list">
                {experiences.map((exp, index) => (
                  <article key={exp.title} className="about-experience-item">
                    <div className="about-experience-meta">
                      <span className="about-experience-year">{exp.year}</span>
                      <span className="about-experience-period">{exp.period}</span>
                      <span className="about-experience-index">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="about-experience-content">
                      <h3>{exp.title}</h3>
                      <p className="about-experience-company">{exp.company}</p>
                      <div className="about-experience-details">
                        <span>
                          <HiBriefcase className="w-3.5 h-3.5" />
                          {exp.companyDetail}
                        </span>
                        <span>
                          <HiMapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <div className="about-experience-tags">
                        {exp.techStack.map((tech) => (
                          <TechTag key={tech} label={tech} />
                        ))}
                      </div>

                      <ul className="about-experience-achievements">
                        {exp.achievements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>

                      {exp.links && (
                        <div className="about-experience-links">
                          {exp.links.map((link) => (
                            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.label}
                              <HiArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section about-section">
        <div className="page-container">
          <AboutSectionIntro
            label="Education"
            title="Academic foundation"
            description="A computer science background that laid the groundwork for full-stack engineering."
          />
          <SectionReveal delay={0.08} className="about-panel">
            <div className="about-panel-body">
              <div className="about-education-grid">
                {education.map((edu, index) => (
                  <article key={edu.degree} className="about-education-card">
                    <span className="about-education-index">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{edu.degree}</h3>
                    {edu.field && <p className="about-education-field">{edu.field}</p>}
                    <p className="about-education-school">{edu.institution}</p>
                    <p className="about-education-location">{edu.location}</p>
                    <div className="about-education-footer">
                      <span>{edu.period}</span>
                      <span className="about-education-grade">{edu.grade}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section about-section">
        <div className="page-container">
          <AboutSectionIntro
            label="Certifications"
            title="Verified credentials"
            description="Industry-recognized credentials from IBM and MongoDB — select any entry to preview or verify."
          />
          <SectionReveal delay={0.08}>
            <div className="about-credentials">
              {certificationGroups.map((group) => (
                <div key={group.issuer} className="about-credentials-group">
                  <div className="about-credentials-group-head">
                    <span className="about-credentials-issuer">{group.issuer}</span>
                    <span className="about-credentials-count">
                      {group.items.length} credential{group.items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="certificate-list">
                    {group.items.map((cert) => (
                      <CertificateCard key={cert.id} certificate={cert} variant="list" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section about-section about-section--last">
        <div className="page-container">
          <AboutSectionIntro
            label="Skills"
            title="Technical toolkit"
            description="Technologies and concepts I use to architect, build, and ship production-grade applications."
          />
          <SectionReveal delay={0.08}>
            <div className="about-skills">
              {aboutSkillCategories.map((category) => (
                <div key={category.category} className="about-skills-category">
                  <div className="about-skills-category-head">
                    <h3>{category.category}</h3>
                    <span>{category.skills.length} tools</span>
                  </div>
                  <div className="about-skills-items">
                    {category.skills.map((skill, index) => {
                      const tech = resolveTech(skill);
                      if (!tech) return null;
                      return (
                        <TechIcon
                          key={skill}
                          name={tech.name}
                          Icon={tech.Icon}
                          color={tech.color}
                          index={index}
                          variant="badge"
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="about-skills-category about-skills-category--concepts">
                <div className="about-skills-category-head">
                  <h3>Concepts & integrations</h3>
                  <span>{aboutConcepts.length} areas</span>
                </div>
                <div className="about-skills-items about-skills-items--concepts">
                  {aboutConcepts.map((concept) => (
                    <span key={concept} className="about-concept-chip">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="about-skills-cta">
              <Link to="/projects" className="btn-primary" data-cursor="pointer">
                See my work
                <HiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
