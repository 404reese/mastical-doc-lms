import { notFound } from "next/navigation";
import { coursesData } from "@/lib/courses-data";
import LearningInterface from "@/components/LearningInterface";

// Generate static params for all course IDs
export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

interface LearnPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { id } = await params;
  const course = coursesData.find(c => c.id === id);

  if (!course) {
    notFound();
  }

  return <LearningInterface course={course} />;
}