import {
  SiChartdotjs,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGoogle,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRender,
  SiSocketdotio,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa6';

/** @typedef {{ name: string; Icon: import('react').ComponentType; color: string; aliases?: string[] }} TechItem */

/** @type {TechItem[]} */
export const techCatalog = [
  { name: 'React', Icon: SiReact, color: '#61DAFB', aliases: ['React.js'] },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', aliases: ['JavaScript (ES6+)'] },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer Motion', Icon: SiFramer, color: '#FFFFFF' },
  { name: 'Three.js', Icon: SiThreedotjs, color: '#FFFFFF' },
  { name: 'Chart.js', Icon: SiChartdotjs, color: '#FF6384' },
  { name: 'React Router', Icon: SiReactrouter, color: '#CA4245' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', Icon: SiExpress, color: '#FFFFFF', aliases: ['Express.js'] },
  { name: 'FastAPI', Icon: SiFastapi, color: '#009688', aliases: ['Flask'] },
  { name: 'Socket.io', Icon: SiSocketdotio, color: '#010101', aliases: ['Socket.IO'] },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900', aliases: ['AWS EC2', 'AWS S3'] },
  { name: 'Nginx', Icon: SiNginx, color: '#009639' },
  { name: 'Vercel', Icon: SiVercel, color: '#FFFFFF' },
  { name: 'Render', Icon: SiRender, color: '#FFFFFF' },
  { name: 'Stripe', Icon: SiStripe, color: '#635BFF' },
  { name: 'Google OAuth', Icon: SiGoogle, color: '#4285F4' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Java', Icon: FaJava, color: '#ED8B00' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
  { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
];

/** Featured stack shown on Home */
export const techStack = [
  techCatalog.find((t) => t.name === 'React'),
  techCatalog.find((t) => t.name === 'Next.js'),
  techCatalog.find((t) => t.name === 'Node.js'),
  techCatalog.find((t) => t.name === 'Express'),
  techCatalog.find((t) => t.name === 'MongoDB'),
  techCatalog.find((t) => t.name === 'PostgreSQL'),
  techCatalog.find((t) => t.name === 'AWS'),
  techCatalog.find((t) => t.name === 'Tailwind CSS'),
  techCatalog.find((t) => t.name === 'Socket.io'),
  techCatalog.find((t) => t.name === 'FastAPI'),
  techCatalog.find((t) => t.name === 'Python'),
  techCatalog.find((t) => t.name === 'GitHub'),
].filter(Boolean);

export const aboutSkillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Chart.js', 'React Router'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Socket.io'],
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase'],
  },
  {
    category: 'Cloud & Infra',
    skills: ['AWS', 'Nginx', 'Vercel', 'Render'],
  },
  {
    category: 'Auth & Payment',
    skills: ['Stripe', 'Google OAuth'],
  },
  {
    category: 'Tools & Languages',
    skills: ['Git', 'GitHub', 'Postman', 'Python', 'Java'],
  },
];

export const aboutConcepts = [
  'REST APIs',
  'WebSocket',
  'Multi-Tenant SaaS',
  'Event-Driven Architecture',
  'RBAC',
  'JWT',
  'Razorpay',
  'PM2',
  'Agile',
  'Data Modelling',
];

/**
 * @param {string} label
 * @returns {TechItem | undefined}
 */
export const resolveTech = (label) =>
  techCatalog.find((tech) => tech.name === label || tech.aliases?.includes(label));
