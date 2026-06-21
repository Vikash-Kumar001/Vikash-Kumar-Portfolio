/**
 * Certificate files live in public/certificates/
 * Badge thumbnails: public/certificates/badges/
 * Full certificate previews: public/certificates/previews/
 */
export const certifications = [
  {
    id: 'phemesoft-ml-internship',
    title: 'Remote Mentoring Internship — Emotion Detection from Facial Expressions',
    issuer: 'Phemesoft',
    issuedDate: 'Jun 11, 2025',
    file: 'phemesoft-ml-internship.png',
    badge: '/certificates/badges/phemesoft-ml-internship.png',
    preview: '/certificates/previews/phemesoft-ml-internship.png',
  },
  {
    id: 'star-app-data-analysis-internship',
    title: 'Certificate of Internship Completion — Data Analysis',
    issuer: 'Star App Solutions',
    issuedDate: 'Oct 16, 2025',
    file: 'star-app-data-analysis-internship.png',
    badge: '/certificates/badges/star-app-data-analysis.png',
    preview: '/certificates/previews/star-app-data-analysis.png',
  },
  {
    id: 'ibm-ai-ml',
    title: 'Artificial Intelligence & Machine Learning Graduate',
    issuer: 'IBM',
    issuedDate: 'May 30, 2025',
    file: 'IBMDesign20260620-32-pm4ivd.pdf',
    badge: '/certificates/badges/ibm-ai-ml.png',
    preview: '/certificates/previews/ibm-ai-ml.png',
    verifyUrl: 'https://www.credly.com/badges/29e6107d-d2e6-4a37-9074-78840f6a45ee',
  },
  {
    id: 'mongodb-genai',
    title: 'Building GenAI Applications with MongoDB',
    issuer: 'MongoDB',
    issuedDate: 'Dec 3, 2025',
    file: 'BuildingGenAIApplicationswithMongoDB_Badge20260620-32-5yayzi.pdf',
    badge: '/certificates/badges/mongodb-genai.png',
    preview: '/certificates/previews/mongodb-genai.png',
    verifyUrl: 'https://www.credly.com/go/SDxQtBuR',
  },
  {
    id: 'mongodb-sql-to-document',
    title: "From Relational Model (SQL) to MongoDB's Document Model",
    issuer: 'MongoDB',
    issuedDate: 'Dec 3, 2025',
    file: 'SkillsCert20260620-32-aebmx.pdf',
    badge: '/certificates/badges/mongodb-sql-document.png',
    preview: '/certificates/previews/mongodb-sql-document.png',
    verifyUrl: 'https://www.credly.com/badges/13311151-654b-43b7-b674-9789b8a2fa9d',
  },
  {
    id: 'mongodb-schema-optimization',
    title: 'MongoDB Schema Design Optimization Skill Badge',
    issuer: 'MongoDB',
    issuedDate: 'Dec 5, 2025',
    file: 'SkillsCert20260620-32-sgq8ca.pdf',
    badge: '/certificates/badges/mongodb-schema-optimization.png',
    preview: '/certificates/previews/mongodb-schema-optimization.png',
    verifyUrl: 'https://www.credly.com/badges/0f3b2a5d-ede4-46a9-a591-59dd6544b198',
  },
  {
    id: 'mongodb-schema-patterns',
    title: 'MongoDB Schema Design Patterns and Anti-patterns Skill Badge',
    issuer: 'MongoDB',
    issuedDate: 'Dec 3, 2025',
    file: 'SkillsCert20260620-32-nl0vf3.pdf',
    badge: '/certificates/badges/mongodb-schema-patterns.png',
    preview: '/certificates/previews/mongodb-schema-patterns.png',
    verifyUrl: 'https://www.credly.com/badges/175f9a27-2468-418b-a2d3-7d217c23a1e4',
  },
];

export const getCertificatePath = (file) => `/certificates/${file}`;

export const getCertificateAsset = (file) => {
  if (!file) return null;

  const path = getCertificatePath(file);
  const extension = file.split('.').pop()?.toLowerCase();

  return {
    viewPath: path,
    downloadPath: path,
    type: extension === 'pdf' ? 'pdf' : 'image',
  };
};
