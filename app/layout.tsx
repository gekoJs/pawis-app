"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Layout_app } from "@/components";

// export const metadata = {
//   title: "Pawis",
//   description: "Pawis app, aplace to find your future partner",
//   keywords: ["dogs", "pi", "soy henry", "PI-DOGS", "pi-dogs"],
//   icons: "/assets/icons/pawis_logo.svg",
// };

export default function RootLayout({
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
