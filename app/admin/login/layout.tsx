export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal layout for login page (no auth check, no sidebar)
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      {children}
    </div>
  );
}
