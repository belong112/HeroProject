"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import HeroCard from "@/components/HeorCard";

interface Hero {
  id: string;
  isSelect: boolean;
  name: string;
  image: string;
}

const StyledList = styled.div`
  display: flex;
  gap: 10px;
  width: 1200px;
`;

export default function HeroList({
  heroData,
  setSelectedId,
}: {
  heroData: Array<Hero>;
  setSelectedId: any;
}) {
  const router = useRouter();

  function clickCard(id: string) {
    router.push(`/heros/${id}`);
    setSelectedId(id);
  }

  const Cards = heroData.map((item) => (
    <HeroCard
      key={item.id}
      isSelect={item.isSelect}
      name={item.name}
      image={item.image}
      clickCard={() => clickCard(item.id)}
    />
  ));

  return <StyledList>{Cards}</StyledList>;
}
