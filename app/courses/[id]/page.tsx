
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
  params: {
    id: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = coursesData.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}