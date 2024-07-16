"use client";

import { Button, Link } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-2xl font-bold font-sans">Something went wrong! 😉</h2>
      <Button
        radius="sm"
        showAnchorIcon
        as={Link}
        href="/"
        color="default"
        className="my-6"
      >
        Back Home
      </Button>
    </div>
  );
}
