import { Footer } from "@/components";
import s from "./Layout_app.module.scss"
export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={s.container}>
      {children}
      <Footer />
    </body>
  );
}
