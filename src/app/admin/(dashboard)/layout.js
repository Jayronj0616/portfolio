import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSiteContent } from "@/lib/data";
import AdminSidebar from "./AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { about } = await getSiteContent();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="bg-mesh pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="bg-grid pointer-events-none fixed inset-0 -z-10" />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:gap-10 lg:py-16">
        <AdminSidebar name={about.name} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
