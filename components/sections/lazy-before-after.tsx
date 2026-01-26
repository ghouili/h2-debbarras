"use client";

import dynamic from "next/dynamic";

const BeforeAfter = dynamic(
  () => import("@/components/sections/before-after").then((mod) => mod.BeforeAfter),
  {
    ssr: false,
    loading: () => (
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-8 w-2/3 rounded-full bg-muted animate-pulse" />
          <div className="mx-auto mt-3 h-4 w-1/2 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="h-64 sm:h-80 rounded-2xl bg-muted animate-pulse" />
        </div>
      </div>
    ),
  },
);

export function LazyBeforeAfter() {
  return <BeforeAfter />;
}
