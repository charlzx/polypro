"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicHeader } from "@/components/PublicHeader";
import { Warning, ArrowCounterClockwise, House } from "@phosphor-icons/react";
import { useState } from "react";

export default function MarketsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    console.error("Markets error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader onMobileNavOpen={() => setMobileNavOpen(true)} />
      <main className="pt-20 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Warning className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Markets Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-small text-muted-foreground">
              We couldn&apos;t load the markets. This might be a temporary connectivity issue.
            </p>
            {error.digest && (
              <p className="text-caption text-muted-foreground font-mono bg-muted p-2 rounded">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex gap-2">
              <Button onClick={reset} className="flex-1">
                <ArrowCounterClockwise className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                <House className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
