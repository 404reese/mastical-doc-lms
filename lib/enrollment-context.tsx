"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  watchedDuration: number;
  totalDuration: number;
  lastWatched: Date;
}

export interface CourseProgress {
  courseId: string;
  enrolledAt: Date;
  lessons: { [lessonId: string]: LessonProgress };
  currentLesson?: string;
  completedLessons: number;
  totalLessons: number;
}

export interface EnrollmentContextType {
  enrolledCourses: { [courseId: string]: CourseProgress };
  enrollInCourse: (courseId: string, totalLessons: number) => void;
  isEnrolled: (courseId: string) => boolean;
  updateLessonProgress: (courseId: string, lessonId: string, progress: Partial<LessonProgress>) => void;
  getLessonProgress: (courseId: string, lessonId: string) => LessonProgress | null;
  getCourseProgress: (courseId: string) => CourseProgress | null;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | null>(null);

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<{ [courseId: string]: CourseProgress }>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('enrolledCourses');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      Object.values(parsed).forEach((course: any) => {
        course.enrolledAt = new Date(course.enrolledAt);
        Object.values(course.lessons).forEach((lesson: any) => {
          lesson.lastWatched = new Date(lesson.lastWatched);
        });
      });
      setEnrolledCourses(parsed);
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollInCourse = (courseId: string, totalLessons: number) => {
    setEnrolledCourses(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        enrolledAt: new Date(),
        lessons: {},
        completedLessons: 0,
        totalLessons,
      }
    }));
  };

  const isEnrolled = (courseId: string): boolean => {
    return courseId in enrolledCourses;
  };

  const updateLessonProgress = (courseId: string, lessonId: string, progress: Partial<LessonProgress>) => {
    setEnrolledCourses(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      const existingProgress = course.lessons[lessonId] || {
        lessonId,
        completed: false,
        watchedDuration: 0,
        totalDuration: 0,
        lastWatched: new Date(),
      };

      const updatedProgress = {
        ...existingProgress,
        ...progress,
        lastWatched: new Date(),
      };

      const updatedLessons = {
        ...course.lessons,
        [lessonId]: updatedProgress,
      };

      const completedLessons = Object.values(updatedLessons).filter(l => l.completed).length;

      return {
        ...prev,
        [courseId]: {
          ...course,
          lessons: updatedLessons,
          completedLessons,
        }
      };
    });
  };

  const getLessonProgress = (courseId: string, lessonId: string): LessonProgress | null => {
    const course = enrolledCourses[courseId];
    return course?.lessons[lessonId] || null;
  };

  const getCourseProgress = (courseId: string): CourseProgress | null => {
    return enrolledCourses[courseId] || null;
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    updateLessonProgress(courseId, lessonId, { completed: true });
  };

  const setCurrentLesson = (courseId: string, lessonId: string) => {
    setEnrolledCourses(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      return {
        ...prev,
        [courseId]: {
          ...course,
          currentLesson: lessonId,
        }
      };
    });
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrolledCourses,
        enrollInCourse,
        isEnrolled,
        updateLessonProgress,
        getLessonProgress,
        getCourseProgress,
        markLessonComplete,
        setCurrentLesson,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}