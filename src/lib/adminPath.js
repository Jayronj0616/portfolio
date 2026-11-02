// Where the admin dashboard is reachable from the outside. The files stay in
// src/app/admin/, but next.config.mjs rewrites /<ADMIN_BASE> onto them and
// src/proxy.js 404s the real /admin. Every link and redirect into the
// dashboard goes through adminPath() so none of them leaks the real folder
// name. revalidatePath() is the exception: it takes the internal route, so it
// keeps "/admin/...".
//
// NEXT_PUBLIC_ so the client sidebar sees it too; it is inlined at build time,
// so changing it needs a redeploy. Unset means plain /admin, which keeps local
// dev and previews working with no setup.
export const ADMIN_SLUG = process.env.NEXT_PUBLIC_ADMIN_PATH || "admin";

export const ADMIN_BASE = `/${ADMIN_SLUG}`;

export function adminPath(sub = "") {
  return `${ADMIN_BASE}${sub}`;
}
