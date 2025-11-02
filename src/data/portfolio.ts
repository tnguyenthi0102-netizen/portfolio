export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Contact', hash: '#contact' },
] as const

export type ExperienceItem = {
  title: string
  location: string
  description: string
  date: string
}

export const experiencesData: ExperienceItem[] = [
  {
    title: 'Bachelor of Computer Engineering',
    location: 'University of Engineering and Technology – Vietnam National University, Hanoi',
    description:
      'I graduated with a degree in Computer Engineering from University of Engineering and Technology. I gained strong foundations in software development.',
    date: '2009 - 2013',
  },
  {
    title: 'Software Engineer',
    location: 'TamTay',
    description:
      'I started my career as a Software Engineer, working on various web applications and gaining experience with different technologies and frameworks.',
    date: '2014 - 2016',
  },
  {
    title: 'Fullstack Developer',
    location: 'Ntq solution',
    description:
      'Worked on diverse projects ranging from fintech to healthcare applications. Developed full-stack solutions using React, Node.js, GraphQL and third-party APIs.',
    date: '2016 - 2019',
  },
  {
    title: 'Frontend Developer',
    location: 'SmartUp',
    description:
      'Led frontend architecture and development for E-Learning platform. Delivered production-ready features for multi-client facing applications using React/React Native.',
    date: '2019 - 2022',
  },
  {
    title: 'Senior JavaScript Developer',
    location: 'Globant',
    description:
      "I'm now working as a Senior JavaScript Developer with expertise in React/React Native. My focus is on performance optimization, scalable architecture, and delivering high-quality software solutions.",
    date: '2022 - present',
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  liveSite?: string
}

export const projectsData: Project[] = [
  {
    title: 'YLANE',
    description:
      'Built and maintained a social networking app with real-time chat, video calls (Agora SDK), and push notifications. Developed cross-platform mobile app using React Native and web version with Next.js, integrated GraphQL APIs and implemented WebSocket for real-time features.',
    tags: ['React JS', 'React Native', 'Next.js', 'Agora SDK', 'Socket', 'GraphQL'],
    imageUrl: '/images/ylanes1.jpg',
    liveSite: 'https://landing-phi-rust.vercel.app/',
  },
  {
    title: 'SNAGASHYFT',
    description:
      'Developed frontend for staffing platform serving hospitality industry. Built responsive web and mobile apps using React/React Native, integrated with REST APIs, implemented real-time features and optimized user experience.',
    tags: ['React JS', 'React Native', 'REST API', 'TypeScript'],
    imageUrl: '/images/snagashyft.png',
    liveSite: 'https://snagashyft.com/',
  },
  {
    title: 'SMARTUP',
    description:
      'Architected and developed e-learning platform with React/React Native. Implemented push notifications, CI/CD pipeline, and successfully deployed to both App Store and Google Play Store. Built RESTful APIs and optimized app performance for educational content delivery.',
    tags: [
      'React JS',
      'React Native',
      'TypeScript',
      'Push Notification',
      'CI/CD',
      'App Store Deployment',
      'Google Play Store',
      'REST API',
      'E-Learning',
    ],
    imageUrl: '/images/smartup.png',
  },
  {
    title: 'PRISM',
    description:
      'Built interactive data analytics dashboards with advanced visualization features. Developed using Polymer framework and Groovy on Grails, implemented real-time data processing and created user-friendly interfaces for business intelligence.',
    tags: [
      'Polymer',
      'Groovy on Grails',
      'Analytics',
      'Dashboard',
      'Data Visualization',
      'Interactive Charts',
    ],
    imageUrl: '/images/prism.png',
  },
  {
    title: 'TAMTAY',
    description:
      'Developed admin management system for gaming portal. Built admin dashboard using PHP backend to manage games, players, user accounts, and system configurations. Created responsive web interface for administrators to monitor and control the gaming platform.',
    tags: ['PHP', 'Admin Dashboard', 'Game Management', 'User Management', 'Gaming Portal'],
    imageUrl: '/images/tamtay.png',
    liveSite: 'https://chanthapthanh.com/',
  },
]

export const skillsData = [
  'React JS',
  'React Native',
  'JavaScript',
  'TypeScript',
  'Redux',
  'REST',
  'GraphQL',
  'Material UI',
  'Bootstrap',
  'Tailwind',
  'Ant Design',
  'Node.js',
  'PHP',
  'MongoDB',
  'SQL',
  'Figma',
  'Microservices',
  'Groovy on Grails',
  'Jest/Unit test',
  'Admin JS',
  'Polymer',
  'Angular',
  'SEO',
  'CI/CD/Vercel',
  'WebSocket',
  'Performance Optimization',
  'Accessibility Best Practices',
]
