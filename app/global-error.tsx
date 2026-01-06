"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Warning, ArrowCounterClockwise } from "@phosphor-icons/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <Warning className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-title font-bold">Application Error</h1>
              <p className="text-small text-muted-foreground">
                A critical error occurred. Please try refreshing the page.
              </p>
              {error.digest && (
                <p className="text-caption text-muted-foreground font-mono bg-muted p-2 rounded inline-block">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <div className="flex justify-center gap-2">
              <Button onClick={reset}>
                <ArrowCounterClockwise className="h-4 w-4 mr-2" />
                Try again
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Go home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
