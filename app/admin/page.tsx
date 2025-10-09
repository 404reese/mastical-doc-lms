"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Settings, BarChart3, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coursesData } from "@/lib/courses-data";
import Link from "next/link";

export default function AdminDashboard() {
  const totalCourses = coursesData.length;
  const totalStudents = coursesData.reduce((sum, course) => sum + course.studentsEnrolled, 0);
  const averageRating = coursesData.reduce((sum, course) => sum + course.rating, 0) / coursesData.length;
  const totalRevenue = coursesData.reduce((sum, course) => sum + (course.price * course.studentsEnrolled), 0);

  const quickStats = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: BarChart3,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: Settings,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      title: "Manage Courses",
      description: "Add, edit, and delete courses",
      href: "/admin/courses",
      icon: BookOpen,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "View Public Site",
      description: "See how your courses appear to students",
      href: "/courses",
      icon: Eye,
      color: "bg-teal-600 hover:bg-teal-700",
    },
  ];

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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Welcome to your medical education platform administration</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color} text-white`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Card key={action.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-slate-100">
                        <action.icon className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{action.title}</h3>
                        <p className="text-slate-600 text-sm">{action.description}</p>
                      </div>
                    </div>
                    <Link href={action.href}>
                      <Button className={`${action.color} text-white`}>
                        Go
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Courses</span>
                <Link href="/admin/courses">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursesData.slice(0, 5).map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${course.price}</p>
                      <p className="text-sm text-gray-600">{course.studentsEnrolled} students</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}