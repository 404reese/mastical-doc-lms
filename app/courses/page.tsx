"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import {
  coursesData,
  levels,
  categories,
  languages,
  CourseLevel,
  CourseCategory,
  CourseLanguage,
} from "@/lib/courses-data";
import Footer from "@/components/Footer";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "All">("All");
  const [selectedLanguage, setSelectedLanguage] = useState<CourseLanguage | "All">("All");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesLanguage = selectedLanguage === "All" || course.language === selectedLanguage;

      return matchesSearch && matchesLevel && matchesCategory && matchesLanguage;
    });
  }, [searchQuery, selectedLevel, selectedCategory, selectedLanguage]);

  const clearFilters = () => {
    setSelectedLevel("All");
    setSelectedCategory("All");
    setSelectedLanguage("All");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedLevel !== "All" || selectedCategory !== "All" || selectedLanguage !== "All" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-teal-50/20 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 text-center">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Browse through our comprehensive catalog of medical courses designed by experts for medical professionals.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-teal-400 focus:outline-none transition-colors text-lg shadow-sm"
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-100 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">
                  Choose Level:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLevel("All")}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                      selectedLevel === "All"
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Levels
                  </button>
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                        selectedLevel === level
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">
                  Choose Category:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                      selectedCategory === "All"
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">
                  Choose Language:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLanguage("All")}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                      selectedLanguage === "All"
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Languages
                  </button>
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                        selectedLanguage === language
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-center">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-bold text-sm shadow-md"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 bg-teal-50 rounded-lg px-6 py-4 border-2 border-teal-200">
            <p className="text-lg">
              <span className="font-bold text-teal-700 text-2xl">{filteredCourses.length}</span>
              <span className="text-gray-700 ml-2">courses found</span>
            </p>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Try adjusting your filters or search to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
