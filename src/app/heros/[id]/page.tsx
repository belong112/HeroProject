"use client";
import { useEffect, useState } from "react";
import { getHeroProfile } from "@/utils/request";
import { useHeroListsStore } from "@/store";

import styled from "styled-components";
import HeroList from "@/components/HeroList";
import HeroProfile from "@/components/HeroProfile";
import Skeleton from "@mui/material/Skeleton";

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
  const [isLoad, setIsLoad] = useState(false);
  const [statData, setStatData] = useState({ str: 0, int: 0, agi: 0, luk: 0 });
  const { heroLists } = useHeroListsStore();

  useEffect(() => {
    const fetchData = async () => {
      const heroProfile = await getHeroProfile(params.id);
      setStatData(heroProfile);
      setIsLoad(true);
    };

    fetchData();
  }, [params.id]);

  return (
    <PageContainer>
      <StyledTitle>You Chose No.{params.id}</StyledTitle>
      <HeroList heroData={heroLists} />
      {isLoad ? (
        <HeroProfile statData={statData} />
      ) : (
        <Skeleton variant="rounded" width={1000} height={300} />
      )}
    </PageContainer>
  );
}
