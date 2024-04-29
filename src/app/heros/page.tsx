"use client";
import { useEffect, useState } from "react";
import { getHeroListsInfo } from "@/utils/request";

import styled from "styled-components";
import HeroList from "@/components/HeroList";

const PageContainer = styled.div`
  margin: 30px 50px;
`;

const StyledTitle = styled.h1`
  font-size: 32px;
  color: #ff5809;
`;

interface Hero {
  id: string;
  name: string;
  image: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      setHeroData(originalData);
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <StyledTitle>Choose Your Hero !</StyledTitle>
      <HeroList heroData={heroData} />
    </PageContainer>
  );
}
