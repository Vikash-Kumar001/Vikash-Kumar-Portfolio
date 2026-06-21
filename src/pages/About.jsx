import { useEffect, useMemo, useState } from 'react';
import {
  HiArrowUpRight,
  HiBriefcase,
  HiCircleStack,
  HiMapPin,
  HiSparkles,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import CertificateCard from '@/components/CertificateCard/CertificateCard';
import ResumeButton from '@/components/ResumeButton/ResumeButton';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import SplitHeading from '@/components/SplitHeading/SplitHeading';
import TechIcon, { resolveTechIconColor } from '@/components/TechIcon/TechIcon';
import { useTheme } from '@/contexts/ThemeContext';
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
    company: 'Inavora, Wise Student & Ullam AI',
    companyDetail: 'Magorix Pvt Ltd',
    location: 'Remote',
    period: 'Jun 2025 – Jun 2026',
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Razorpay',
      'AWS EC2',
      'Socket.IO',
      'JWT',
      'Google OAuth',
    ],
    achievements: [
      'Led full-stack development across Inavora, Wise Student, and Ullam AI — contributing ~70% of engineering and leading the dev team.',
      'Built Ullam AI, a multi-faith emotional wellness platform with guided scripture reflection, institution dashboards, progress tracking, Heal Coins gamification, and platform admin tooling.',
      'Developed React + TypeScript SPA and Node.js/Express REST APIs for scripture content, user profiles, institution membership, and JWT + Google OAuth authentication.',
      'Built multi-tenant architecture, real-time Socket.IO systems, REST APIs, and RBAC for Inavora and Wise Student.',
      'Integrated Razorpay with webhook verification, subscription lifecycle, and automated billing; deployed on AWS EC2 with Nginx, SSL, and PM2.',
    ],
    links: [
      { label: 'Wise Student', url: 'https://wisestudent.org/' },
      { label: 'Inavora', url: 'https://www.inavora.com/' },
      { label: 'Ullam AI', url: 'https://ullam.ai/' },
    ],
  },
  {
    year: '2025',
    title: 'Data Analysis Intern',
    company: 'Star App Solutions Inc.',
    companyDetail: 'Data Analysis Internship',
    location: 'Remote',
    period: 'May 2025 – Oct 2025',
    techStack: ['Python', 'Data Analysis', 'Excel', 'SQL', 'Reporting'],
    achievements: [
      'Completed a five-month data analysis internship with Star App Solutions Inc. (May – Oct 2025).',
      'Applied analytical workflows to support insights, reporting, and data-driven decision-making.',
      'Recognized for dedication, technical growth, and a strong willingness to learn throughout the program.',
    ],
  },
  {
    year: '2025',
    title: 'ML Intern',
    company: 'Emotion Detection from Facial Expressions',
    companyDetail: 'Phemesoft',
    location: 'Remote',
    period: 'Apr 2025 – Jun 2025',
    techStack: ['Python', 'Computer Vision', 'Machine Learning'],
    achievements: [
      'Built an emotion detection system using facial expression recognition with Python and computer vision.',
      'Delivered a real-world ML project under mentorship in a remote professional setting.',
    ],
  },
  {
    year: '2017',
    title: 'HES Volunteer',
    company: 'Ullas Trust',
    companyDetail: 'Intellect Design Arena Ltd.',
    location: 'Gurgaon, India',
    period: '2017 – 2025',
    techStack: ['Mentorship', 'Leadership', 'Youth Development', 'Workshop Facilitation'],
    achievements: [
      'Led and mentored student groups (grades 9–12) across multiple annual Ullas programs.',
      'Guided students through personal development, emotional wellness, discipline, and academic growth.',
      'Coordinated volunteer teams during workshops, events, and recognition programs.',
      'Supported Ullas Trust’s mission of empowering students from under-resourced communities.',
    ],
  },
  {
    year: '2023',
    title: 'Finalist',
    company: 'IBM Hackathon',
    companyDetail: 'Dehradun',
    location: 'Dehradun, India',
    period: '2023',
    techStack: ['Python', 'TensorFlow', 'NLP', 'Machine Learning'],
    achievements: [
      'Developed an ML-based platform to detect abusive content using Python, TensorFlow, and NLP.',
      'Built a real-time moderation system to flag offensive text.',
    ],
  },
  {
    year: '2022',
    title: '3rd Place',
    company: 'IBM ICE DAY',
    companyDetail: 'Starex University',
    location: 'Gurugram, India',
    period: '2022',
    techStack: ['Research', 'Presentation', 'Communication'],
    achievements: [
      'Recognized for strong communication, research, and presentation skills in a competitive presentation event.',
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
  { value: '4', label: 'Production Apps' },
  { value: '7', label: 'Certifications' },
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

const AboutSectionIntro = ({ label, titleLead, titleAccent, description }) => (
  <SectionReveal>
    <span className="section-label">{label}</span>
    <SplitHeading as="h2" className="section-heading" lead={titleLead} accent={titleAccent} />
    <p className="about-section-lead">{description}</p>
  </SectionReveal>
);

const TechTag = ({ label }) => {
  const { theme } = useTheme();
  const tech = resolveTech(label);

  if (!tech) {
    return <span className="about-tech-tag about-tech-tag--plain">{label}</span>;
  }

  const { Icon, color, lightColor } = tech;
  const iconColor = resolveTechIconColor(color, lightColor, theme);

  return (
    <span className="about-tech-tag">
      <span className="about-tech-tag-icon" style={{ color: iconColor }}>
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
              <SplitHeading
                as="h1"
                className="inner-hero-title about-hero-title"
                lead="Engineering products"
                accent="people trust"
              />
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
                {portraitError ? (
                  <span className="about-portrait-fallback" aria-label="Developer avatar">
                    {'</>'}
                  </span>
                ) : (
                  <img
                    src="/images/portfolio-avatar.png"
                    alt="Anime-style developer avatar — Vikash Kumar"
                    className="about-portrait hero-portrait-animated"
                    loading="eager"
                    onError={() => setPortraitError(true)}
                  />
                )}
                <p className="about-portrait-name">Vikash Kumar</p>
                <p className="about-portrait-role">Full-Stack Developer</p>
              </div>

              <div className="about-bio-col">
                <span className="contact-panel-kicker">Profile</span>
                <p className="about-bio-lead">
                  <span className="accent">Full-Stack Developer</span> with production experience across{' '}
                  <span className="highlight">Inavora</span>, <span className="highlight">Wise Student</span>,{' '}
                  <span className="highlight">Ullam AI</span>, and enterprise web platforms — building SaaS products used
                  by real users every day.
                </p>
                <p className="about-bio-text">
                  Skilled in React, Node.js, MongoDB, PostgreSQL, AWS, Socket.IO, multi-tenant systems, and payment
                  integrations — with a sharp eye for UI craftsmanship and engineering decisions that hold up in
                  production.
                </p>
                <p className="about-bio-text">
                  At <strong>Magorix Pvt Ltd</strong>, I lead core engineering for Inavora, Wise Student, and{' '}
                  <strong>Ullam AI</strong> — from multi-tenant SaaS and Razorpay billing to a faith-inclusive wellness
                  platform with scripture reflection, institution accounts, and progress dashboards. I design REST APIs,
                  RBAC, real-time messaging, and AWS EC2 deployments with Nginx, SSL, and PM2.
                </p>
                <p className="about-bio-text">
                  My background spans machine learning internships, data analysis, and IBM & MongoDB certifications. I
                  bring the same rigor to architecture reviews, clean code, and thoughtful UX — whether scaling a
                  product or delivering an MVP on a tight timeline.
                </p>
                <ul className="about-bio-highlights">
                  <li>SaaS & multi-tenant systems</li>
                  <li>Real-time & payment integrations</li>
                  <li>AWS production deployments</li>
                  <li>Faith-inclusive wellness (Ullam AI)</li>
                  <li>UI craftsmanship</li>
                </ul>
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
            titleLead="How I approach"
            titleAccent="building"
            description="Principles that guide every product decision — from architecture to the smallest interaction detail."
          />
          <SectionReveal delay={0.08}>
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
          </SectionReveal>
        </div>
      </section>

      <section id="experience" className="page-section about-section scroll-mt-28">
        <div className="page-container">
          <AboutSectionIntro
            label="Experience"
            titleLead="Where I've"
            titleAccent="built"
            description="Real-world roles shipping production features, leading teams, and solving complex engineering challenges."
          />
          <SectionReveal delay={0.08} className="about-panel">
            <div className="about-panel-body about-panel-body--flush">
              <div className="about-experience-list">
                {experiences.map((exp, index) => (
                  <article key={`${exp.title}-${exp.company}`} className="about-experience-item">
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
            titleLead="Academic"
            titleAccent="foundation"
            description="A computer science background that laid the groundwork for full-stack engineering."
          />
          <SectionReveal delay={0.08}>
            <div className="about-education-grid">
              {education.map((edu, index) => (
                <article key={edu.degree} className="about-education-card">
                  <span className="about-education-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{edu.degree}</h3>
                  <p className="about-education-field">{edu.field}</p>
                  <p className="about-education-school">{edu.institution}</p>
                  <p className="about-education-location">{edu.location}</p>
                  <div className="about-education-footer">
                    <span>{edu.period}</span>
                    <span className="about-education-grade">{edu.grade}</span>
                  </div>
                </article>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="page-section about-section">
        <div className="page-container">
          <AboutSectionIntro
            label="Certifications"
            titleLead="Verified"
            titleAccent="credentials"
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
            titleLead="Technical"
            titleAccent="toolkit"
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
                          lightColor={tech.lightColor}
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
