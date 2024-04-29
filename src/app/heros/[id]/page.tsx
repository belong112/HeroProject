"use client";
import { useEffect, useState } from "react";
import { getHeroListsInfo, getHeroProfile } from "@/utils/request";

import styled from "styled-components";
import HeroList from "@/components/HeroList";
import HeroProfile from "@/components/HeroProfile";

const PageContainer = styled.div`
  margin: 30px 50px;
`;

const StyledTitle = styled.h1`
  font-size: 32px;
  color: #ff5809;
`;

export default function HeroDetail({ params }: { params: { id: string } }) {
  const [heroData, setHeroData] = useState([]);
  const [statData, setStatData] = useState({ str: 0, int: 0, agi: 0, luk: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      setHeroData(originalData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const heroProfile = await getHeroProfile(params.id);
      setStatData(heroProfile);
    };

    fetchData();
  }, [params.id]);

  return (
    <PageContainer>
      <StyledTitle>You Chose No.{params.id}</StyledTitle>
      <HeroList heroData={heroData} />
      <HeroProfile statData={statData} />
    </PageContainer>
  );
}
