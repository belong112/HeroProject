"use client";
import { useRouter } from "next/navigation";

export default function HeroDetail({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div>
      <h1>THis is No.{params.id} hero detail page</h1>
      <button onClick={() => router.push("/heros")}>Return</button>
    </div>
  );
}
