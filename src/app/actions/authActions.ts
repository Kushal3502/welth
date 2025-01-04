"use server";

import { signIn, signOut } from "@/auth";

export async function handleGoogleSignin() {
  await signIn("google", { redirectTo: "/" });
}

export async function handleSignOut() {
  await signOut();
}
