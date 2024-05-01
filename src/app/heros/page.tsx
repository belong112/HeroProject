"use client";
import { useState, useEffect } from "react";
import { getHeroListsInfo } from "@/utils/request";
import { useHeroListsStore } from "@/store";

import styled from "styled-components";
import HeroList from "@/components/HeroList";
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

export default function Hero() {
  const { heroLists, setHeroLists } = useHeroListsStore();
  const [isLoad, setIsLoad] = useState(false); // 是否取得 hero lists

  useEffect(() => {
    const fetchData = async () => {
      const originalData = await getHeroListsInfo();
      setHeroLists(originalData);
      setIsLoad(true);
    };

    fetchData();
  }, [setHeroLists]);

  return (
    <PageContainer>
      {isLoad ? (
        <>
          <StyledTitle>Choose Your Hero !</StyledTitle>
          <HeroList heroData={heroLists} />
        </>
      ) : (
        <>
          <Skeleton variant="text" width={200} height={50} />
          <Skeleton variant="rounded" width={1000} height={350} />
        </>
      )}
    </PageContainer>
  );
}
