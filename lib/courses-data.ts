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
  videoUrl: string;
  description?: string;
}

import coursesJson from '@/data/courses.json';

const rawCoursesData = coursesJson;

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
  certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
  // Ensure typed fields match union types by casting or validation if needed, 
  // for now assuming JSON matches types as it was copied from valid TS.
  level: course.level as CourseLevel,
  category: course.category as CourseCategory,
  language: course.language as CourseLanguage
});

export const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const categories: CourseCategory[] = ["Surgery", "Pediatrics", "Cardiology", "Neurology", "Radiology", "Emergency Medicine", "Internal Medicine", "Orthopedics"];
export const languages: CourseLanguage[] = ["Bulgarian", "English", "French", "German", "Hindi", "Hungarian", "Portuguese", "Romanian", "Russian", "Spanish"];

export const coursesData: Course[] = rawCoursesData.map(addDefaultValues);
