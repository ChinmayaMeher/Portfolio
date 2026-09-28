export type CertificateCategory =
  | "All"
  | "NPTEL"
  | "Cloud"
  | "Coding"
  | "Hackathon"
  | "Other";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  skills: string[];
  image: string;
  verifyUrl?: string;
  description?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "nptel-python",
    title: "Python for Data Science",
    issuer: "NPTEL (IIT Madras / SWAYAM)",
    date: "2023",
    category: "NPTEL",
    skills: ["Python", "Data Science", "NumPy", "Pandas", "Algorithms"],
    image: "/image/Nptel PFD.jpg",
    verifyUrl: "https://nptel.ac.in/",
    description:
      "Comprehensive certification covering Python syntax, data structures, scientific computing with NumPy and Pandas, and core algorithm design.",
  },
  {
    id: "agoric-smart-contract",
    title: "Agoric Smart Contracts & Web3",
    issuer: "Agoric",
    date: "2024",
    category: "Cloud",
    skills: ["JavaScript", "Smart Contracts", "Web3", "Distributed Systems"],
    image: "/image/agoric_certificate.jpg",
    verifyUrl: "https://agoric.com/",
    description:
      "Completed intensive training on building secure smart contracts using hardened JavaScript and decentralized architecture on the Agoric platform.",
  },
  {
    id: "gfg-cutm",
    title: "GeeksforGeeks Campus Chapter Lead",
    issuer: "GeeksforGeeks & CUTM",
    date: "2023",
    category: "Coding",
    skills: ["Data Structures", "Algorithms", "C++", "Problem Solving"],
    image: "/image/GFG_CUTM_page-0001.jpg",
    description:
      "Recognized for exceptional active engagement, coding problem solving, and technical leadership within the campus coding community.",
  },
  {
    id: "national-skill-up",
    title: "National Skill Up Web Engineering",
    issuer: "National Skill Up",
    date: "2023",
    category: "Other",
    skills: ["Full Stack", "HTML5", "CSS3", "JavaScript", "Responsive UI"],
    image: "/image/Nation skill up certificate_page-0001.jpg",
    description:
      "Evaluated on real-world web engineering principles, frontend layouts, DOM manipulation, and cross-browser responsiveness.",
  },
  {
    id: "hack2skill-hackathon",
    title: "Hack2Skill Hackathon Participant",
    issuer: "Hack2Skill",
    date: "2024",
    category: "Hackathon",
    skills: ["Rapid Prototyping", "Teamwork", "REST APIs", "Ideation"],
    image: "/image/Hack2skill-Certificate.png",
    description:
      "Built and pitched an innovative tech solution under a 36-hour competitive hackathon sprint, incorporating AI workflows and real-time frontend.",
  },
  {
    id: "sap-abap",
    title: "SAP ABAP Programming Fundamentals",
    issuer: "SAP & Centurion University",
    date: "2024",
    category: "Other",
    skills: ["SAP ABAP", "Enterprise Software", "SQL", "Data Modeling"],
    image: "/image/CHINMAYA_SAP_ABAP_CERTIFICATE.jpg",
    description:
      "Foundational enterprise programming, ABAP dictionary, modularization techniques, and database interaction.",
  },
];
