export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React JS",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Redux",
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express JS",
      "Spring Boot",
      "MySQL",
      "MongoDB",
      "Firebase",
      "RESTful APIs",
    ],
  },
  {
    title: "Languages",
    icon: "💻",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++"],
  },
  {
    title: "Data Science",
    icon: "📊",
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Power BI",
      "MS Excel",
      "Statistics",
    ],
  },
  {
    title: "Machine Learning",
    icon: "🤖",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Jupyter",
      "HuggingFace",
      "MLflow",
      "Computer Vision",
    ],
  },
  {
    title: "Generative AI",
    icon: "✨",
    skills: [
      "OpenAI API",
      "LangChain",
      "Prompt Engineering",
      "Docker",
      "Streamlit",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "🛠️",
    skills: ["Git", "GitHub", "VS Code", "Postman", "SQL", "Vercel"],
  },
];
