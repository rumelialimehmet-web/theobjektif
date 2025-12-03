import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header component buraya gelecek */}
      <main className="flex-1">{children}</main>
      {/* Footer component buraya gelecek */}
    </div>
  );
}
