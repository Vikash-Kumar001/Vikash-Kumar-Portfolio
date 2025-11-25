import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations';

// Lazy load Three.js scene
const ThreeScene = lazy(() => import('@/components/ThreeScene/ThreeScene'));

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showWelcome, setShowWelcome] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Check if welcome message has been shown before
    if (typeof window !== 'undefined') {
      const hasSeenWelcome = localStorage.getItem('portfolio_welcome_shown');
      
      if (!hasSeenWelcome) {
        // Small delay to ensure component is fully mounted
        const showTimer = setTimeout(() => {
          setShowWelcome(true);
        }, 100);
        
        // Hide welcome message after animation and mark as shown
        const hideTimer = setTimeout(() => {
          setShowWelcome(false);
          localStorage.setItem('portfolio_welcome_shown', 'true');
        }, 3500); // Show for 3.5 seconds (100ms delay + 3.4s display)
        
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    }
  }, []);

  useEffect(() => {
    initScrollAnimations();

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cleanupScrollAnimations();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { number: '2+', label: 'Years Experience', icon: '💼' },
    { number: '10+', label: 'Projects Completed', icon: '🚀' },
    { number: '5+', label: 'Technologies Mastered', icon: '⚡' },
    { number: '100%', label: 'Client Satisfaction', icon: '✨' },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'StareX Chat',
      description: 'Real-time chat application',
      tech: 'React • Node.js • Socket.io',
      link: '/projects?project=1',
    },
    {
      id: 2,
      title: 'Complaint Management',
      description: 'Full-stack complaint system',
      tech: 'React • Express • MongoDB',
      link: '/projects?project=2',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Welcome Message - Shows only once on first visit */}
      {showWelcome && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          <motion.div
            className="relative glass p-6 md:p-8 rounded-2xl border-2 border-primary/40 backdrop-blur-xl shadow-2xl max-w-2xl mx-4 bg-neutral-900/90"
            initial={{ scale: 0.7, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1] // Bounce effect
            }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 md:gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-4xl md:text-5xl"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  repeat: 1,
                  repeatDelay: 0.6
                }}
              >
                👋
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Welcome to my Portfolio
              </motion.h2>
              <motion.p 
                className="text-neutral-300 text-base md:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Let's explore together
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 50%)`,
            transition: 'background 0.3s ease-out',
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

        {/* Static hero content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-4 max-w-5xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Vikash{' '}
              </span>
              <span className="text-white">Kumar</span>
            </motion.h1>

            <motion.div
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-neutral-300 mb-3 sm:mb-4 font-medium px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="inline-block">Full Stack Web Developer</span>
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting scalable web applications with React.js, Node.js, and modern technologies.
              Passionate about building secure APIs and user-friendly interfaces.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap mb-16 sm:mb-20 md:mb-24 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton
                onClick={() => navigate('/projects')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all text-sm sm:text-base"
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass border border-neutral-700 text-white rounded-xl font-semibold hover:border-primary/50 transition-all text-sm sm:text-base"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* 3D Scene - Lazy loaded */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                <div className="text-neutral-500">Loading 3D Scene...</div>
              </div>
            }
          >
            <ThreeScene className="w-full h-full" />
          </Suspense>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            data-cursor="pointer"
          >
            <span className="text-neutral-400 text-sm mb-2">Scroll</span>
            <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-neutral-400 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-16 px-4 bg-gradient-to-b from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center glass p-4 sm:p-5 md:p-6 rounded-xl border border-neutral-700/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                <motion.div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <SectionReveal>
              <div>
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  About Me
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  Building Digital
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Experiences
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-4 sm:mb-6">
                  I am a Full Stack Web Developer skilled in modern web frameworks like React.js and Node.js. 
                  I am passionate about constructing secure APIs and scalable web applications with user-friendly 
                  interfaces and systematic architecture.
                </p>
                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-6 sm:mb-8">
                  As a self-driven individual, I embrace challenges, possess a solid background in teamwork, 
                  and emphasize professional growth. I love turning complex problems into simple, beautiful, 
                  and intuitive solutions.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <MagneticButton
                    onClick={() => navigate('/about')}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold text-sm sm:text-base"
                  >
                    Learn More
                  </MagneticButton>
                  <MagneticButton
                    onClick={() => navigate('/contact')}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 glass border border-neutral-700 text-white rounded-lg font-semibold text-sm sm:text-base"
                  >
                    Contact Me
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="relative">
                <div className="glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 space-y-4 sm:space-y-6">
                  {[
                    { label: 'Frontend Development', value: 90 },
                    { label: 'Backend Development', value: 85 },
                    { label: 'Database Design', value: 80 },
                    { label: 'UI/UX Design', value: 75 },
                  ].map((skill, index) => (
                    <div key={skill.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium text-sm sm:text-base">{skill.label}</span>
                        <span className="text-neutral-400 text-sm sm:text-base">{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Featured Work
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Recent
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Projects</span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                A glimpse of my latest work and creative solutions
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group glass p-6 sm:p-8 rounded-2xl border border-neutral-700/50 hover:border-primary/50 transition-all cursor-pointer overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(project.link)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-2xl sm:text-3xl">🚀</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
                  <p className="text-xs sm:text-sm text-neutral-500 mb-4 sm:mb-6">{project.tech}</p>
                  <span className="text-primary text-xs sm:text-sm font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                    View Project
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <SectionReveal delay={0.4}>
            <div className="text-center">
              <MagneticButton
                onClick={() => navigate('/projects')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass border border-neutral-700 text-white rounded-xl font-semibold hover:border-primary/50 text-sm sm:text-base"
              >
                View All Projects
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-neutral-800 via-neutral-800 to-neutral-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight pb-2 px-2">
                Skills & Technologies
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>
          </SectionReveal>
          
          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {[
                { name: 'React.js', category: 'Frontend' },
                { name: 'Node.js', category: 'Backend' },
                { name: 'Next.js', category: 'Framework' },
                { name: 'Express.js', category: 'Backend' },
                { name: 'MongoDB', category: 'Database' },
                { name: 'PostgreSQL', category: 'Database' },
                { name: 'Tailwind CSS', category: 'Styling' },
                { name: 'Three.js', category: '3D' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group relative glass p-4 sm:p-5 md:p-6 rounded-xl border border-neutral-700/50 hover:border-primary/50 transition-all cursor-default overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon placeholder - you can add actual icons here */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <span className="text-xl sm:text-2xl font-bold text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                        {skill.name.charAt(0)}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-white text-center mb-1 sm:mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                      {skill.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 text-center group-hover:text-neutral-400 transition-colors">
                      {skill.category}
                    </p>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
          
          {/* Additional skills showcase */}
          <SectionReveal delay={0.4}>
            <div className="mt-12 sm:mt-16 text-center px-4">
              <p className="text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">And many more technologies including</p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {['JavaScript', 'TypeScript', 'Python', 'Git', 'REST APIs', 'Socket.io', 'JWT', 'Firebase'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-neutral-700/50 text-xs sm:text-sm text-neutral-300 hover:border-primary/50 hover:text-primary transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;

