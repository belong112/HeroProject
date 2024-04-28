"use client";
import { useState } from "react";

import HeroList from "@/components/HeroList";

export default function Hero() {
  const [selectedId, setSelectedId] = useState("");
  const heroData = [
    {
      id: "1",
      isSelect: selectedId === "1",
      name: "Daredevil",
      image:
        "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
    },
    {
      id: "2",
      isSelect: selectedId === "2",
      name: "Thor",
      image:
        "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg",
    },
    {
      id: "3",
      isSelect: selectedId === "3",
      name: "Iron Man",
      image:
        "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
    },
    {
      id: "4",
      isSelect: selectedId === "4",
      name: "Hulk",
      image:
        "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg",
    },
  ];
  return (
    <div>
      <h1>THis is hero page</h1>
      <HeroList heroData={heroData} setSelectedId={setSelectedId} />
    </div>
  );
}
