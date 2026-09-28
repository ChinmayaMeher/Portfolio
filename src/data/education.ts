export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  grade: string;
  badge?: string;
  description: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "cutm",
    period: "2023 – 2027",
    degree: "B.Tech — Computer Science & Engineering (AI/ML)",
    institution: "Centurion University of Technology & Management",
    location: "Bhubaneswar, Odisha",
    grade: "CGPA: 8.5",
    badge: "Current",
    description:
      "Core curriculum in Machine Learning, Artificial Intelligence, Data Structures, Algorithms, Database Management, and Web Technologies.",
  },
  {
    id: "vhss",
    period: "2021 – 2023",
    degree: "12th (Higher Secondary) — PCMIT Stream",
    institution: "Vikash Higher Secondary School",
    location: "Sambalpur, Odisha",
    grade: "Grade: 70%",
    description:
      "Specialized in Physics, Chemistry, Mathematics, Information Technology, and core sciences.",
  },
  {
    id: "nhs",
    period: "2019 – 2021",
    degree: "10th (Secondary School Examination)",
    institution: "Niktimal High School",
    location: "Odisha",
    grade: "Grade: 75%",
    description:
      "Foundational secondary education with distinction in Mathematics and Science.",
  },
];
