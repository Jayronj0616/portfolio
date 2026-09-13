"use server";

import { redirect } from "next/navigation";
import {
  verifyAdminPassword,
  createAdminSession,
  clearAdminSession,
} from "@/lib/adminAuth";

export async function adminLogin(_prevState, formData) {
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD) {
    return {
      status: "error",
      error: "Admin login isn't configured yet (missing ADMIN_PASSWORD).",
    };
  }

  if (!verifyAdminPassword(password)) {
    return { status: "error", error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin/messages");
}

export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin/login");
}
