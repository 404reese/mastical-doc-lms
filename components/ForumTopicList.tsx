"use client";

import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

const topics = [
  {
    id: "general-discussion",
    title: "General Discussion",
    description: "A place for general chat about medical topics, news, and trends.",
    icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
    posts: 128,
    members: 4500,
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Share and discuss interesting or challenging clinical cases.",
    icon: <BookOpen className="h-8 w-8 text-teal-600" />,
    posts: 74,
    members: 2100,
  },
  {
    id: "career-advice",
    title: "Career Advice",
    description: "Guidance on career paths, specialties, and professional development.",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    posts: 92,
    members: 3200,
  },
  {
    id: "research-and-innovations",
    title: "Research & Innovations",
    description: "Discuss the latest medical research, clinical trials, and innovations.",
    icon: <Users className="h-8 w-8 text-red-600" />,
    posts: 56,
    members: 1800,
  },
];

export default function ForumTopicList() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Discussion Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive into a topic or start a new conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => (
            <Link href={`/forum/${topic.id}`} key={topic.id}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer flex items-start gap-6"
              >
                <div className="flex-shrink-0">{topic.icon}</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>{topic.posts} Posts</span>
                    <span>{topic.members.toLocaleString()} Members</span>
                  </div>
                </div>
                <div className="flex-shrink-0 self-center">
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
