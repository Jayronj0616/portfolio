import { adminPath } from "@/lib/adminPath";
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  redirect(adminPath("/overview"));
}
