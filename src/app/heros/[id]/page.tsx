"use client";
import { useEffect, useState } from "react";
import { useSelectStore } from "@/store";
import { getHeroListsInfo, getHeroProfile } from "@/utils/request";

import HeroList from "@/components/HeroList";
import HeroProfile from "@/components/HeroProfile";

interface Hero {
  id: string;
  name: string;
  image: string;
}

export default function HeroDetail({ params }: { params: { id: string } }) {
  const { selectedId } = useSelectStore();
  const [heroData, setHeroData] = useState([]);
  const [statData, setStatData] = useState({ str: 0, int: 0, agi: 0, luk: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      const heroProfile = await getHeroProfile(params.id);
      console.log(heroProfile);
      setHeroData(
        originalData.map((item: Hero) => ({
          ...item,
          isSelect: item.id === selectedId,
        })),
      );
      setStatData(heroProfile);
    };

    fetchData();
  }, [params.id, selectedId]);

  return (
    <div>
      <h1>This is No.{params.id} hero detail page</h1>
      <HeroList heroData={heroData} />
      <HeroProfile statData={statData} />
    </div>
  );
}
