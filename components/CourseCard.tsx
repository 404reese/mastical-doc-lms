"use client";

import { Course } from "@/lib/courses-data";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const { t } = useLanguage();
  const levelColors = {
    Beginner: "bg-green-100 text-green-700 border-green-300",
    Intermediate: "bg-blue-100 text-blue-700 border-blue-300",
    Advanced: "bg-purple-100 text-purple-700 border-purple-300",
  };

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-white rounded-xl border-2 border-gray-100 hover:border-teal-300 hover:shadow-xl transition-all overflow-hidden group cursor-pointer h-full flex flex-col"
      >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600 flex items-center gap-1 shadow-lg">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          {course.rating}
        </div>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[course.level]}`}>
          {course.level}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium border border-teal-200">
            {course.category}
          </span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium border border-blue-200">
            {course.language}
          </span>
        </div>

        <h3 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {course.description}
        </p>

        <div className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">{course.instructor}</span>
          <br />
          <span className="text-xs">{course.instructorTitle}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.studentsEnrolled.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-2xl font-bold text-blue-900">
              ${course.price}
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {t.enrollNow}
          </button>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
