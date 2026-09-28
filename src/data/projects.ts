export type ProjectCategory = "frontend" | "fullstack" | "aiml";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "staypoint",
    title: "Staypoint",
    description:
      "A complete full-stack web application offering real-world accommodation booking solutions, user authentication, and interactive management.",
    category: "fullstack",
    tags: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    image: "/image/StayPoint.png",
    liveUrl: "https://staypoint-alpha.vercel.app/",
    githubUrl: "https://github.com/ChinmayaMeher",
    featured: true,
  },
  {
    id: "virtual-mouse",
    title: "Gesture Controlled Virtual Mouse",
    description:
      "Control your computer screen hands-free using computer vision and hand gestures with high precision real-time landmark recognition.",
    category: "aiml",
    tags: ["Python", "MediaPipe", "OpenCV", "Neural Network"],
    image: "/image/Virtuan_mouse.png",
    liveUrl: "https://gesture-controlled-virtual-mouse-we.vercel.app/",
    githubUrl: "https://github.com/ChinmayaMeher",
    featured: true,
  },
  {
    id: "spotify-clone",
    title: "Spotify UI Clone",
    description:
      "Front-end replica of Spotify's desktop & web player featuring audio player controls, interactive playlists, and responsive navigation.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "JavaScript", "Audio API"],
    image: "/image/Ss_spotify.png",
    liveUrl: "https://chinmayameher.github.io/Spotify_UI_Clone/",
    githubUrl: "https://github.com/ChinmayaMeher/Spotify_UI_Clone",
    featured: true,
  },
  {
    id: "amazon-clone",
    title: "Amazon Website UI",
    description:
      "Full e-commerce front-end clone of Amazon featuring complex multi-level navigation, responsive product card grids, and search bar layout.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/image/Screenshot of amazon.png",
    liveUrl: "https://chinmayameher.github.io/Amazon_Frontend_Clone/",
    githubUrl: "https://github.com/ChinmayaMeher/Amazon_Frontend_Clone",
  },
  {
    id: "pixel-generator",
    title: "GridPixel Generator",
    description:
      "Web tool for designing customizable graph sheets, isometric grids, and drawing pixel-style graphics with dynamic canvas rendering.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "HTML Canvas", "JavaScript"],
    image: "/image/graph_sheet.png",
    liveUrl: "https://chinmayameher.github.io/Graph-sheet-generator/",
    githubUrl: "https://github.com/ChinmayaMeher/Graph-sheet-generator",
  },
  {
    id: "tic-tac-toe",
    title: "Interactive Tic Tac Toe",
    description:
      "Two-player turn-based Tic Tac Toe game with smooth animated win detection, win line strikes, and persistent score tracking.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/image/Tic Tac Toe.png",
    liveUrl: "https://chinmayameher.github.io/Tic_Tac_Toe_Game",
    githubUrl: "https://github.com/ChinmayaMeher/Tic_Tac_Toe_Game",
  },
  {
    id: "countdown-timer",
    title: "Event Countdown Timer",
    description:
      "Real-time countdown timer displaying days, hours, minutes, and seconds until upcoming events with custom target dates.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/image/ss_timer.png",
    liveUrl: "https://chinmayameher.github.io/Event-Countdown-Timer/",
    githubUrl: "https://github.com/ChinmayaMeher/Event-Countdown-Timer",
  },
  {
    id: "digital-calculator",
    title: "Digital Calculator",
    description:
      "Fully functional digital calculator with arithmetic expressions, keyboard listener support, backspace, and clean dark UI.",
    category: "frontend",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/image/ss_calculator.png",
    liveUrl: "https://chinmayameher.github.io/Digital-Calculator/",
    githubUrl: "https://github.com/ChinmayaMeher/Digital-Calculator",
  },
];
