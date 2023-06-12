"use client";
export default function Layout_app({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <body>
      {children}
    </body>
  );
}
