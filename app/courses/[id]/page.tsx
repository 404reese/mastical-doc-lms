import { notFound } from "next/navigation";
import { coursesData } from "@/lib/courses-data";
import CourseDetailClient from "@/components/CourseDetailClient";

// Generate static params for all course IDs
export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  console.log("Looking for course id:", id);
  const course = coursesData.find(c => c.id === id);
  console.log("Found course:", course ? course.title : "Not Found");

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}