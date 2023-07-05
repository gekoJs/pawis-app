"use client";
import { Footer, MessageModal } from "@/components";
import s from "./Layout_app.module.scss";
import { useSelector } from "react-redux";
import { type_redux } from "@/utils/types/types";
export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {
  const display_message = useSelector(
    (state: type_redux) => state.display.display_message
  );

  return (
    <body className={s.container}>
      {children}
      <MessageModal
        display={display_message}
        message={"You need to sign in to give a like"}
        type={"Warning"}
      />
      <Footer />
    </body>
  );
}
