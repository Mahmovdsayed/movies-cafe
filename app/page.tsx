'use client'
import Image from "next/image";
import styles from "./page.module.css";
import HomeSection from "@/Components/sections/Home";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HomeSection />
      </main>
    </>
  );
}
