"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout_app from "@/layouts/layout_app/Layout_app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout_app>{children}</Layout_app>
        </Provider>
      </QueryClientProvider>
    </html>
  );
}
