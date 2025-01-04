export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/:path*",
    "/dashboard/:path*",
    "/transaction/:path*",
  ],
};
