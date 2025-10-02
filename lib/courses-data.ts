export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseCategory = "Surgery" | "Pediatrics" | "Cardiology" | "Neurology" | "Radiology" | "Emergency Medicine" | "Internal Medicine" | "Orthopedics";
export type CourseLanguage = "Bulgarian" | "English" | "French" | "German" | "Hindi" | "Hungarian" | "Portuguese" | "Romanian" | "Russian" | "Spanish";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  price: number;
  duration: string;
  level: CourseLevel;
  category: CourseCategory;
  language: CourseLanguage;
  rating: number;
  studentsEnrolled: number;
  image: string;
  features: string[];
}

export const coursesData: Course[] = [
  {
    id: "1",
    title: "Advanced Cardiac Surgery Techniques",
    description: "Master cutting-edge cardiac surgical procedures with hands-on simulations and expert guidance from leading cardiothoracic surgeons.",
    instructor: "Dr. Sarah Johnson",
    instructorTitle: "Chief Cardiothoracic Surgeon",
    price: 899,
    duration: "12 weeks",
    level: "Advanced",
    category: "Surgery",
    language: "English",
    rating: 4.9,
    studentsEnrolled: 1240,
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["3D Surgical Simulations", "Live Case Reviews", "CME Credits", "Certificate"]
  },
  {
    id: "2",
    title: "Pediatric Emergency Care",
    description: "Comprehensive training in pediatric emergency medicine covering trauma, respiratory distress, and critical care protocols.",
    instructor: "Dr. Michael Chen",
    instructorTitle: "Pediatric Emergency Specialist",
    price: 749,
    duration: "8 weeks",
    level: "Intermediate",
    category: "Pediatrics",
    language: "English",
    rating: 4.8,
    studentsEnrolled: 2150,
    image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Case Studies", "Emergency Protocols", "CME Credits", "Certificate"]
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

export const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const categories: CourseCategory[] = ["Surgery", "Pediatrics", "Cardiology", "Neurology", "Radiology", "Emergency Medicine", "Internal Medicine", "Orthopedics"];
export const languages: CourseLanguage[] = ["Bulgarian", "English", "French", "German", "Hindi", "Hungarian", "Portuguese", "Romanian", "Russian", "Spanish"];
