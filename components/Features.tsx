"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, CircleCheck as CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "Engage with multimedia content, 3D medical visualizations, and interactive case simulations.",
  },
  {
    icon: FileText,
    title: "Real Case Studies",
    description: "Apply knowledge to real-world clinical scenarios and learn from actual patient cases.",
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Assessments",
    description: "Test your knowledge with quizzes, practical exams, and peer-reviewed assignments.",
  },
  {
    icon: Award,
    title: "Accredited Certificates",
    description: "Earn CME credits and recognized certificates to advance your professional credentials.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-teal-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Features of Our Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive learning experiences designed to enhance your medical
            expertise and clinical decision-making.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-teal-400 transition-all hover:shadow-xl h-full flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-teal-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
