import { NextResponse } from "next/server";

// When the dashboard lives at a private path (NEXT_PUBLIC_ADMIN_PATH), the
// real /admin must look like any other path that does not exist. Rewrites run
// after this, so the private path never reaches this function's matcher.
// The matcher has to be a constant, so the "is a private path set" check is
// done inside.
export function proxy(request) {
  const slug = process.env.NEXT_PUBLIC_ADMIN_PATH;
  if (!slug || slug === "admin") return NextResponse.next();

  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
