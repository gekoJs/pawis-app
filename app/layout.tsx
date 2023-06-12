"use client"
import MainLayout from "./MainLayout";
export const metadata = {
  title: "Pawis",
  description: "Pawis, a place to find your best friend",
  keywords: ["dogs", "breeds", "friend", "soy henry", "pi-dogs", "PI-DOGS"],
  icons: "/assets/icons/paw.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
