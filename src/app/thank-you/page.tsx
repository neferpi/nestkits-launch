import type { Metadata } from "next";
import { ThankYouContent } from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank you",
  description: "You're in — thanks for signing up or purchasing.",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
