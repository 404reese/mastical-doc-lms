"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Course, CourseLevel, CourseCategory, CourseLanguage, levels, categories, languages } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: Omit<Course, 'id'>) => void;
}

export default function AddCourseModal({ isOpen, onClose, onAdd }: AddCourseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    instructor: "",
    instructorTitle: "",
    instructorBio: "",
    instructorImage: "",
    price: 0,
    duration: "",
    level: "" as CourseLevel | "",
    category: "" as CourseCategory | "",
    language: "" as CourseLanguage | "",
    rating: 4.5,
    studentsEnrolled: 0,
    image: "",
    features: [""],
    introVideo: "",
    curriculum: [{
      id: "module-1",
      title: "",
      lessons: [{
        id: "lesson-1-1",
        title: "",
        duration: "",
        isPreview: false
      }]
    }],
    tags: [""],
    totalLectures: 1,
    certificateAvailable: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.language) newErrors.language = "Language is required";
    if (!formData.introVideo.trim()) newErrors.introVideo = "Video link is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const courseData = {
      ...formData,
      fullDescription: formData.fullDescription || formData.description + " This course provides comprehensive training with hands-on experience.",
      instructorBio: formData.instructorBio || `${formData.instructor} is an experienced medical professional with extensive expertise in ${formData.category.toLowerCase()}.`,
      instructorImage: formData.instructorImage || "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
      image: formData.image || "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: formData.features.filter(f => f.trim() !== ""),
      tags: formData.tags.filter(t => t.trim() !== ""),
      level: formData.level as CourseLevel,
      category: formData.category as CourseCategory,
      language: formData.language as CourseLanguage,
    };

    onAdd(courseData);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      instructor: "",
      instructorTitle: "",
      instructorBio: "",
      instructorImage: "",
      price: 0,
      duration: "",
      level: "" as CourseLevel | "",
      category: "" as CourseCategory | "",
      language: "" as CourseLanguage | "",
      rating: 4.5,
      studentsEnrolled: 0,
      image: "",
      features: [""],
      introVideo: "",
      curriculum: [{
        id: "module-1",
        title: "",
        lessons: [{
          id: "lesson-1-1",
          title: "",
          duration: "",
          isPreview: false
        }]
      }],
      tags: [""],
      totalLectures: 1,
      certificateAvailable: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-2xl font-bold">Add New Course</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 weeks"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className={errors.duration ? "border-red-500" : ""}
                  />
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label htmlFor="introVideo">Video Link *</Label>
                <Input
                  id="introVideo"
                  placeholder="https://www.youtube.com/embed/..."
                  value={formData.introVideo}
                  onChange={(e) => handleInputChange("introVideo", e.target.value)}
                  className={errors.introVideo ? "border-red-500" : ""}
                />
                {errors.introVideo && <p className="text-red-500 text-sm mt-1">{errors.introVideo}</p>}
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger className={errors.level ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className={errors.language ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
                </div>
              </div>

              {/* Instructor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instructor">Instructor Name *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange("instructor", e.target.value)}
                    className={errors.instructor ? "border-red-500" : ""}
                  />
                  {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
                </div>

                <div>
                  <Label htmlFor="instructorTitle">Instructor Title</Label>
                  <Input
                    id="instructorTitle"
                    placeholder="e.g., Chief Surgeon"
                    value={formData.instructorTitle}
                    onChange={(e) => handleInputChange("instructorTitle", e.target.value)}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <Label htmlFor="totalLectures">Total Lectures</Label>
                  <Input
                    id="totalLectures"
                    type="number"
                    min="1"
                    value={formData.totalLectures}
                    onChange={(e) => handleInputChange("totalLectures", parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <Label>Course Features</Label>
                <div className="space-y-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter a course feature"
                      />
                      {formData.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Course Tags</Label>
                <div className="space-y-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        placeholder="Enter a tag"
                      />
                      {formData.tags.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTag(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Course
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}