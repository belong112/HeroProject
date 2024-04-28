"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const heroList = [1, 2, 3, 4];
  const buttons = heroList.map((id) => (
    <button onClick={() => router.push(`/heros/${id}`)} key={id}>
      轉至 {id} 英雄的頁面
    </button>
  ));

  return (
    <div>
      <h1>THis is hero page</h1>
      <div>{buttons}</div>
    </div>
  );
}
