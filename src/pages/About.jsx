import { motion } from 'framer-motion';
import { useEffect } from 'react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ResumeButton from '@/components/ResumeButton/ResumeButton';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

const About = () => {
  useEffect(() => {
    initScrollAnimations();

    return () => {
      cleanupScrollAnimations();
    };
  }, []);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Wise Student (AI-Powered Digital Wellness Platform)',
      companyDetail: 'Magorix Pvt Ltd',
      location: 'Remote',
      period: '2025 – Present',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Google Gemini API', 'Razorpay', 'Canvas API', 'AI/ML'],
      achievements: [
        'Architecting and developing FINMEN, an AI-powered digital wellness and financial literacy platform for 8–25 year-olds, managing the entire application lifecycle and production environment.',
        'Scalability & Architecture: Architected and implemented a multi-role, multi-tenant ecosystem supporting 6+ user types (students, parents, educators) with fully isolated permissions and organizational segregation.',
        'AI Integration: Developed an AI-based Cognitive Behavioral Therapy (CBT) chatbot using the Google Gemini API for adaptive therapeutic protocols and crisis detection.',
        'Real-time Systems: Designed and optimized real-time Socket.IO infrastructure for dynamic features, including notifications, live profile updates, multi-user chat, and leaderboard synchronization.',
        'Gamification: Engineered a full gamification framework with 1000+ daily challenges, an XP/HealCoins economy, and engaging educational mini-games using React and Canvas APIs.',
        'E-commerce/Payments: Integrated Razorpay for managing subscription flows, a reward redemption marketplace, and automated invoice generation.',
        'Performance: Optimized backend performance through database indexing, efficient Socket.IO room management, and horizontal scaling strategies.',
      ],
      icon: '🚀',
    },
    {
      title: 'Data Analysis Intern',
      company: 'Data Analytics & Business Intelligence',
      companyDetail: 'Star App Solutions',
      location: 'Remote',
      period: 'May 2025 – October 2025',
      techStack: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistical Analysis', 'Pandas', 'NumPy', 'Tableau', 'Power BI'],
      achievements: [
        'Led comprehensive data analysis initiatives supporting strategic product decision-making and executive-level reporting, directly influencing business outcomes and product roadmap prioritization.',
        'Architected and implemented automated data processing pipelines, reducing manual reporting time by 60% and enabling real-time insights for cross-functional teams including Product, Engineering, and Marketing.',
        'Developed advanced analytical models and statistical frameworks to identify key performance indicators (KPIs), user behavior patterns, and market trends, providing actionable intelligence for leadership.',
        'Designed and delivered executive dashboards and data visualizations using advanced BI tools, translating complex datasets into clear, strategic narratives for stakeholders and decision-makers.',
        'Collaborated with product managers and engineers to establish data-driven workflows, implementing quality assurance protocols that improved data accuracy by 40% and ensured reliable reporting standards.',
        'Conducted deep-dive analyses on user engagement metrics, conversion funnels, and feature adoption rates, delivering insights that informed product optimization strategies and resource allocation.',
        'Established data governance best practices and documentation standards, creating reusable analytical frameworks that enhanced team productivity and knowledge sharing across the organization.',
      ],
      icon: '📊',
    },
    {
      title: 'Full-Stack Developer Intern',
      company: 'FinMen (Mental Wellness Platform)',
      companyDetail: 'Jayadhi Limited',
      location: 'Remote',
      period: 'June 2025 – Aug 2025',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Tailwind CSS', 'JWT', 'Google OAuth', 'REST API', 'Anime.js', 'Framer Motion'],
      achievements: [
        'Participated in the development of FinMen, a multi-tiered application for mental wellness-specific interactions for users such as students, faculty members, and administrators.',
        'Developed secure authentication features for user accounts including login, OTP, password reset, and Google OAuth using JWT, cookie-based sessions, and localStorage sync.',
        'Created and protected role-specific dashboards with role-based access control routing with react-router-dom and custom ProtectedRoute logic.',
        'Developed and published reusable UI components such as Navbar, Profile, Wallet, Leaderboard, Mood Tracker, Notifications, and Redemption flow.',
        'Employed REST API communication with context-based state management through Axios for frontend-backend interactions.',
        'Worked in an Agile team to develop scalable full-stack features for FinMen, including dashboards, backend systems, and integrations like chatbots and breathing exercises.',
        'Conducted API evaluations with Postman, managed repository changes with Git, and adhered to set sprint deadlines for feature updates.',
      ],
      icon: '🧠',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Technology (B. Tech)',
      field: 'Computer Science',
      institution: 'Starex University',
      location: 'Gurugram, Haryana',
      period: '2021 - 2025',
      grade: 'CGPA: 7.49',
      icon: '🎓',
    },
    {
      degree: 'Higher Secondary (XII)',
      field: '',
      institution: 'GMSSS',
      location: 'Gurugram, Haryana',
      period: '2020 - 2021',
      grade: 'Percentage: 87.60%',
      icon: '📚',
    },
    {
      degree: 'Secondary (X)',
      field: '',
      institution: 'GMSSS',
      location: 'Gurugram, Haryana',
      period: '2018 - 2019',
      grade: 'Percentage: 70%',
      icon: '📖',
    },
  ];

  const achievements = [
    {
      title: 'Finalist',
      event: 'IBM Hackathon',
      location: 'Dehradun, 2023',
      description: 'Developed an ML-based platform to detect abusive content using Python, TensorFlow, and NLP. Built a real-time moderation system to flag offensive text.',
      icon: '🏆',
      badge: 'Finalist',
    },
    {
      title: '3rd Place',
      event: 'IBM ICE DAY',
      location: 'Starex University, Gurugram, 2022',
      description: 'Known for strong communication, research, and presentation skills in a competitive presentation event.',
      icon: '🥉',
      badge: '3rd Place',
    },
  ];

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Daisy UI', 'ShadCN', 'Framer Motion', 'Anime.js', 'Three.js'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Flask', 'REST API', 'Socket.io', 'JWT'],
    },
    {
      category: 'Database',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'MongoDB Atlas'],
    },
    {
      category: 'Tools & Languages',
      skills: ['Git', 'GitHub', 'Postman', 'Python', 'Java', 'C++'],
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                About Me
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  About
                </span>
                <span className="text-white"> Me</span>
              </h1>
            </div>
          </SectionReveal>
          
          <SectionReveal delay={0.2}>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-center">
                {/* Content Section - Takes 2 columns */}
                <motion.div
                  className="lg:col-span-2 glass p-6 sm:p-8 md:p-10 rounded-2xl border border-neutral-700/50 backdrop-blur-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-4 sm:mb-6">
                    Highly skilled <span className="text-primary font-semibold">Full-Stack Developer</span> with strong experience architecting, building, and deploying real-world products across web and mobile platforms. Proven ability to deliver production-ready features, improve performance end-to-end, and scale complex systems.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-4 sm:mb-6">
                    Proficient in <span className="text-primary font-semibold">MERN Stack</span>, AI integrations (Gemini API), real-time systems (Socket.IO), gamification, and multi-tenant architecture. Focused on shipping clean, reliable, and maintainable solutions with a strong product mindset.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-6 sm:mb-8">
                    As a self-driven individual, I embrace challenges, possess a solid background in teamwork, 
                    and emphasize professional growth. I love turning complex problems into simple, beautiful, 
                    and intuitive solutions.
                  </p>
                  <div className="pt-4 border-t border-neutral-700/50">
                    <ResumeButton variant="split" />
                  </div>
                </motion.div>

                {/* Profile Photo Section - Takes 1 column, right side */}
                <motion.div
                  className="flex justify-center lg:justify-end"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    {/* Subtle professional photo container */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-neutral-700/50 bg-neutral-800/50 backdrop-blur-sm shadow-xl">
                      <img
                        src="/images/vikash-image.png"
                        alt="Vikash Kumar - Full Stack Developer"
                    className="w-full h-full object-fill"
                        loading="eager"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Placeholder if image not found */}
                      <div className="hidden absolute inset-0 items-center justify-center bg-neutral-800 text-neutral-500">
                        <div className="text-center">
                          <svg className="w-20 h-20 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-xs">Add your photo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Experience
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Work <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Building scalable applications and learning from real-world challenges
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  {/* Timeline line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-6 sm:left-8 top-20 sm:top-24 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden md:block"></div>
                  )}
                  
                  <div className="glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 hover:border-primary/50 transition-all group relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-accent/5 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {exp.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <h4 className="text-lg sm:text-xl text-primary font-semibold mb-1">{exp.company}</h4>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {exp.companyDetail}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <p className="text-sm text-neutral-400 mb-3 font-medium">Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1.5 rounded-lg glass border border-neutral-700/50 text-sm text-neutral-300 hover:border-primary/50 hover:text-primary transition-all"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <p className="text-sm text-neutral-400 mb-3 font-medium">Key Achievements:</p>
                        <ul className="space-y-3">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-3 text-neutral-300">
                              <span className="text-primary mt-1 flex-shrink-0">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Education
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Education</span> Journey
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                My academic background and learning path
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 hover:border-primary/50 transition-all h-full group relative overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform inline-block">
                      {edu.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-primary font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{edu.field}</p>
                    )}
                    <p className="text-neutral-300 font-medium mb-1 sm:mb-2 text-sm sm:text-base">{edu.institution}</p>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">{edu.location}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-neutral-700/50">
                      <span className="text-neutral-400 text-xs sm:text-sm">{edu.period}</span>
                      <span className="px-2 sm:px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs sm:text-sm font-semibold">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Achievements
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Awards & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recognition</span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Highlights from competitions and events
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 hover:border-primary/50 transition-all group relative overflow-hidden h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                        {achievement.icon}
                      </div>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-xs sm:text-sm font-semibold">
                        {achievement.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <h4 className="text-lg sm:text-xl text-primary font-semibold mb-2">{achievement.event}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {achievement.location}
                    </p>
                    <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">{achievement.description}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Skills
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Technical <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Skills</span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>
          </SectionReveal>

          {/* New Design: Circular/Orbital Layout */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {skillCategories.map((category, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  {/* Category Header with Icon */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-xl sm:text-2xl">
                        {index === 0 && '🎨'}
                        {index === 1 && '⚙️'}
                        {index === 2 && '💾'}
                        {index === 3 && '🛠️'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                        {category.category}
                      </h3>
                      <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2"></div>
                    </div>
                  </div>

                  {/* Skills Grid with Enhanced Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05, type: 'spring', stiffness: 200 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="glass p-4 sm:p-5 rounded-xl border border-neutral-700/50 hover:border-primary/50 transition-all cursor-default h-full flex flex-col items-center justify-center text-center group-hover:bg-primary/5 relative overflow-hidden">
                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          
                          {/* Skill Icon/Initial */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2 sm:mb-3 group-hover:from-primary/30 group-hover:to-accent/30 transition-all group-hover:scale-110">
                            <span className="text-base sm:text-lg font-bold text-primary">
                              {skill.charAt(0)}
                            </span>
                          </div>
                          
                          {/* Skill Name */}
                          <p className="text-xs sm:text-sm font-semibold text-neutral-300 group-hover:text-primary transition-colors leading-tight">
                            {skill}
                          </p>
                          
                          {/* Hover indicator dot */}
                          <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
