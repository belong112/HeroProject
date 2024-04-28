import Image from "next/image";
import styled, { css } from "styled-components";

export default function HeroCard({
  isSelect,
  name,
  image,
  clickCard,
}: {
  isSelect: boolean;
  name: string;
  image: string;
  clickCard: () => void;
}) {
  const Card = styled.div<{ $isSelect: boolean }>`
    flex: 0 0 25%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: ${(props) =>
      props.$isSelect ? " 0px 0px 15px #fc4517" : "0px 0px 15px #707070"};
    background: #fff;
    color: #707070;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: red;
    }
  `;

  const HeroName = styled.p`
    font-size: 2rem;
  `;

  return (
    <Card $isSelect={isSelect} onClick={clickCard}>
      <Image src={image} width={200} height={200} alt="Picture of hero" />
      <HeroName>{name}</HeroName>
    </Card>
  );
}
