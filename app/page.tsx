import { default as Landing_layout } from "@/layouts/landing/Landing";
import { Footer } from "../components/index";
export const metadata = {
  title: "Pawis",
  description: "This is the description of my page.",
  keywords: ["keyword1", "keyword2", "keyword3"],
  icons: "/assets/icons/pawis_logo.svg",
};

export default function Page() {
  return (
    <>
      <Landing_layout />
      <Footer />
    </>
  );
}
