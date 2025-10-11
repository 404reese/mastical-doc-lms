import DiscussionDetail from "@/components/DiscussionDetail";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  // In a real app, you would fetch this data from a database or API
  const topicsWithDiscussions = [
    {
      id: 'general-discussion',
      discussions: ['1', '2', '3']
    },
    // Add other topics and their discussions here if they exist
    // { id: 'case-studies', discussions: ['4', '5'] }
  ];

  return topicsWithDiscussions.flatMap(topic =>
    topic.discussions.map(discussionId => ({
      id: topic.id,
      discussionId: discussionId,
    }))
  );
}

export default function DiscussionPage({ params }: { params: { id: string, discussionId: string } }) {
  return (
    <main className="min-h-screen">
      <DiscussionDetail topicId={params.id} discussionId={params.discussionId} />
      <Footer />
    </main>
  );
}
