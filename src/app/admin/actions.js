"use server";

import { adminPath } from "@/lib/adminPath";
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
  redirect(adminPath("/overview"));
}

export async function adminLogout() {
  await clearAdminSession();
  redirect(adminPath("/login"));
}
