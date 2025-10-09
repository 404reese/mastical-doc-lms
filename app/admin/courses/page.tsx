"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, Search } from "lucide-react";
import { coursesData, Course, CourseLevel, CourseCategory, CourseLanguage } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AddCourseModal from "@/components/admin/AddCourseModal";
import EditCourseModal from "@/components/admin/EditCourseModal";
import Link from "next/link";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    const course: Course = {
      ...newCourse,
      id: (courses.length + 1).toString(),
    };
    setCourses([...courses, course]);
    setIsAddModalOpen(false);
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-700 border-green-300",
    Intermediate: "bg-blue-100 text-blue-700 border-blue-300", 
    Advanced: "bg-purple-100 text-purple-700 border-purple-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Course Management</h1>
              <p className="text-slate-600">Manage your medical education courses</p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Course
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses by title, instructor, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Badge className="h-6 w-6 text-green-600 bg-transparent border-0 p-0">B</Badge>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Beginner</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courses.filter(c => c.level === 'Beginner').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Badge className="h-6 w-6 text-yellow-600 bg-transparent border-0 p-0">I</Badge>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Intermediate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courses.filter(c => c.level === 'Intermediate').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Badge className="h-6 w-6 text-purple-600 bg-transparent border-0 p-0">A</Badge>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Advanced</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courses.filter(c => c.level === 'Advanced').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Courses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${levelColors[course.level]}`}>
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{course.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">${course.price}</p>
                        <p className="text-sm text-gray-600">{course.studentsEnrolled} students</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCourse(course)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No courses found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modals */}
        <AddCourseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCourse}
        />

        {editingCourse && (
          <EditCourseModal
            course={editingCourse}
            isOpen={true}
            onClose={() => setEditingCourse(null)}
            onSave={handleEditCourse}
          />
        )}
      </div>
    </div>
  );
}