"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-[120px] md:text-[160px] font-bold leading-none bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-title md:text-display font-semibold">Page not found</h2>
          <p className="text-base text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <House className="mr-2 h-5 w-5" weight="bold" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/markets">
              Browse Markets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
