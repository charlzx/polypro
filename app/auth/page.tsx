"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode");

  useEffect(() => {
    if (mode === "signup") {
      router.replace("/signup");
    } else {
      router.replace("/login");
    }
  }, [mode, router]);

  return null;
}
