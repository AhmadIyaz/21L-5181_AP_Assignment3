import { useRouter } from "next/router";
import Link from "next/link";

const helpContent = {
  "": "Welcome to the Help Center!",
  faqs: "Here are some frequently asked questions.",
  contact: "You can contact us at support@moviehouse.com.",
  privacy: "We value your privacy. Here's our privacy policy.",
};

export default function HelpPage() {
  const router = useRouter();

  if (!router.isReady) return <p>Loading...</p>;

  const { slug = [] } = router.query;
  const key = slug.length > 0 ? slug[0] : "";
  const content = helpContent[key] || "Section not found.";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Help Center</h1>

      <nav style={{ marginBottom: "1rem" }}>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li><Link href="/help">Home</Link></li>
          <li><Link href="/help/faqs">FAQs</Link></li>
          <li><Link href="/help/contact">Contact</Link></li>
          <li><Link href="/help/privacy">Privacy Policy</Link></li>
        </ul>
      </nav>

      <p>{content}</p>
    </div>
  );
}
