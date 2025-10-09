"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  GraduationCap
} from "lucide-react";
import { Course } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const levelColors = {
    Beginner: "bg-green-100 text-green-700 border-green-300",
    Intermediate: "bg-blue-100 text-blue-700 border-blue-300",
    Advanced: "bg-purple-100 text-purple-700 border-purple-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-teal-50/20 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={`px-3 py-1 text-sm font-semibold border ${levelColors[course.level]}`}>
                  {course.level}
                </Badge>
                <Badge variant="outline" className="text-teal-700 border-teal-300">
                  {course.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-blue-600">{course.rating}</span>
                  <span className="text-gray-500 text-sm">({course.studentsEnrolled.toLocaleString()} students)</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-blue-900 mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Metadata */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-800">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Lectures</div>
                    <div className="font-semibold text-gray-800">{course.totalLectures}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Language</div>
                    <div className="font-semibold text-gray-800">{course.language}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Certificate</div>
                    <div className="font-semibold text-gray-800">
                      {course.certificateAvailable ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-gray-600">
                    #{tag.replace(/\s+/g, '')}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="border-2 border-gray-200 shadow-xl">
                <CardHeader className="pb-4">
                  {/* Intro Video */}
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative group cursor-pointer">
                    <iframe
                      src={course.introVideo}
                      title="Course Introduction"
                      className="w-full h-full"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      ${course.price}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">One-time payment • Lifetime access</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg mb-3">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Add to Wishlist
                  </Button>
                  
                  {/* What's Included */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">What's included:</h4>
                    <div className="space-y-2">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Course Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {course.fullDescription}
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Curriculum */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">Course Curriculum</CardTitle>
                  <p className="text-gray-600">
                    {course.totalLectures} lectures • {course.duration} total length
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {course.curriculum.map((module, moduleIndex) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                Module {moduleIndex + 1}: {module.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {module.lessons.length} lessons
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isPreview ? (
                                    <PlayCircle className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Play className="h-4 w-4 text-gray-400" />
                                  )}
                                  <div>
                                    <h4 className="font-medium text-gray-800">
                                      {lessonIndex + 1}. {lesson.title}
                                    </h4>
                                    {lesson.isPreview && (
                                      <Badge variant="outline" className="text-xs mt-1 text-blue-600 border-blue-300">
                                        Preview
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {lesson.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Info */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{course.instructor}</h3>
                      <p className="text-blue-600 text-sm font-medium mb-2">{course.instructorTitle}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{course.instructorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Course Stats */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Course Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students Enrolled</span>
                    <span className="font-semibold">{course.studentsEnrolled.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Skill Level</span>
                    <Badge className={`${levelColors[course.level]} font-semibold`}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-semibold text-sm">November 2024</span>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}