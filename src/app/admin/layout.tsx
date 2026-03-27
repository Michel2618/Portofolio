export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Overrides the root layout body padding and renders children directly
    // so the login page gets a full-screen canvas with no navbar/footer.
    <div style={{ padding: 0, margin: 0 }}>{children}</div>
  );
}
