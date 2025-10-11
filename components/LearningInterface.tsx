"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle, CheckCircle, Clock, BookOpen, Loader } from 'lucide-react';
import { Course, CourseLesson, CourseModule } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import VideoPlayer from '@/components/VideoPlayer';
import { useEnrollment } from '@/lib/enrollment-context';
import Link from 'next/link';

interface LearningInterfaceProps {
  course: Course;
}

export default function LearningInterface({ course }: LearningInterfaceProps) {
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const { getCourseProgress, getLessonProgress, setCurrentLesson: setCurrentLessonContext } = useEnrollment();
  
  const courseProgress = getCourseProgress(course.id);
  const progressPercentage = courseProgress ? (courseProgress.completedLessons / courseProgress.totalLessons) * 100 : 0;

  // Set initial lesson
  useEffect(() => {
    if (!currentLesson && course.curriculum.length > 0) {
      // Start with the current lesson from context, or first lesson
      const savedCurrentLesson = courseProgress?.currentLesson;
      let initialLesson = null;
      let initialModule = null;

      if (savedCurrentLesson) {
        // Find the saved current lesson
        for (const module of course.curriculum) {
          const lesson = module.lessons.find(l => l.id === savedCurrentLesson);
          if (lesson) {
            initialLesson = lesson;
            initialModule = module;
            break;
          }
        }
      }

      // If no saved lesson or lesson not found, start with first lesson
      if (!initialLesson) {
        initialModule = course.curriculum[0];
        initialLesson = initialModule.lessons[0];
      }

      setCurrentModule(initialModule);
      setCurrentLesson(initialLesson);
    }
  }, [course, courseProgress, currentLesson]);

  const selectLesson = (lesson: CourseLesson, module: CourseModule) => {
    setCurrentLesson(lesson);
    setCurrentModule(module);
    setCurrentLessonContext(course.id, lesson.id);
  };

  const goToNextLesson = () => {
    if (!currentModule || !currentLesson) return;

    const currentModuleIndex = course.curriculum.findIndex(m => m.id === currentModule.id);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);

    // Check if there's a next lesson in current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      const nextLesson = currentModule.lessons[currentLessonIndex + 1];
      selectLesson(nextLesson, currentModule);
    }
    // Check if there's a next module
    else if (currentModuleIndex < course.curriculum.length - 1) {
      const nextModule = course.curriculum[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        selectLesson(nextModule.lessons[0], nextModule);
      }
    }
  };

  const getLessonStatus = (lesson: CourseLesson) => {
    const progress = getLessonProgress(course.id, lesson.id);
    if (progress?.completed) return 'completed';
    if (progress && progress.watchedDuration > 0) return 'in-progress';
    return 'not-started';
  };

  const getModuleProgress = (module: CourseModule) => {
    const completedLessons = module.lessons.filter(lesson => 
      getLessonProgress(course.id, lesson.id)?.completed
    ).length;
    return (completedLessons / module.lessons.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-teal-50/20 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href={`/courses/${course.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">{course.title}</h1>
              <p className="text-gray-600">Learning Dashboard</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Overall Progress</div>
            <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
            <ProgressBar value={progressPercentage} className="w-32 mt-1" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-3">
            {currentLesson ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-blue-900">{currentLesson.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{currentLesson.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{currentLesson.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <VideoPlayer
                      videoUrl={currentLesson.videoUrl}
                      courseId={course.id}
                      lessonId={currentLesson.id}
                      lessonTitle={currentLesson.title}
                      onComplete={goToNextLesson}
                      autoPlay={false}
                    />
                  </CardContent>
                </Card>

                {/* Lesson Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Logic for previous lesson
                      const currentModuleIndex = course.curriculum.findIndex(m => m.id === currentModule?.id);
                      const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === currentLesson.id) ?? -1;
                      
                      if (currentLessonIndex > 0 && currentModule) {
                        const prevLesson = currentModule.lessons[currentLessonIndex - 1];
                        selectLesson(prevLesson, currentModule);
                      } else if (currentModuleIndex > 0) {
                        const prevModule = course.curriculum[currentModuleIndex - 1];
                        const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
                        selectLesson(lastLesson, prevModule);
                      }
                    }}
                    disabled={
                      currentModule?.id === course.curriculum[0].id && 
                      currentLesson?.id === course.curriculum[0].lessons[0].id
                    }
                  >
                    Previous Lesson
                  </Button>
                  <Button
                    onClick={goToNextLesson}
                    disabled={
                      currentModule?.id === course.curriculum[course.curriculum.length - 1].id &&
                      currentLesson?.id === course.curriculum[course.curriculum.length - 1].lessons[
                        course.curriculum[course.curriculum.length - 1].lessons.length - 1
                      ].id
                    }
                  >
                    Next Lesson
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                <p className="text-gray-500">Select a lesson to start learning</p>
              </div>
            )}
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Content
                </CardTitle>
                <div className="text-sm text-gray-600">
                  {courseProgress?.completedLessons || 0} of {courseProgress?.totalLessons || course.totalLectures} lessons completed
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {course.curriculum.map((module, moduleIndex) => {
                    const moduleProgress = getModuleProgress(module);
                    
                    return (
                      <div key={module.id} className="border-b border-gray-100 last:border-b-0">
                        <div className="p-4 bg-gray-50">
                          <h4 className="font-semibold text-sm text-gray-800 mb-2">
                            Module {moduleIndex + 1}: {module.title}
                          </h4>
                          <ProgressBar value={moduleProgress} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">
                            {Math.round(moduleProgress)}% complete
                          </p>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const status = getLessonStatus(lesson);
                            const isActive = currentLesson?.id === lesson.id;
                            
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(lesson, module)}
                                className={`w-full text-left p-3 hover:bg-blue-50 transition-colors ${
                                  isActive ? 'bg-blue-100 border-r-4 border-blue-600' : ''
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {status === 'completed' ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  ) : status === 'in-progress' ? (
                                    <Loader className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                  ) : (
                                    <PlayCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-medium text-gray-800 truncate">
                                      {lessonIndex + 1}. {lesson.title}
                                    </h5>
                                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                                  </div>
                                </div>
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="text-xs mt-1 ml-7">
                                    Preview
                                  </Badge>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}