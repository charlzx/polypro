"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthRedirect() {
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

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthRedirect />
    </Suspense>
  );
}
