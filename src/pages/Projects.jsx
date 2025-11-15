import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProjectCard from '@/components/ProjectCard/ProjectCard';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import { trackProjectView } from '@/lib/analytics';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

const sampleProjects = [
  {
    id: 1,
    title: 'StareX | Real-Time Chat Application',
    description: 'A real-time chat application that responds quickly so that users can talk to each other easily.',
    fullDescription:
      'Made a real-time chat app that responds quickly so that users can talk to each other easily. Used Socket.io for real-time updates and instant messaging. Created an easy-to-use interface that makes it easy to get around and keeps people interested.',
    image: 'https://via.placeholder.com/800x450/6366f1/ffffff?text=StareX+Chat',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.io', 'Tailwind CSS'],
    links: {
      live: 'https://starex-hub.onrender.com/',
      github: 'https://github.com/Vikash-Kumar001/starex-hub',
    },
  },
  {
    id: 2,
    title: 'College Complaint Management System',
    description: 'A full-stack complaint management system with separate dashboards for admins, resolvers, and students.',
    fullDescription:
      'Created a full-stack complaint management system that lets students file complaints, keep track of their status, and get feedback from the resolver. There are separate dashboards for admins, resolvers, and students. Features include user authentication with JWT tokens, complaint submission with attachments, assignment and resolution workflow, and real-time notifications using Socket.io.',
    image: 'https://via.placeholder.com/800x450/ec4899/ffffff?text=Complaint+Management',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.io', 'JWT', 'Framer Motion'],
    links: {
      live: 'https://complaint-management.vercel.app',
      github: 'https://github.com/Vikash-Kumar001/College-Complaint-Management',
    },
  },
];

const Projects = () => {
  const [projects] = useState(sampleProjects);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    initScrollAnimations();

    // Check if there's a project ID in the URL
    const projectId = searchParams.get('project');
    if (projectId) {
      const id = parseInt(projectId, 10);
      setSelectedProjectId(id);
      // Scroll to projects section after a short delay
      setTimeout(() => {
        const projectsSection = document.getElementById('projects-grid');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }

    return () => {
      cleanupScrollAnimations();
    };
  }, [searchParams]);

  const handleProjectClick = (project) => {
    trackProjectView(project.title);
  };

  const stats = [
    { number: projects.length, label: 'Projects', icon: '🚀' },
    { number: '100%', label: 'Production Ready', icon: '✨' },
    { number: 'Full-Stack', label: 'Tech Stack', icon: '⚡', className: 'whitespace-nowrap' },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Projects
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                A collection of my recent work showcasing full-stack development skills, real-time applications, 
                and scalable web solutions built with modern technologies.
              </p>
            </div>
          </SectionReveal>

          {/* Stats Section */}
          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center glass p-3 sm:p-4 md:p-5 rounded-xl border border-neutral-700/50 overflow-visible"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                  <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 sm:mb-2 ${stat.className || ''}`} style={{ lineHeight: '1.3' }}>
                    {stat.number}
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Each project represents a unique challenge solved with innovative solutions and best practices
              </p>
            </div>
          </SectionReveal>

          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectCard 
                  project={project} 
                  autoOpen={selectedProjectId === project.id}
                  onOpen={() => {
                    // Clear the URL parameter after opening
                    setSearchParams({});
                    setSelectedProjectId(null);
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <SectionReveal delay={0.4}>
            <div className="text-center mt-12 sm:mt-16">
              <div className="glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Interested in working together?
                </h3>
                <p className="text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <motion.a
                  href="/contact"
                  className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Projects;
