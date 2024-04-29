"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/heros");
  });

  return (
    <main>
      <div>
        <h1>將自動跳轉至英雄頁面</h1>
      </div>
    </main>
  );
}
