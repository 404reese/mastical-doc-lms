import TopicDetail from "@/components/TopicDetail";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [
    { id: 'general-discussion' },
    { id: 'case-studies' },
    { id: 'career-advice' },
    { id: 'research-and-innovations' },
  ];
}

export default function TopicPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <TopicDetail topicId={params.id} />
      <Footer />
    </main>
  );
}
