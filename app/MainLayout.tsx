"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout_app from "@/layouts/layout_app/Layout_app";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
          <Layout_app>{children}</Layout_app>
      </Provider>
    </html>
  );
}
