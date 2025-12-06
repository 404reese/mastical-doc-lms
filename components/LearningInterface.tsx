"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageCircleQuestion,
  User,
  FileText,
  Download
} from 'lucide-react';
import { Course, CourseLesson, CourseModule } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/lib/enrollment-context';
import Link from 'next/link';
import DoubtModal from './DoubtModal';

interface LearningInterfaceProps {
  course: Course;
}

export default function LearningInterface({ course }: LearningInterfaceProps) {
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'instructor'>('resources');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);

  const { getCourseProgress, getLessonProgress, setCurrentLesson: setCurrentLessonContext, markLessonComplete } = useEnrollment();

  const courseProgress = getCourseProgress(course.id);
  const progressPercentage = courseProgress ? (courseProgress.completedLessons / courseProgress.totalLessons) * 100 : 0;

  // Set initial lesson and expand first module
  useEffect(() => {
    if (!currentLesson && course.curriculum.length > 0) {
      const savedCurrentLesson = courseProgress?.currentLesson;
      let initialLesson = null;
      let initialModule = null;

      if (savedCurrentLesson) {
        for (const module of course.curriculum) {
          const lesson = module.lessons.find(l => l.id === savedCurrentLesson);
          if (lesson) {
            initialLesson = lesson;
            initialModule = module;
            break;
          }
        }
      }

      if (!initialLesson) {
        initialModule = course.curriculum[0];
        initialLesson = initialModule.lessons[0];
      }

      setCurrentModule(initialModule);
      setCurrentLesson(initialLesson);
      if (initialModule) {
        setExpandedModules([initialModule.id]);
      }
    }
  }, [course, courseProgress, currentLesson]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectLesson = (lesson: CourseLesson, module: CourseModule) => {
    setCurrentLesson(lesson);
    setCurrentModule(module);
    setCurrentLessonContext(course.id, lesson.id);

    // Ensure the module is expanded
    if (!expandedModules.includes(module.id)) {
      setExpandedModules(prev => [...prev, module.id]);
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
    return { completed: completedLessons, total: module.lessons.length };
  };

  // Get Vimeo embed URL
  const getVimeoEmbedUrl = (url: string) => {
    // If it's already a Vimeo player URL, return it
    if (url.includes('player.vimeo.com')) return url;

    // For demo, use a sample Vimeo video
    return 'https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0';
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Top Navigation Bar */}
      <div className="bg-white text-blue-800 sticky top-0 z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/courses/${course.id}`}>
                <button className="flex items-center gap-2 text-blue-800 hover:text-blue-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Exit</span>
                </button>
              </Link>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-sm sm:text-base font-semibold line-clamp-1">{course.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="text-gray-500">Your progress:</div>
                <div className="font-semibold text-blue-600">{Math.round(progressPercentage)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Side - Video and Tabs */}
        <div className="flex-1 bg-black">
          {/* Video Player */}
          <div className="relative bg-black" style={{ height: 'calc(100vh - 72px)' }}>
            {currentLesson ? (
              <div className="w-full h-full">
                <iframe
                  src={getVimeoEmbedUrl(currentLesson.videoUrl)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={currentLesson.title}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Select a lesson to start learning</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Course Content */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto" style={{ height: 'calc(100vh - 72px)' }}>
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
            <p className="text-sm text-gray-600 mt-1">
              {courseProgress?.completedLessons || 0} / {course.totalLectures} lessons completed
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-gray-200">
            {course.curriculum.map((module, moduleIndex) => {
              const isExpanded = expandedModules.includes(module.id);
              const moduleStats = getModuleProgress(module);

              return (
                <div key={module.id}>
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        Section {moduleIndex + 1}: {module.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {moduleStats.completed}/{moduleStats.total} lessons
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {/* Module Lessons */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const status = getLessonStatus(lesson);
                            const isActive = currentLesson?.id === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(lesson, module)}
                                className={`w-full px-4 py-3 hover:bg-blue-50 transition-colors flex items-start gap-3 border-l-4 ${isActive
                                  ? 'bg-blue-50 border-blue-600'
                                  : 'border-transparent'
                                  }`}
                              >
                                {/* Icon */}
                                <div className="flex-shrink-0 mt-0.5">
                                  {status === 'completed' ? (
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <PlayCircle className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-left">
                                  <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-900'
                                    }`}>
                                    {lessonIndex + 1}. {lesson.title}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                                    {lesson.isPreview && (
                                      <span className="text-xs text-blue-600 font-medium">Preview</span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section - Tabs */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-4 font-semibold text-sm transition-colors relative ${activeTab === 'resources'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resources
              </div>
              {activeTab === 'resources' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`px-6 py-4 font-semibold text-sm transition-colors relative ${activeTab === 'instructor'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Instructor
              </div>
              {activeTab === 'instructor' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Course Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About this course</h3>
                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>{course.fullDescription || course.description}</p>
                  </div>
                </div>

                {/* Instructor Notes & Documents */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    Course Materials & Notes
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">


                    {/* Sample Documents/Resources */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Course Syllabus</div>
                              <div className="text-xs text-gray-500">PDF • 2.5 MB</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Lecture Notes - Module 1</div>
                              <div className="text-xs text-gray-500">PDF • 1.8 MB</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Reference Materials</div>
                              <div className="text-xs text-gray-500">PDF • 3.2 MB</div>
                            </div>
                          </div>
                          <Download className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">About the Instructor</h3>
                <div className="flex items-start gap-6">
                  {course.instructorImage && (
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900">{course.instructor}</h4>
                    <p className="text-blue-600 font-medium mt-1">{course.instructorTitle}</p>
                    <p className="text-gray-700 mt-4 leading-relaxed">{course.instructorBio}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Ask Doubt Button */}
      <button
        onClick={() => setIsDoubtModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2 group"
      >
        <MessageCircleQuestion className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
          Ask a Question
        </span>
      </button>

      {/* Doubt Modal */}
      <DoubtModal
        isOpen={isDoubtModalOpen}
        onClose={() => setIsDoubtModalOpen(false)}
        courseName={course.title}
        lessonName={currentLesson?.title}
      />
    </div>
  );
}