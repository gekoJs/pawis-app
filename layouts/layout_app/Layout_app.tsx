import { Footer } from "@/components";
export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      {children}
      <Footer />
    </body>
  );
}
