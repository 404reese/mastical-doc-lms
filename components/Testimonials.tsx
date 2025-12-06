"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    location: "Mumbai, India",
    rating: 5,
    text: "The cardiology courses here transformed my practice. The case studies were incredibly practical and helped me implement new techniques immediately.",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dr. James Martinez",
    specialty: "Emergency Medicine",
    location: "Miami, USA",
    rating: 5,
    text: "Flexible learning that fits my hectic schedule. The CME credits are a huge bonus, and the instructors are world-class professionals.",
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dr. Sarah Al-Hassan",
    specialty: "Pediatrician",
    location: "Dubai, UAE",
    rating: 5,
    text: "Outstanding quality and depth of content. The pediatric courses covered everything from basics to advanced subspecialties. Highly recommend!",
    image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurosurgeon",
    location: "Singapore",
    rating: 5,
    text: "The 3D visualizations and surgical technique videos are exceptional. This platform has become an essential part of my continuing education.",
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dr. Elena Rodriguez",
    specialty: "Radiologist",
    location: "Madrid, Spain",
    rating: 5,
    text: "Courses available in Spanish made learning so much easier. The diagnostic imaging modules are comprehensive and up-to-date with latest protocols.",
    image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Dr. Raj Patel",
    specialty: "General Surgeon",
    location: "London, UK",
    rating: 5,
    text: "The surgical courses offer incredible insights from leading surgeons. The peer community and discussion forums add tremendous value.",
    image: "https://images.pexels.com/photos/5452203/pexels-photo-5452203.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/20 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Trusted by Medical Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of doctors worldwide who are advancing their careers
            and improving patient outcomes with our courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Quote className="h-8 w-8 text-blue-200 mb-4" />

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.specialty}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
