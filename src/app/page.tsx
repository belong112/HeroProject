"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <div>
        <button onClick={() => router.push("/heros")}>
          點我跳轉至hero頁面
        </button>
      </div>
    </main>
  );
}
