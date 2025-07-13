'use client'
import { HeroSection } from "@/components/ui/hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {
  const {user} = useKindeBrowserClient()

  useEffect(() => {
    console.log(user)
  },[user])
  return (
    <HeroSection />
  );
}
