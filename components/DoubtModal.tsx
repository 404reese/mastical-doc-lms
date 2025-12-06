"use client";

import { useState } from "react";
import { X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoubtModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseName: string;
    lessonName?: string;
}

export default function DoubtModal({ isOpen, onClose, courseName, lessonName }: DoubtModalProps) {
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("general");
    const [question, setQuestion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset form
        setSubject("");
        setCategory("general");
        setQuestion("");
        setIsSubmitting(false);

        // Show success message (you can enhance this with a toast notification)
        alert("Your question has been submitted successfully! Our instructor will respond soon.");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Ask a Question</h2>
                            <p className="text-sm text-gray-600">Get help from your instructor</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Course Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Course:</div>
                        <div className="font-semibold text-gray-900">{courseName}</div>
                        {lessonName && (
                            <>
                                <div className="text-sm text-gray-600 mt-2">Current Lesson:</div>
                                <div className="font-medium text-gray-800">{lessonName}</div>
                            </>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900"
                            required
                        >
                            <option value="general">General Question</option>
                            <option value="technical">Technical Issue</option>
                            <option value="content">Course Content</option>
                            <option value="assignment">Assignment Related</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Subject */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Brief description of your question"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Question */}
                    <div>
                        <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Question
                        </label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Describe your question in detail..."
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Be as specific as possible to get a better answer
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Question"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
