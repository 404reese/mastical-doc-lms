"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Accredited Instructors",
    description: "Learn from board-certified specialists and leading medical experts with decades of clinical experience.",
  },
  {
    icon: Users,
    title: "Trusted by Doctors",
    description: "Join 50,000+ medical professionals worldwide who advance their careers with our platform.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access courses anywhere, anytime. Study from home, clinic, or on-the-go with our mobile-friendly platform.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Self-paced courses that fit your schedule. Learn during your downtime without disrupting patient care.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-20 bg-gradient-to-t from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Why Trust Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering the highest quality medical education
            that empowers doctors to excel in their practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl h-full">
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
