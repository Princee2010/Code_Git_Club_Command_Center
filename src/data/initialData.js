// Initial seed data for Git Club Command Center

export const INITIAL_USER = {
  id: 'usr_admin_1',
  name: 'Princee Bhingradiya',
  email: 'princee.gitclub@charusat.edu.in',
  role: 'admin', // 'admin' | 'event_lead' | 'member'
  title: 'Lead Club Administrator & Full Stack Dev',
  department: 'Computer Engineering (CE)',
  year: '3rd Year',
  college: 'DEPSTAR - CHARUSAT University',
  studentId: '24DIT006',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Passionate open-source advocate, competitive programmer, and leader at CHARUSAT Git Club. Architecting next-gen developer workflows and developer summits.',
  github: 'https://github.com/princee-dev',
  linkedin: 'https://linkedin.com/in/princee-bhingradiya',
  joinedDate: 'August 2024',
  eventsAttended: 12,
  projectsLed: 4,
};

export const INITIAL_EVENTS = [
  {
    id: 'evt_1',
    title: 'Git Hackathon 2026',
    type: 'Hackathon',
    category: 'Competition',
    date: '2026-09-28',
    formattedDate: '28 Sep 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'CHARUSAT Innovation Lab, Block 4',
    status: 'Upcoming', // 'Upcoming' | 'Completed'
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    description: 'A 48-hour high-octane development challenge bringing together 200+ top student developers, designers, and AI creators across Gujarat to build impactful solutions for smart governance, developer tooling, and sustainable tech.',
    registeredCount: 124,
    capacity: 200,
    registrationDeadline: '2026-09-27',
    speakers: ['Dr. A. Sharma (Head of AI)', 'Priya Mehta (Staff Engineer @ GitHub)'],
    tags: ['Hackathon', 'Open Source', 'Cash Prizes', 'Mentorship'],
    featured: true,
  },
  {
    id: 'evt_2',
    title: 'Modern Web Architecture & Next.js Workshop',
    type: 'Workshop',
    category: 'Workshop',
    date: '2026-10-05',
    formattedDate: '05 Oct 2026',
    time: '02:00 PM - 05:30 PM',
    venue: 'Seminar Hall B, DEPSTAR',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into modern web development with Next.js 15, Server Actions, Tailwind CSS v4, and scalable micro-frontend architectures. Includes hands-on coding and deployment to Vercel.',
    registeredCount: 88,
    capacity: 100,
    registrationDeadline: '2026-10-04',
    speakers: ['Princee Bhingradiya', 'Ketan Vaghasiya'],
    tags: ['Frontend', 'Next.js', 'React', 'Tailwind'],
    featured: false,
  },
  {
    id: 'evt_3',
    title: 'Hands-on Git & GitHub Advanced Mastery',
    type: 'Bootcamp',
    category: 'Workshop',
    date: '2026-10-14',
    formattedDate: '14 Oct 2026',
    time: '11:00 AM - 04:00 PM',
    venue: 'Computer Lab 301, Dep. of CE',
    status: 'Upcoming',
    banner: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    description: 'Master rebase, cherry-pick, bisect, reflog, merge conflict resolution strategies, GitHub Actions CI/CD pipelines, and contributing effectively to major open-source projects.',
    registeredCount: 96,
    capacity: 120,
    registrationDeadline: '2026-10-12',
    speakers: ['Rahul Patel (Open Source Contributor)'],
    tags: ['Git', 'GitHub', 'CI/CD', 'DevOps'],
    featured: false,
  },
  {
    id: 'evt_4',
    title: 'Generative AI & LLM Agent Building Summit',
    type: 'Conference',
    category: 'Tech Talk',
    date: '2026-08-20',
    formattedDate: '20 Aug 2026',
    time: '09:30 AM - 04:30 PM',
    venue: 'CHARUSAT Central Auditorium',
    status: 'Completed',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive day-long immersion on building autonomous AI agents with LangChain, LlamaIndex, vector databases, and multi-agent coordination frameworks.',
    registeredCount: 190,
    capacity: 200,
    registrationDeadline: '2026-08-18',
    speakers: ['Dr. Rajesh Kumar (AI Research)', 'Devanshi Joshi'],
    tags: ['GenAI', 'LLMs', 'Agents', 'Python'],
    featured: false,
  },
  {
    id: 'evt_5',
    title: 'Cloud Native & Kubernetes Crash Course',
    type: 'Workshop',
    category: 'Workshop',
    date: '2026-07-15',
    formattedDate: '15 Jul 2026',
    time: '01:00 PM - 05:00 PM',
    venue: 'Innovation Center 202',
    status: 'Completed',
    banner: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    description: 'Understanding containers from scratch: Docker images, multi-stage builds, pods, replica sets, services, ingress controllers, and Helm charts.',
    registeredCount: 75,
    capacity: 80,
    registrationDeadline: '2026-07-13',
    speakers: ['Siddharth Trivedi (DevOps Lead)'],
    tags: ['Docker', 'Kubernetes', 'Cloud', 'DevOps'],
    featured: false,
  },
  {
    id: 'evt_6',
    title: 'UI/UX Design Sprint & Figma Systems',
    type: 'Design Sprint',
    category: 'Workshop',
    date: '2026-06-10',
    formattedDate: '10 Jun 2026',
    time: '10:00 AM - 03:00 PM',
    venue: 'Design Studio Lab',
    status: 'Completed',
    banner: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Learn wireframing, component-driven design systems, micro-interactions, accessibility guidelines (WCAG 2.2), and developer handoff workflows in Figma.',
    registeredCount: 65,
    capacity: 70,
    registrationDeadline: '2026-06-08',
    speakers: ['Ananya Sen (Product Designer)'],
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Mobile'],
    featured: false,
  }
];

export const INITIAL_REGISTRATIONS = [
  { id: 'reg_1', eventId: 'evt_1', name: 'Rahul Patel', email: '22ce015@charusat.edu.in', studentId: '22CE015', branch: 'CE', year: '3rd Year', registeredAt: '2026-09-24 11:20 AM', status: 'Confirmed' },
  { id: 'reg_2', eventId: 'evt_1', name: 'Priya Shah', email: '23it044@charusat.edu.in', studentId: '23IT044', branch: 'IT', year: '2nd Year', registeredAt: '2026-09-24 12:45 PM', status: 'Confirmed' },
  { id: 'reg_3', eventId: 'evt_1', name: 'Aarav Mehta', email: '22cse098@charusat.edu.in', studentId: '22CSE098', branch: 'CSE', year: '3rd Year', registeredAt: '2026-09-24 02:15 PM', status: 'Confirmed' },
  { id: 'reg_4', eventId: 'evt_1', name: 'Sneha Dave', email: '24ce012@charusat.edu.in', studentId: '24CE012', branch: 'CE', year: '1st Year', registeredAt: '2026-09-25 09:30 AM', status: 'Confirmed' },
  { id: 'reg_5', eventId: 'evt_1', name: 'Kunal Joshi', email: '22it088@charusat.edu.in', studentId: '22IT088', branch: 'IT', year: '3rd Year', registeredAt: '2026-09-25 10:10 AM', status: 'Confirmed' },
  { id: 'reg_6', eventId: 'evt_1', name: 'Tanvi Panchal', email: '23ce105@charusat.edu.in', studentId: '23CE105', branch: 'CE', year: '2nd Year', registeredAt: '2026-09-25 03:40 PM', status: 'Confirmed' },
  { id: 'reg_7', eventId: 'evt_1', name: 'Dev Sharma', email: '22cse032@charusat.edu.in', studentId: '22CSE032', branch: 'CSE', year: '3rd Year', registeredAt: '2026-09-26 01:10 PM', status: 'Confirmed' },
  { id: 'reg_8', eventId: 'evt_1', name: 'Princee Bhingradiya', email: 'princee.gitclub@charusat.edu.in', studentId: '24DIT006', branch: 'CE', year: '3rd Year', registeredAt: '2026-09-26 04:22 PM', status: 'Confirmed' },
  { id: 'reg_9', eventId: 'evt_2', name: 'Vikram Solanki', email: '23it012@charusat.edu.in', studentId: '23IT012', branch: 'IT', year: '2nd Year', registeredAt: '2026-09-26 05:00 PM', status: 'Confirmed' },
  { id: 'reg_10', eventId: 'evt_2', name: 'Isha Desai', email: '22ce076@charusat.edu.in', studentId: '22CE076', branch: 'CE', year: '3rd Year', registeredAt: '2026-09-27 10:00 AM', status: 'Confirmed' }
];

export const INITIAL_MEMBERS = [
  {
    id: 'mem_1',
    name: 'Princee Bhingradiya',
    email: 'princee.gitclub@charusat.edu.in',
    studentId: '24DIT006',
    branch: 'CE',
    year: '3rd Year',
    role: 'Club President / Lead',
    domain: 'Core Team', // 'Core Team' | 'Developers' | 'Designers' | 'AI/ML' | 'Cloud/DevOps'
    skills: ['React', 'TypeScript', 'Python', 'TailwindCSS', 'Node.js', 'PostgreSQL'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/princee-dev',
    linkedin: 'https://linkedin.com/in/princee-bhingradiya',
    eventsParticipated: 12,
    projectsCount: 4,
    bio: 'Lead organizer of Git Club CHARUSAT. Building impactful web and open-source tools with clean modular engineering.',
    status: 'Active'
  },
  {
    id: 'mem_2',
    name: 'Rahul Patel',
    email: 'rahul.patel@charusat.edu.in',
    studentId: '22CE015',
    branch: 'CE',
    year: '3rd Year',
    role: 'Full Stack Developer',
    domain: 'Developers',
    skills: ['Node.js', 'Express', 'React', 'MongoDB', 'Docker', 'Redis'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/rahul-codes',
    linkedin: 'https://linkedin.com/in/rahulpatel-ce',
    eventsParticipated: 9,
    projectsCount: 5,
    bio: 'Backend enthusiast specializing in distributed systems, REST APIs, and microservice infrastructure.',
    status: 'Active'
  },
  {
    id: 'mem_3',
    name: 'Priya Shah',
    email: 'priya.shah@charusat.edu.in',
    studentId: '23IT044',
    branch: 'IT',
    year: '2nd Year',
    role: 'UI/UX Lead & Designer',
    domain: 'Designers',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'CSS3', 'Prototyping', 'User Research'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/priyadesigns',
    linkedin: 'https://linkedin.com/in/priya-shah-ux',
    eventsParticipated: 7,
    projectsCount: 3,
    bio: 'Crafting intuitive user journeys and high-fidelity interface systems for club applications and student projects.',
    status: 'Active'
  },
  {
    id: 'mem_4',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@charusat.edu.in',
    studentId: '22CSE098',
    branch: 'CSE',
    year: '3rd Year',
    role: 'AI / ML Engineer',
    domain: 'AI/ML',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'Hugging Face', 'Scikit-Learn'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/aarav-ml',
    linkedin: 'https://linkedin.com/in/aarav-mehta-ai',
    eventsParticipated: 8,
    projectsCount: 4,
    bio: 'Working on deep learning models, LLM pipelines, and automated ATS resume ranking architectures.',
    status: 'Active'
  },
  {
    id: 'mem_5',
    name: 'Sneha Dave',
    email: 'sneha.dave@charusat.edu.in',
    studentId: '24CE012',
    branch: 'CE',
    year: '1st Year',
    role: 'Frontend Junior Dev',
    domain: 'Developers',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/snehadave',
    linkedin: 'https://linkedin.com/in/sneha-dave',
    eventsParticipated: 4,
    projectsCount: 2,
    bio: 'First-year computer engineering student eager to learn modern web ecosystems and open-source workflows.',
    status: 'Active'
  },
  {
    id: 'mem_6',
    name: 'Kunal Joshi',
    email: 'kunal.joshi@charusat.edu.in',
    studentId: '22IT088',
    branch: 'IT',
    year: '3rd Year',
    role: 'Cloud & DevOps Lead',
    domain: 'Cloud/DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Linux'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/kunal-cloud',
    linkedin: 'https://linkedin.com/in/kunaljoshi-devops',
    eventsParticipated: 10,
    projectsCount: 6,
    bio: 'DevOps engineer managing club cloud hosting, CI/CD automated test pipelines, and container orchestrations.',
    status: 'Active'
  },
  {
    id: 'mem_7',
    name: 'Tanvi Panchal',
    email: 'tanvi.p@charusat.edu.in',
    studentId: '23CE105',
    branch: 'CE',
    year: '2nd Year',
    role: 'Core Team Secretary',
    domain: 'Core Team',
    skills: ['Event Planning', 'Public Relations', 'Python', 'Web Dev', 'Documentation'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/tanvipanchal',
    linkedin: 'https://linkedin.com/in/tanvi-panchal',
    eventsParticipated: 11,
    projectsCount: 3,
    bio: 'Coordinating event logistics, participant relations, and official university communications.',
    status: 'Active'
  },
  {
    id: 'mem_8',
    name: 'Dev Sharma',
    email: 'dev.sharma@charusat.edu.in',
    studentId: '22CSE032',
    branch: 'CSE',
    year: '3rd Year',
    role: 'Mobile App Developer',
    domain: 'Developers',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Android Studio'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/devsharma-app',
    linkedin: 'https://linkedin.com/in/devsharma-mobile',
    eventsParticipated: 6,
    projectsCount: 4,
    bio: 'Cross-platform mobile engineer delivering smooth native experiences with Flutter and Firebase.',
    status: 'Active'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    title: 'AI Resume Analyzer',
    category: 'AI/ML',
    status: 'Active', // 'Active' | 'Completed' | 'In Development'
    progress: 80,
    problem: 'College students struggle to tailor and evaluate their resumes against applicant tracking systems (ATS), often resulting in unnoticed applications.',
    solution: 'An intelligent AI-based resume analysis system that parses PDFs, compares keyword relevance with job descriptions, scores ATS match probability, and generates concrete syntax fixes.',
    technologies: ['React', 'Flask', 'Python', 'PostgreSQL', 'BERT', 'TailwindCSS'],
    teamMembers: [
      { name: 'Aarav Mehta', role: 'ML Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Princee Bhingradiya', role: 'Frontend Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Rahul Patel', role: 'Backend Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Priya Shah', role: 'UX Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/ai-resume-analyzer',
    demoUrl: 'https://ai-resume-analyzer.demo.app',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    stars: 42,
    forks: 14,
    lastUpdated: 'Yesterday'
  },
  {
    id: 'proj_2',
    title: 'EcoTrack - Campus Sustainability Monitor',
    category: 'IoT / Web',
    status: 'Completed',
    progress: 100,
    problem: 'University campus energy consumption and paper waste were unmonitored with zero transparency for students and administration.',
    solution: 'A real-time energy usage and solar production dashboard connected to campus IoT smart meters with predictive anomaly detection and carbon reduction leaderboards.',
    technologies: ['Next.js', 'Node.js', 'InfluxDB', 'MQTT', 'TailwindCSS', 'Recharts'],
    teamMembers: [
      { name: 'Rahul Patel', role: 'Lead Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Kunal Joshi', role: 'Cloud Arch', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
      { name: 'Priya Shah', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/ecotrack-campus',
    demoUrl: 'https://ecotrack.charusat.ac.in',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    stars: 68,
    forks: 22,
    lastUpdated: '3 days ago'
  },
  {
    id: 'proj_3',
    title: 'Git Club Command Center',
    category: 'Web',
    status: 'Active',
    progress: 92,
    problem: 'Club coordinators were juggling Google Sheets, WhatsApp groups, and email threads to manage hundreds of members, events, and project teams.',
    solution: 'A unified single-pane command center platform providing real-time KPI metrics, role-based controls, event registration workflows, and rich data analytics.',
    technologies: ['React', 'TailwindCSS v4', 'Vite', 'Recharts', 'Lucide React'],
    teamMembers: [
      { name: 'Princee Bhingradiya', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Priya Shah', role: 'Design Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sneha Dave', role: 'Junior Dev', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/command-center',
    demoUrl: 'https://gitclub.charusat.dev',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    stars: 85,
    forks: 31,
    lastUpdated: 'Just now'
  },
  {
    id: 'proj_4',
    title: 'Campus Lost & Found Mobile App',
    category: 'Mobile',
    status: 'In Development',
    progress: 55,
    problem: 'Lost student ID cards, calculators, and electronics around college campuses are rarely returned efficiently.',
    solution: 'A crowd-sourced mobile app with image recognition verification, student ID authentication, and instant push notification match alerts.',
    technologies: ['Flutter', 'Firebase', 'Cloud Functions', 'Algolia'],
    teamMembers: [
      { name: 'Dev Sharma', role: 'Mobile Dev', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sneha Dave', role: 'UI Dev', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/campus-lost-found',
    demoUrl: '#',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    stars: 29,
    forks: 8,
    lastUpdated: '1 week ago'
  },
  {
    id: 'proj_5',
    title: 'DevOps Pipeline Orchestrator',
    category: 'Cloud/DevOps',
    status: 'Active',
    progress: 70,
    problem: 'Student developers lack automated staging environments to test pull requests before submitting to college club repositories.',
    solution: 'Lightweight CLI and GitHub App that provisions automated ephemeral test containers on club servers for every open PR.',
    technologies: ['Go', 'Docker API', 'GitHub Webhooks', 'Redis', 'Traefik'],
    teamMembers: [
      { name: 'Kunal Joshi', role: 'Cloud Lead', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
      { name: 'Rahul Patel', role: 'Backend Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/pr-orchestrator',
    demoUrl: '#',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    stars: 47,
    forks: 12,
    lastUpdated: '4 days ago'
  },
  {
    id: 'proj_6',
    title: 'Smart Exam Timetable & Room Allocator',
    category: 'AI/ML',
    status: 'Completed',
    progress: 100,
    problem: 'Exam scheduling with conflict-free student seat distribution previously took days of manual faculty effort.',
    solution: 'Genetic algorithm-based constraint satisfaction engine that schedules exams and room seating without overlapping time slots or capacity violations.',
    technologies: ['Python', 'FastAPI', 'NumPy', 'Vue.js'],
    teamMembers: [
      { name: 'Aarav Mehta', role: 'Algorithm Dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    github: 'https://github.com/gitclub-charusat/exam-scheduler-ai',
    demoUrl: 'https://exam-scheduler.charusat.ac.in',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    stars: 54,
    forks: 18,
    lastUpdated: '2 weeks ago'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann_1',
    title: '🚨 Hackathon Registration Open: Git Hackathon 2026',
    category: 'Competition',
    priority: 'High', // 'High' | 'Normal' | 'Urgent'
    message: 'Registrations for the flagship Git Hackathon 2026 are officially open! Form teams of 2 to 4 members. Over ₹50,000 in prizes, internships, and cloud credits will be awarded. Hurry, seats are limited to 200 developers!',
    targetAudience: 'All Members',
    author: 'Princee Bhingradiya (Lead Admin)',
    timestamp: '2 hours ago',
    date: '2026-09-28'
  },
  {
    id: 'ann_2',
    title: '🚀 EcoTrack Selected for State Green Innovation Grant',
    category: 'General',
    priority: 'Normal',
    message: 'Heartiest congratulations to the EcoTrack development team! Their campus sustainability monitor project has been chosen for Gujarat State Tech Innovation Grant.',
    targetAudience: 'All Members',
    author: 'Rahul Patel (Dev Lead)',
    timestamp: '5 hours ago',
    date: '2026-09-28'
  },
  {
    id: 'ann_3',
    title: '📢 Core Team Recruitment: Fall 2026 Cycle',
    category: 'Recruitment',
    priority: 'High',
    message: 'Git Club is expanding! We are seeking motivated coordinators for Event Logistics, Graphic Design, Social Media Outreach, and AI Mentorship. 2nd and 3rd year students are encouraged to apply before October 10th.',
    targetAudience: '2nd & 3rd Year',
    author: 'Tanvi Panchal (Secretary)',
    timestamp: '1 day ago',
    date: '2026-09-27'
  },
  {
    id: 'ann_4',
    title: '🛠 Scheduled Server Maintenance: Club Cloud Services',
    category: 'Important',
    priority: 'Normal',
    message: 'The club development staging servers will undergo routine kernel patches and security upgrades on Saturday midnight. Expect 30 minutes of brief downtime.',
    targetAudience: 'Developers',
    author: 'Kunal Joshi (DevOps Lead)',
    timestamp: '2 days ago',
    date: '2026-09-26'
  },
  {
    id: 'ann_5',
    title: '💡 Modern Web Architecture Workshop Pre-requisites',
    category: 'Workshop',
    priority: 'Normal',
    message: 'All participants confirmed for the Next.js workshop must have Node.js v20+ and VS Code with ESLint and Prettier installed prior to attending.',
    targetAudience: 'Workshop Attendees',
    author: 'Princee Bhingradiya',
    timestamp: '3 days ago',
    date: '2026-09-25'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_1',
    type: 'member',
    color: 'emerald',
    text: 'Priya Shah joined Git Club as UI/UX Lead',
    detail: 'Profile created with Figma and design systems expertise.',
    time: '5 minutes ago',
    timestamp: Date.now() - 5 * 60 * 1000
  },
  {
    id: 'act_2',
    type: 'project',
    color: 'blue',
    text: 'Project "EcoTrack" status updated to Completed',
    detail: 'Deployed to production on campus server.',
    time: '15 minutes ago',
    timestamp: Date.now() - 15 * 60 * 1000
  },
  {
    id: 'act_3',
    type: 'event',
    color: 'purple',
    text: 'Hackathon registration reached 124 participants',
    detail: 'Git Hackathon 2026 is currently at 62% capacity.',
    time: '45 minutes ago',
    timestamp: Date.now() - 45 * 60 * 1000
  },
  {
    id: 'act_4',
    type: 'announcement',
    color: 'amber',
    text: 'Announcement published: "Hackathon Registration Open"',
    detail: 'Broadcasted to all club members across WhatsApp and Discord.',
    time: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000
  },
  {
    id: 'act_5',
    type: 'project',
    color: 'cyan',
    text: 'New project "Campus Lost & Found" added to Git Club',
    detail: 'Created by Dev Sharma with Flutter & Firebase.',
    time: '3 hours ago',
    timestamp: Date.now() - 3 * 3600 * 1000
  },
  {
    id: 'act_6',
    type: 'member',
    color: 'emerald',
    text: 'Rahul Patel contributed to AI Resume Analyzer',
    detail: 'Merged PR #14: Added FastAPI backend endpoints.',
    time: '5 hours ago',
    timestamp: Date.now() - 5 * 3600 * 1000
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'New Member Registered',
    message: 'Sneha Dave (1st Year, CE) has registered and completed member onboarding.',
    time: '2 minutes ago',
    read: false,
    type: 'member'
  },
  {
    id: 'notif_2',
    title: 'Hackathon Milestone Reached',
    message: 'Git Hackathon 2026 has exceeded 120 participant registrations.',
    time: '20 minutes ago',
    read: false,
    type: 'event'
  },
  {
    id: 'notif_3',
    title: 'New Project Submitted',
    message: 'Dev Sharma submitted "Campus Lost & Found Mobile App" for review.',
    time: '1 hour ago',
    read: false,
    type: 'project'
  },
  {
    id: 'notif_4',
    title: 'Upcoming Workshop Reminder',
    message: 'Modern Web Architecture Workshop starts in 7 days.',
    time: '6 hours ago',
    read: true,
    type: 'event'
  }
];

// Analytics Mock Data
export const ANALYTICS_DATA = {
  kpis: {
    members: 248,
    membersGrowth: '+12 this mo.',
    events: 12,
    eventsUpcoming: '3 upcoming',
    projects: 18,
    projectsActive: '6 active',
    participants: 436,
    participantsGrowth: '+18%'
  },
  eventParticipation: [
    { event: 'Hackathon 2026', participants: 150, capacity: 200, month: 'Oct' },
    { event: 'Web Workshop', participants: 110, capacity: 120, month: 'Sep' },
    { event: 'AI Workshop', participants: 90, capacity: 100, month: 'Aug' },
    { event: 'Git Mastery', participants: 60, capacity: 80, month: 'Jul' },
    { event: 'Cloud Native', participants: 75, capacity: 80, month: 'Jun' },
    { event: 'UI/UX Sprint', participants: 65, capacity: 70, month: 'May' }
  ],
  monthlyGrowth: [
    { month: 'May', members: 160, participants: 210, events: 2 },
    { month: 'Jun', members: 182, participants: 275, events: 2 },
    { month: 'Jul', members: 205, participants: 335, events: 3 },
    { month: 'Aug', members: 224, participants: 390, events: 2 },
    { month: 'Sep', members: 236, participants: 420, events: 2 },
    { month: 'Oct', members: 248, participants: 436, events: 3 }
  ],
  projectStatus: [
    { name: 'Active', value: 8, color: '#10b981' }, // emerald-500
    { name: 'Completed', value: 5, color: '#3b82f6' }, // blue-500
    { name: 'In Development', value: 5, color: '#f59e0b' } // amber-500
  ],
  branchDistribution: [
    { name: 'Computer Engineering (CE)', percentage: 40, count: 99, color: '#6366f1' },
    { name: 'Computer Science (CSE)', percentage: 35, count: 87, color: '#10b981' },
    { name: 'Information Tech (IT)', percentage: 25, count: 62, color: '#06b6d4' }
  ],
  domainDistribution: [
    { domain: 'Developers', count: 115, fill: '#3b82f6' },
    { domain: 'AI / ML', count: 52, fill: '#8b5cf6' },
    { domain: 'UI / UX', count: 38, fill: '#ec4899' },
    { domain: 'Cloud & DevOps', count: 28, fill: '#10b981' },
    { domain: 'Core Team', count: 15, fill: '#f59e0b' }
  ]
};
