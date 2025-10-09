export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory = "Surgery" | "Pediatrics" | "Cardiology" | "Neurology" | "Radiology" | "Emergency Medicine" | "Internal Medicine" | "Orthopedics";
export type CourseLanguage = "Bulgarian" | "English" | "French" | "German" | "Hindi" | "Hungarian" | "Portuguese" | "Romanian" | "Russian" | "Spanish";

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  instructor: string;
  instructorTitle: string;
  instructorBio: string;
  instructorImage: string;
  price: number;
  duration: string;
  level: CourseLevel;
  category: CourseCategory;
  language: CourseLanguage;
  rating: number;
  studentsEnrolled: number;
  image: string;
  features: string[];
  introVideo: string;
  curriculum: CourseModule[];
  tags: string[];
  totalLectures: number;
  certificateAvailable: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
}

const rawCoursesData = [
  {
    id: "1",
    title: "Advanced Cardiac Surgery Techniques",
    description: "Master cutting-edge cardiac surgical procedures with hands-on simulations and expert guidance from leading cardiothoracic surgeons.",
    fullDescription: "This comprehensive course offers an in-depth exploration of advanced cardiac surgical techniques, designed for experienced surgeons looking to enhance their skills in the rapidly evolving field of cardiothoracic surgery. Through a combination of theoretical knowledge, hands-on simulations, and live case studies, participants will master cutting-edge procedures including minimally invasive cardiac surgery, robotic-assisted procedures, and complex valve repairs. The curriculum covers the latest innovations in surgical technology, patient selection criteria, risk assessment, and post-operative care protocols. Led by world-renowned cardiac surgeons, this program provides access to state-of-the-art simulation labs and live surgical demonstrations from leading medical centers worldwide.",
    instructor: "Dr. Sarah Johnson",
    instructorTitle: "Chief Cardiothoracic Surgeon",
    instructorBio: "Dr. Sarah Johnson is a world-renowned cardiothoracic surgeon with over 20 years of experience in complex cardiac procedures. She has performed over 3,000 cardiac surgeries and is a pioneer in minimally invasive cardiac surgery techniques. Dr. Johnson is currently the Chief of Cardiothoracic Surgery at Johns Hopkins Hospital and has authored over 150 peer-reviewed publications.",
    instructorImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 899,
    duration: "12 weeks",
    level: "Advanced",
    category: "Surgery",
    language: "English",
    rating: 4.9,
    studentsEnrolled: 1240,
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["3D Surgical Simulations", "Live Case Reviews", "CME Credits", "Certificate"],
    introVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    curriculum: [
      {
        id: "module-1",
        title: "Fundamentals of Advanced Cardiac Surgery",
        lessons: [
          { id: "lesson-1-1", title: "Introduction to Advanced Techniques", duration: "45 min", isPreview: true },
          { id: "lesson-1-2", title: "Surgical Planning and Risk Assessment", duration: "60 min", isPreview: false },
          { id: "lesson-1-3", title: "Patient Selection Criteria", duration: "40 min", isPreview: false }
        ]
      },
      {
        id: "module-2", 
        title: "Minimally Invasive Procedures",
        lessons: [
          { id: "lesson-2-1", title: "Port-Access Cardiac Surgery", duration: "75 min", isPreview: false },
          { id: "lesson-2-2", title: "Robotic-Assisted Surgery", duration: "90 min", isPreview: false },
          { id: "lesson-2-3", title: "Endoscopic Techniques", duration: "65 min", isPreview: false }
        ]
      }
    ],
    tags: ["Cardiac Surgery", "Advanced Techniques", "Minimally Invasive", "Robotic Surgery"],
    totalLectures: 24,
    certificateAvailable: true
  },
  {
    id: "2",
    title: "Pediatric Emergency Care",
    description: "Comprehensive training in pediatric emergency medicine covering trauma, respiratory distress, and critical care protocols.",
    fullDescription: "This intensive course provides healthcare professionals with essential skills in pediatric emergency medicine. Covering critical scenarios from neonates to adolescents, participants will learn rapid assessment techniques, life-saving interventions, and evidence-based treatment protocols. The curriculum includes hands-on simulation training, case-based learning, and interactive workshops led by experienced pediatric emergency physicians.",
    instructor: "Dr. Michael Chen",
    instructorTitle: "Pediatric Emergency Specialist",
    instructorBio: "Dr. Michael Chen is a board-certified pediatric emergency medicine physician with 15 years of experience. He serves as the Director of Pediatric Emergency Services at Children's Hospital of Philadelphia and has trained hundreds of healthcare providers in pediatric emergency care.",
    instructorImage: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 749,
    duration: "8 weeks",
    level: "Intermediate",
    category: "Pediatrics",
    language: "English",
    rating: 4.8,
    studentsEnrolled: 2150,
    image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Case Studies", "Emergency Protocols", "CME Credits", "Certificate"],
    introVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    curriculum: [
      {
        id: "module-1",
        title: "Pediatric Assessment and Triage",
        lessons: [
          { id: "lesson-1-1", title: "Rapid Pediatric Assessment", duration: "30 min", isPreview: true },
          { id: "lesson-1-2", title: "Triage Protocols for Children", duration: "45 min", isPreview: false }
        ]
      }
    ],
    tags: ["Pediatrics", "Emergency Medicine", "Critical Care", "Trauma"],
    totalLectures: 18,
    certificateAvailable: true
  },
  {
    id: "3",
    title: "Diagnostic Radiology Fundamentals",
    description: "Learn to interpret X-rays, CT scans, and MRIs with confidence through systematic image analysis techniques.",
    instructor: "Dr. Emily Rodriguez",
    instructorTitle: "Head of Radiology",
    price: 649,
    duration: "10 weeks",
    level: "Beginner",
    category: "Radiology",
    language: "English",
    rating: 4.7,
    studentsEnrolled: 980,
    image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Image Analysis", "AI-Assisted Learning", "CME Credits", "Certificate"]
  },
  {
    id: "4",
    title: "Neurosurgical Innovations",
    description: "Explore the latest minimally invasive techniques in neurosurgery including endoscopic and robotic procedures.",
    instructor: "Dr. James Williams",
    instructorTitle: "Professor of Neurosurgery",
    price: 999,
    duration: "14 weeks",
    level: "Advanced",
    category: "Neurology",
    language: "English",
    rating: 4.9,
    studentsEnrolled: 756,
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Surgical Techniques", "3D Brain Models", "CME Credits", "Certificate"]
  },
  {
    id: "5",
    title: "Cardiología Clínica Avanzada",
    description: "Curso completo de cardiología clínica con enfoque en diagnóstico, tratamiento y prevención de enfermedades cardiovasculares.",
    instructor: "Dr. Carlos Mendez",
    instructorTitle: "Cardiólogo Clínico",
    price: 699,
    duration: "10 weeks",
    level: "Intermediate",
    category: "Cardiology",
    language: "Spanish",
    rating: 4.8,
    studentsEnrolled: 1450,
    image: "https://images.pexels.com/photos/7088531/pexels-photo-7088531.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["ECG Analysis", "Case Studies", "CME Credits", "Certificate"]
  },
  {
    id: "6",
    title: "Emergency Medicine Protocols",
    description: "Master critical decision-making in emergency situations with evidence-based protocols and simulation training.",
    instructor: "Dr. Patricia O'Connor",
    instructorTitle: "Emergency Medicine Director",
    price: 799,
    duration: "9 weeks",
    level: "Intermediate",
    category: "Emergency Medicine",
    language: "English",
    rating: 4.9,
    studentsEnrolled: 1890,
    image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Emergency Simulations", "ACLS Training", "CME Credits", "Certificate"]
  },
  {
    id: "7",
    title: "आंतरिक चिकित्सा मूल बातें",
    description: "आंतरिक चिकित्सा के मूल सिद्धांतों को समझें और सामान्य रोगों का निदान और उपचार सीखें।",
    instructor: "Dr. Rajesh Kumar",
    instructorTitle: "Internal Medicine Consultant",
    price: 549,
    duration: "8 weeks",
    level: "Beginner",
    category: "Internal Medicine",
    language: "Hindi",
    rating: 4.6,
    studentsEnrolled: 1120,
    image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Clinical Cases", "Diagnosis Training", "CME Credits", "Certificate"]
  },
  {
    id: "8",
    title: "Orthopedic Surgery Essentials",
    description: "Comprehensive training in orthopedic surgical techniques including joint replacement and fracture management.",
    instructor: "Dr. Robert Martinez",
    instructorTitle: "Orthopedic Surgeon",
    price: 849,
    duration: "11 weeks",
    level: "Advanced",
    category: "Orthopedics",
    language: "English",
    rating: 4.8,
    studentsEnrolled: 1340,
    image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Surgical Videos", "3D Anatomy", "CME Credits", "Certificate"]
  },
  {
    id: "9",
    title: "Pédiatrie Générale",
    description: "Formation complète en pédiatrie couvrant le développement de l'enfant, les maladies courantes et les soins préventifs.",
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Pédiatre",
    price: 649,
    duration: "10 weeks",
    level: "Beginner",
    category: "Pediatrics",
    language: "French",
    rating: 4.7,
    studentsEnrolled: 890,
    image: "https://images.pexels.com/photos/4021807/pexels-photo-4021807.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Child Development", "Vaccination Protocols", "CME Credits", "Certificate"]
  },
  {
    id: "10",
    title: "Interventional Cardiology",
    description: "Advanced training in catheter-based cardiovascular procedures including angioplasty and stent placement.",
    instructor: "Dr. David Lee",
    instructorTitle: "Interventional Cardiologist",
    price: 949,
    duration: "12 weeks",
    level: "Advanced",
    category: "Cardiology",
    language: "English",
    rating: 4.9,
    studentsEnrolled: 1580,
    image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Catheterization Lab", "Live Procedures", "CME Credits", "Certificate"]
  },
  {
    id: "11",
    title: "Radiologie Diagnostique",
    description: "Apprenez à interpréter les images médicales avec précision et à établir des diagnostics radiologiques fiables.",
    instructor: "Dr. François Laurent",
    instructorTitle: "Radiologue",
    price: 699,
    duration: "9 weeks",
    level: "Intermediate",
    category: "Radiology",
    language: "French",
    rating: 4.7,
    studentsEnrolled: 720,
    image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Image Interpretation", "Case Reviews", "CME Credits", "Certificate"]
  },
  {
    id: "12",
    title: "Traumatología y Cirugía Ortopédica",
    description: "Formación especializada en el manejo de lesiones traumáticas y procedimientos ortopédicos avanzados.",
    instructor: "Dr. Antonio García",
    instructorTitle: "Traumatólogo",
    price: 799,
    duration: "11 weeks",
    level: "Advanced",
    category: "Orthopedics",
    language: "Spanish",
    rating: 4.8,
    studentsEnrolled: 980,
    image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Trauma Management", "Surgical Planning", "CME Credits", "Certificate"]
  }
];

// Helper function to add default values for incomplete courses
const addDefaultValues = (course: any): Course => ({
  ...course,
  fullDescription: course.fullDescription || course.description + " This course provides comprehensive training with hands-on experience and expert instruction to help you master the essential concepts and practical skills needed in this field.",
  instructorBio: course.instructorBio || `${course.instructor} is an experienced medical professional with extensive expertise in ${course.category.toLowerCase()}. With years of clinical practice and teaching experience, they bring real-world insights to help students understand complex medical concepts.`,
  instructorImage: course.instructorImage || "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
  introVideo: course.introVideo || "https://www.youtube.com/embed/dQw4w9WgXcQ",
  curriculum: course.curriculum || [
    {
      id: "module-1",
      title: "Introduction and Fundamentals",
      lessons: [
        { id: "lesson-1-1", title: "Course Overview", duration: "30 min", isPreview: true },
        { id: "lesson-1-2", title: "Basic Concepts", duration: "45 min", isPreview: false }
      ]
    }
  ],
  tags: course.tags || [course.category, course.level],
  totalLectures: course.totalLectures || 12,
  certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true
});

export const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const categories: CourseCategory[] = ["Surgery", "Pediatrics", "Cardiology", "Neurology", "Radiology", "Emergency Medicine", "Internal Medicine", "Orthopedics"];
export const languages: CourseLanguage[] = ["Bulgarian", "English", "French", "German", "Hindi", "Hungarian", "Portuguese", "Romanian", "Russian", "Spanish"];

export const coursesData: Course[] = rawCoursesData.map(addDefaultValues);
