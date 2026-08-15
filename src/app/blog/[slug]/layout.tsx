import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  // We use the live Render URL so the server can always find it
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://capacity-0l1r.onrender.com';
  
  try {
    const res = await fetch(`${apiUrl}/api/posts/slug/${slug}`);
    const data = await res.json();

    if (data.success && data.data) {
      const post = data.data;
      
      // Clean up the content to make a nice short description
      const shortDescription = post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";

      return {
        title: `${post.title} | Capacity Movement`,
        description: shortDescription,
        openGraph: {
          title: post.title,
          description: shortDescription,
          url: `https://capacitymovement.org/blog/${slug}`, // Update domain when live
          siteName: "Capacity Movement",
          images: [
            {
              url: post.featuredImage || "https://capacitymovement.org/images/logo.png",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          locale: "en_NG",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: shortDescription,
          images: [post.featuredImage || "https://capacitymovement.org/images/logo.png"],
        },
      };
    }
  } catch (err) {
    console.error("Error generating social metadata:", err);
  }

  // Fallback if the post isn't found
  return {
    title: "Official News | Capacity Movement",
  };
}

export default function SinglePostLayout({ children }: { children: React.ReactNode }) {
  // This just wraps around your existing page.tsx without changing it
  return <>{children}</>;
}