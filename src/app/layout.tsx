export const metadata = {
  title: "Hero-Project",
  description: "Hero project for hahow interview",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f5f5f5" }}>{children}</body>
    </html>
  );
}
