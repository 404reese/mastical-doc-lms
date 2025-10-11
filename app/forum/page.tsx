import ForumHero from "@/components/ForumHero";
import ForumTopicList from "@/components/ForumTopicList";
import Footer from "@/components/Footer";

export default function ForumPage() {
  return (
    <main className="min-h-screen">
      <ForumHero />
      <ForumTopicList />
      <Footer />
    </main>
  );
}
