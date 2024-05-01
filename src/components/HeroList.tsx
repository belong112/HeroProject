"use client";
import { useRouter } from "next/navigation";
import { useSelectStore } from "@/store";
import { Hero } from "@/interfaces";

import styled from "styled-components";
import HeroCard from "@/components/HeorCard";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function HeroList({ heroData }: { heroData: Array<Hero> }) {
  const router = useRouter();
  const { selectedId, setSelectedId } = useSelectStore();

  function clickCard(id: string) {
    setSelectedId(id);
    router.push(`/heroes/${id}`);
  }

  const Cards = heroData.map((item) => (
    <HeroCard
      key={item.id}
      isSelect={item.id === selectedId}
      name={item.name}
      image={item.image}
      clickCard={() => clickCard(item.id)}
    />
  ));

  return <StyledList>{Cards}</StyledList>;
}
