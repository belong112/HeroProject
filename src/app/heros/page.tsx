"use client";
import { useEffect } from "react";
import { getHeroListsInfo } from "@/utils/request";
import { useHeroListsStore } from "@/store";

import styled from "styled-components";
import HeroList from "@/components/HeroList";

const PageContainer = styled.div`
  margin: 30px 50px;
`;

const StyledTitle = styled.h1`
  font-size: 32px;
  color: #ff5809;
`;

export default function Hero() {
  const { heroLists, setHeroLists } = useHeroListsStore();

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      setHeroLists(originalData);
    };

    fetchData();
  });

  return (
    <PageContainer>
      <StyledTitle>Choose Your Hero !</StyledTitle>
      <HeroList heroData={heroLists} />
    </PageContainer>
  );
}
