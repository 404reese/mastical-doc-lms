"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

type FilterType = "level" | "category" | "language";

const filterData = {
  level: [
    { id: "beginner", name: "Beginner", count: 120 },
    { id: "intermediate", name: "Intermediate", count: 180 },
    { id: "advanced", name: "Advanced", count: 200 },
  ],
  category: [
    { id: "surgery", name: "Surgery", count: 85 },
    { id: "pediatrics", name: "Pediatrics", count: 92 },
    { id: "cardiology", name: "Cardiology", count: 78 },
    { id: "neurology", name: "Neurology", count: 65 },
    { id: "radiology", name: "Radiology", count: 54 },
    { id: "emergency", name: "Emergency Medicine", count: 70 },
  ],
  language: [
    { id: "english", name: "English", count: 450 },
    { id: "spanish", name: "Spanish", count: 180 },
    { id: "hindi", name: "Hindi", count: 120 },
    { id: "french", name: "French", count: 95 },
    { id: "german", name: "German", count: 88 },
    { id: "mandarin", name: "Mandarin", count: 67 },
  ],
};

const coursePlaceholders = [
  {
    title: "Advanced Cardiac Surgery Techniques",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    rating: 4.9,
    students: 1240,
  },
  {
    title: "Pediatric Emergency Care",
    instructor: "Dr. Michael Chen",
    duration: "8 weeks",
    rating: 4.8,
    students: 2150,
  },
  {
    title: "Diagnostic Radiology Fundamentals",
    instructor: "Dr. Emily Rodriguez",
    duration: "10 weeks",
    rating: 4.7,
    students: 980,
  },
  {
    title: "Neurosurgical Innovations",
    instructor: "Dr. James Williams",
    duration: "14 weeks",
    rating: 4.9,
    students: 756,
  },
];

export default function CourseFilters() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("level");
  const [selectedOption, setSelectedOption] = useState<string>("beginner");

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Explore Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect course tailored to your specialty, level, and language preference.
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveFilter("level")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFilter === "level"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Clock className="h-5 w-5" />
              By Level
            </button>
            <button
              onClick={() => setActiveFilter("category")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFilter === "category"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              By Category
            </button>
            <button
              onClick={() => setActiveFilter("language")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFilter === "language"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Globe className="h-5 w-5" />
              By Language
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filterData[activeFilter].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    selectedOption === option.id
                      ? "bg-blue-50 text-blue-700 border-2 border-blue-400"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {option.name} <span className="text-sm opacity-75">({option.count})</span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coursePlaceholders.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400')] bg-cover bg-center opacity-70"></div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                  ⭐ {course.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            href={`/courses?${activeFilter}=${selectedOption}`}
            className="group inline-flex items-center justify-center gap-2 bg-transparent text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all font-semibold text-lg border-2 border-blue-600"
          >
            See All Courses
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
