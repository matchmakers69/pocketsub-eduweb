export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside>Side nav</aside>
      <main>{children}</main>
    </>
  );
}
