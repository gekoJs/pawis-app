import { default as Landing_layout } from "@/layouts/landing/Landing";
import { Footer } from "../components/index";

export const metadata = {
  title: "Pawis",
  description: "Pawis landing page",
  keywords: ["dogs", "landing", "friend"],
  icons: "/assets/icons/paw.svg",
};

export default function Page() {
  return (
    <div>
      <Landing_layout />
      <Footer />
    </div>
  );
}
