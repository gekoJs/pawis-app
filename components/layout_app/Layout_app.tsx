"use client"
import { useSelector } from "react-redux";
import { StateRedux } from "@/utils/types/types";
export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useSelector(
    (state: StateRedux) => state.display.display_loader
  );

  return (
    <body style={{ overflow: isLoading ? "hidden" : undefined }}>
      {children}
    </body>
  );
}
