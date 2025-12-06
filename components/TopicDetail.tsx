"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  MessageSquare,
  Share2,
  Users,
  Plus,
  TrendingUp,
  Clock,
  X,
  ThumbsUp
} from "lucide-react";
import Link from "next/link";
import forumData from "@/data/forum.json";

type SortOption = "latest" | "mostLiked" | "trending";

interface Post {
  id: number;
  authorId: number;
  author: string;
  avatar: string;
  time: string;
  timestamp: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  shareCount: number;
  tags: string[];
}

interface Member {
  id: number;
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  members: Member[];
  posts: Post[];
}

export default function TopicDetail({ topicId }: { topicId: string }) {
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [votedPosts, setVotedPosts] = useState<{ [key: number]: "up" | null }>({});

  const topicsData = forumData.topics as { [key: string]: Topic };
  const topic = topicsData[topicId] || topicsData["general-discussion"];

  const handleVote = (postId: number) => {
    setVotedPosts(prev => ({
      ...prev,
      [postId]: prev[postId] === "up" ? null : "up"
    }));
  };

  const getVoteCount = (post: Post) => {
    const baseVotes = post.upvotes;
    const currentVote = votedPosts[post.id];
    if (currentVote === "up") return baseVotes + 1;
    return baseVotes;
  };

  const getSortedPosts = () => {
    const posts = [...topic.posts];
    switch (sortBy) {
      case "mostLiked":
        return posts.sort((a, b) => b.upvotes - a.upvotes);
      case "trending":
        return posts.sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount));
      case "latest":
      default:
        return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
  };

  const handleShare = (post: Post) => {
    const url = `${window.location.origin}/forum/${topicId}/${post.id}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/forum" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            Back to All Topics
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">{topic.title}</h1>
            <p className="text-lg text-slate-600">{topic.description}</p>
          </div>
        </motion.div>

        {/* Action Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-4 mb-4 border border-blue-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowMemberModal(true)}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
            >
              <Users className="h-5 w-5" />
              View Members ({topic.memberCount})
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
            >
              <Plus className="h-5 w-5" />
              Create Post
            </button>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-xl shadow-md p-4 mb-6 border border-blue-100"
        >
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSortBy("latest")}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${sortBy === "latest"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              <Clock className="h-4 w-4" />
              Latest
            </button>
            <button
              onClick={() => setSortBy("mostLiked")}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${sortBy === "mostLiked"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              <ArrowUp className="h-4 w-4" />
              Most Liked
            </button>
            <button
              onClick={() => setSortBy("trending")}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${sortBy === "trending"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </button>
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-4">
          {getSortedPosts().map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-blue-100 p-6"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="h-10 w-10 rounded-full border-2 border-blue-200"
                />
                <div>
                  <p className="font-bold text-blue-900">{post.author}</p>
                  <p className="text-sm text-slate-500">{post.time}</p>
                </div>
              </div>

              {/* Post Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                {post.title}
              </h3>

              {/* Post Content */}
              <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 text-slate-600">
                <button
                  onClick={() => handleVote(post.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{getVoteCount(post)}</span>
                </button>
                <Link href={`/forum/${topicId}/${post.id}`}>
                  <button className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium">
                    <MessageSquare className="h-5 w-5" />
                    <span>{post.commentCount}</span>
                    <span>Comments</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member List Modal */}
      <AnimatePresence>
        {showMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Forum Members</h2>
                  <p className="text-blue-100">{topic.memberCount} total members</p>
                </div>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-3">
                  {topic.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors border border-slate-200"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-12 w-12 rounded-full border-2 border-blue-200"
                      />
                      <div className="flex-grow">
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-600">
                          {member.role} • Joined {new Date(member.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${member.role === "Admin"
                          ? "bg-red-100 text-red-700"
                          : member.role === "Moderator"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Create New Post</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Post Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter an engaging title..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Content
                    </label>
                    <textarea
                      placeholder="Share your thoughts, questions, or insights..."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Add tags (comma separated)..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                      Publish Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
