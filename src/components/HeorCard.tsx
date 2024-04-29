import Image from "next/image";
import styled from "styled-components";

const Card = styled.div<{ $isSelect: boolean }>`
  width: 250px;
  padding: 15px;
  margin: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: "0px 0px 15px #707070";
  background: ${(props) => (props.$isSelect ? "#fffcec" : "#fff")};
  color: #707070;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #fc4517;
    box-shadow: 0px 0px 15px #fc4517;
  }
`;

const HeroName = styled.p`
  font-size: 2rem;
`;

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
  return (
    <Card $isSelect={isSelect} onClick={clickCard}>
      <Image src={image} width={200} height={200} alt="Picture of hero" />
      <HeroName>{name}</HeroName>
    </Card>
  );
}
