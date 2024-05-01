"use client";
import { useEffect, useState } from "react";
import { getHeroProfile } from "@/utils/request";
import { useHeroListsStore } from "@/store";

import styled from "styled-components";
import HeroList from "@/components/HeroList";
import HeroProfile from "@/components/HeroProfile";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  font-size: 32px;
  color: #ff5809;
`;

export default function HeroDetail({ params }: { params: { id: string } }) {
  const [statData, setStatData] = useState({ str: 0, int: 0, agi: 0, luk: 0 }); // Hero的能力數值
  const { heroLists } = useHeroListsStore();
  const chosenHeroName = heroLists[parseInt(params.id) - 1]?.name || "???";

  useEffect(() => {
    const fetchData = async () => {
      const heroProfile = await getHeroProfile(params.id);
      setStatData(heroProfile);
    };

    fetchData();
  }, [params.id]);

  return (
    <PageContainer>
      <StyledTitle>You Chose {chosenHeroName}</StyledTitle>
      <HeroList heroData={heroLists} />
      <HeroProfile statData={statData} />
    </PageContainer>
  );
}
