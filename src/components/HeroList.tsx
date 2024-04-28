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

export default function HeroList({ heroData }: { heroData: Array<Hero> }) {
  const router = useRouter();
  const StyledList = styled.div`
    display: flex;
    gap: 10px;
    width: 1200px;
  `;

  const Cards = heroData.map((item) => (
    <HeroCard
      key={item.id}
      isSelect={item.isSelect}
      name={item.name}
      image={item.image}
      clickCard={() => router.push(`/heros/${item.id}`)}
    />
  ));

  return <StyledList>{Cards}</StyledList>;
}
