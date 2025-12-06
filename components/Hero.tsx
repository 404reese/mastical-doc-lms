"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-blue-100">
      {/* Smooth fade overlay at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)",
          backdropFilter: "blur(8px)"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">Learn. Heal. Lead.</h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Advance your medical expertise with world-class courses designed for doctors,
              by doctors. Learn at your pace, earn certifications, and transform patient care.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Explore Courses
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl border-2 border-blue-600"
              >
                <Play className="h-5 w-5" />
                Watch Demo
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Expert Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-gray-600 text-sm">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
                <div className="text-gray-600 text-sm">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Outer Blue Circle */}
              <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20"></div>

              {/* Inner Blue Circle */}
              <div className="absolute inset-12 rounded-full bg-blue-500 opacity-30"></div>
            </div>

            {/* Person Image Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[300px] h-[400px] lg:w-[350px] lg:h-[450px] relative">
                <Image
                  src="/hero.jpg"
                  alt="Medical Professional"
                  fill
                  className="object-cover object-top rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Rating Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-8 right-4 lg:right-12 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg z-20"
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                <div className="text-left">
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-xs">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Online Members Badge - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-12 right-4 lg:right-8 bg-white px-6 py-4 rounded-2xl shadow-xl z-20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">50k+</div>
                <div className="text-sm text-gray-600 mb-3">Online Members</div>
                <div className="flex -space-x-2 justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white overflow-hidden">
                    <Image
                      src="https://i.pravatar.cc/150?img=1"
                      alt="Member"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white overflow-hidden">
                    <Image
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Member"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white overflow-hidden">
                    <Image
                      src="https://i.pravatar.cc/150?img=3"
                      alt="Member"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white overflow-hidden">
                    <Image
                      src="https://i.pravatar.cc/150?img=4"
                      alt="Member"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}