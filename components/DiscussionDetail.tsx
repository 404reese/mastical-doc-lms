"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, UserCircle, Send, CornerDownRight } from "lucide-react";
import Link from "next/link";

const discussionData = {
  "general-discussion": {
    "1": {
      title: "Latest research on GLP-1 agonists for weight management",
      author: "Dr. Emily Carter",
      avatar: "/avatars/dr-carter.png",
      time: "2 hours ago",
      content: "Has anyone seen the latest research on GLP-1 agonists for weight management? The results from the SELECT trial are quite impressive. It seems like we're on the cusp of a major shift in how we manage obesity and cardiovascular risk.",
      likes: 15,
      replies: [
        {
          id: 101,
          author: "Dr. Ben Adams",
          avatar: "/avatars/dr-adams.png",
          time: "1 hour ago",
          content: "I've been following it closely. The 20% reduction in MACE is a game-changer. It solidifies the argument that these are not just 'vanity drugs'.",
          likes: 12,
        },
        {
          id: 102,
          author: "Dr. Priya Sharma",
          avatar: "/avatars/dr-sharma.png",
          time: "1 hour ago",
          content: "Absolutely. The implications for patients with established CVD are huge. I wonder how long it will take for guidelines to catch up.",
          likes: 9,
        },
        {
          id: 103,
          author: "Dr. Emily Carter",
          avatar: "/avatars/dr-carter.png",
          time: "30 minutes ago",
          content: "That's the key question. And also, patient access. The cost is still prohibitive for many without good insurance coverage.",
          likes: 11,
        },
        {
          id: 104,
          author: "Dr. Kenji Tanaka",
          avatar: "/avatars/dr-tanaka.png",
          time: "15 minutes ago",
          content: "There's also the supply chain issue. We're already seeing shortages with the current demand for diabetes and weight loss.",
          likes: 7,
        }
      ]
    },
  },
};

export default function DiscussionDetail({ topicId, discussionId }: { topicId: string, discussionId: string }) {
  const discussion = discussionData[topicId as keyof typeof discussionData]?.[discussionId as keyof typeof discussionData["general-discussion"]] || discussionData["general-discussion"]["1"];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/forum/${topicId}`} className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
            <ArrowLeft className="h-5 w-5" />
            Back to Topic
          </Link>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">{discussion.title}</h1>
            <div className="flex items-start gap-4">
              <UserCircle className="h-10 w-10 text-gray-400" />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-blue-800">{discussion.author}</p>
                  <p className="text-sm text-gray-500">{discussion.time}</p>
                </div>
                <p className="text-gray-700 mt-2">{discussion.content}</p>
                <div className="flex items-center gap-6 mt-4 text-gray-600">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <ThumbsUp className="h-5 w-5" /> {discussion.likes}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-blue-900">Replies ({discussion.replies.length})</h2>
          {discussion.replies.map((reply, index) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <CornerDownRight className="h-5 w-5 text-gray-400 mt-3 flex-shrink-0" />
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-grow">
                <div className="flex items-start gap-4">
                  <UserCircle className="h-8 w-8 text-gray-400" />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-blue-800">{reply.author}</p>
                      <p className="text-sm text-gray-500">{reply.time}</p>
                    </div>
                    <p className="text-gray-700 mt-2">{reply.content}</p>
                    <div className="flex items-center gap-6 mt-3 text-gray-600">
                      <button className="flex items-center gap-1 hover:text-blue-600 text-sm">
                        <ThumbsUp className="h-4 w-4" /> {reply.likes}
                      </button>
                    </div>
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
          className="mt-12"
        >
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
