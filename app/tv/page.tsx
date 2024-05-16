'use client'
import dynamic from "next/dynamic";
import React from "react";

const ComponentC = dynamic(() => import('@/Components/sections/AllTvs'), { ssr: false })

export default function page() {
  return (
    <div>
     <ComponentC/>
    </div>
  );
}
