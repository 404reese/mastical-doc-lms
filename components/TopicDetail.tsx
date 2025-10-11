"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, MessageSquare, UserCircle, Send } from "lucide-react";
import Link from "next/link";

const topicData = {
  "general-discussion": {
    title: "General Discussion",
    description: "A place for general chat about medical topics, news, and trends.",
    threads: [
      {
        id: 1,
        author: "Dr. Emily Carter",
        avatar: "/avatars/dr-carter.png",
        time: "2 hours ago",
        content: "Has anyone seen the latest research on GLP-1 agonists for weight management? The results from the SELECT trial are quite impressive. It seems like we're on the cusp of a major shift in how we manage obesity and cardiovascular risk.",
        likes: 15,
        replies: 4,
      },
      {
        id: 2,
        author: "Dr. Ben Adams",
        avatar: "/avatars/dr-adams.png",
        time: "1 hour ago",
        content: "I agree, Emily. The cardiovascular benefits are particularly noteworthy. I'm curious to see how this will be integrated into primary care guidelines. The cost and availability are still significant barriers for many of my patients.",
        likes: 8,
        replies: 1,
      },
      {
        id: 3,
        author: "Dr. Sofia Reyes",
        avatar: "/avatars/dr-reyes.png",
        time: "45 minutes ago",
        content: "On a different note, what are your thoughts on the increasing use of AI in diagnostic imaging? We've started using a new algorithm for mammogram analysis, and it's been surprisingly accurate in detecting early-stage malignancies.",
        likes: 22,
        replies: 6,
      },
    ],
  },
  // Add other topics data here if needed
};

export default function TopicDetail({ topicId }: { topicId: string }) {
  const topic = topicData[topicId as keyof typeof topicData] || topicData["general-discussion"];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/forum" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
            <ArrowLeft className="h-5 w-5" />
            Back to All Topics
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">{topic.title}</h1>
          <p className="text-lg text-gray-600 mb-12">{topic.description}</p>
        </motion.div>

        <div className="space-y-8">
          {topic.threads.map((thread, index) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <UserCircle className="h-10 w-10 text-gray-400" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-800">{thread.author}</p>
                    <p className="text-sm text-gray-500">{thread.time}</p>
                  </div>
                  <p className="text-gray-700 mt-2">{thread.content}</p>
                  <div className="flex items-center gap-6 mt-4 text-gray-600">
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <ThumbsUp className="h-5 w-5" /> {thread.likes}
                    </button>
                    <Link href={`/forum/${topicId}/${thread.id}`}>
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <MessageSquare className="h-5 w-5" /> {thread.replies} Replies
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4">Join the Conversation</h3>
          <div className="flex items-start gap-4">
            <UserCircle className="h-10 w-10 text-gray-400" />
            <div className="flex-grow">
              <textarea
                placeholder="Write your reply..."
                className="w-full p-3 rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows={4}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold">
                  <Send className="h-5 w-5" />
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
