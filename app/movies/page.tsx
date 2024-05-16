"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "@/Components/layout/LoadingScreen";

const ComponentC = dynamic(() => import("@/Components/sections/AllMovies"), {
  ssr: false,
});

export default function page() {
  return (
    <>
      <Suspense fallback={<LoadingScreen/>}>
        <ComponentC />
      </Suspense>
    </>
  );
}
