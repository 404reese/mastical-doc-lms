"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  Globe,
  CheckCircle,
  PlayCircle,
  AlertCircle
} from "lucide-react";
import { Course } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEnrollment } from "@/lib/enrollment-context";

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const router = useRouter();
  const { isEnrolled, enrollInCourse } = useEnrollment();

  const enrolled = isEnrolled(course.id);

  const handleEnrollment = () => {
    if (!enrolled) {
      enrollInCourse(course.id, course.totalLectures);
    }
    router.push(`/courses/${course.id}/learn`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <div className="bg-white text-gray-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="lg:max-w-[800px] space-y-4 lg:space-y-6">
            {/* Breadcrumbs (Visual only) */}
            <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-4 mt-16">
              <span className="cursor-pointer hover:text-blue-800 transition">Home</span>
              <span>&gt;</span>
              <span className="cursor-pointer hover:text-blue-800 transition">Courses</span>
              <span>&gt;</span>
              <span className="cursor-pointer hover:text-blue-800 transition">{course.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {course.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              {course.description}
            </p>



            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Created by</span>
                <a href="#instructor" className="text-blue-600 underline hover:text-blue-800 transition">
                  {course.instructor}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="h-4 w-4" />
                Last updated 11/2024
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="h-4 w-4" />
                {course.language}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Sidebar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">

          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-12 mb-16">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                <p>{course.fullDescription}</p>
                <p>
                  This course is designed to take you from a complete beginner to an advanced practitioner.
                  We cover everything from the fundamentals to complex real-world scenarios.
                </p>

              </div>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>No prior experience required.</li>
                <li>A willingness to learn and clear some time for practice.</li>
                <li>Access to a computer with internet connection.</li>
              </ul>
            </div>

            {/* Course Content Accordion */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course content</h2>
              <div className="text-sm text-gray-600 mb-4 flex justify-between items-center">
                <span>{course.curriculum.length} sections • {course.totalLectures} lectures • {course.duration} total length</span>
                <span className="text-blue-600 font-bold cursor-pointer hover:text-blue-800">Expand all sections</span>
              </div>

              <div className="border border-gray-200 rounded-sm">
                <Accordion type="single" collapsible className="w-full bg-white">
                  {course.curriculum.map((module, moduleIndex) => (
                    <AccordionItem key={module.id} value={module.id} className="border-b last:border-0 border-gray-200">
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 bg-gray-50/50 data-[state=open]:bg-white transition-all text-left">
                        <div className="flex items-center justify-between w-full mr-4">
                          <span className="font-bold text-gray-800 md:text-lg">
                            {module.title}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500 font-normal">
                            {module.lessons.length} lectures • 45min
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-2">
                        <div className="space-y-3 pt-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between text-sm group cursor-pointer"
                            >
                              <div className="flex items-center gap-3 text-gray-700">
                                {lesson.isPreview ? (
                                  <PlayCircle className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Play className="h-4 w-4 text-gray-400" />
                                )}
                                <span className={`group-hover:underline ${lesson.isPreview ? 'text-blue-600 font-medium' : ''}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                {lesson.isPreview && (
                                  <span className="text-blue-600 font-medium hidden sm:inline">Preview</span>
                                )}
                                <span className="text-gray-500">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>


            {/* Instructor */}
            <div id="instructor">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600 font-medium">{course.instructorTitle}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mt-3">
                    {course.instructorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-8 space-y-4">
              {/* Visual Trick: The sidebar image actually overlaps the header in standard Udemy. 
                    We'll simulate it by having it stick here, and maybe give it negative margin top if we want that exact overlap look.
                    For now, let's keep it clean sticky. */}

              <div className="bg-white shadow-xl border border-gray-200 overflow-hidden relative" style={{ marginTop: "-200px" }}> {/* Negative margin to pull it up into header */}
                <div className="aspect-video relative group cursor-pointer border-b border-gray-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-black fill-black ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-lg drop-shadow-md">
                    Preview this course
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-end gap-3">
                    <div className="text-4xl font-bold text-gray-900">${course.price}</div>
                    <div className="text-gray-500 line-through text-lg mb-1">${(course.price * 1.5).toFixed(0)}</div>
                    <div className="text-gray-500 text-lg mb-1">33% off</div>
                  </div>


                  <div className="space-y-3">
                    <Button
                      onClick={handleEnrollment}
                      className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-none md:rounded-sm transition-all"
                    >
                      {enrolled ? "Go to Course" : "Enroll Now"}
                    </Button>

                  </div>

                  <div className="text-center text-xs text-gray-500">
                    Have doubts? <span className="underline cursor-pointer hover:text-gray-700">Talk to Our Team</span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="font-bold text-gray-900">This course includes:</p>
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-4 w-4" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.totalLectures} articles</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-4 w-4" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA (Only visible on small screens) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div>
            <div className="font-bold text-xl text-gray-900">${course.price}</div>
            <div className="text-xs text-gray-500 line-through">${(course.price * 1.5).toFixed(0)}</div>
          </div>
          <Button
            onClick={handleEnrollment}
            className="bg-blue-600 text-white font-bold h-12 px-8"
          >
            {enrolled ? "Go to Course" : "Enroll Now"}
          </Button>
        </div>

      </div>
    </div>
  );
}