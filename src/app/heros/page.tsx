"use client";
import { useEffect, useState } from "react";
import { useSelectStore } from "@/store";
import { getHeroListsInfo } from "@/utils/request";

import HeroList from "@/components/HeroList";

interface Hero {
  id: string;
  name: string;
  image: string;
}

export default function Hero() {
  const { selectedId } = useSelectStore();
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      setHeroData(
        originalData.map((item: Hero) => ({
          ...item,
          isSelected: item.id === selectedId,
        })),
      );
    };

    fetchData();
  }, [selectedId]);

  return (
    <div>
      <h1>THis is hero page</h1>
      <HeroList heroData={heroData} />
    </div>
  );
}
