"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  width: 700px;
  padding: 2rem;
  border: 1px solid #707070;
  border-radius: 10px;
  margin-top: 20px;
`;

const ProfileLeft = styled.div`
  width: 60%;
  justify-content: center;
`;

const ProfileRight = styled.div`
  align-content: flex-end;
  width: 40%;
`;

const Statistic = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const StatisticText = styled.p`
  font-size: 20px;
`;

const ControlButton = styled.button`
  height: 30px;
  width: 30px;
  font-size: 20px;
  background-color: #f5f5f5;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  height: 30px;
  width: 120px;
  text-align: center;
  font-size: 20px;
  background-color: #f5f5f5;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function HeroProfile() {
  const [str, setStr] = useState(2);
  const [int, setInt] = useState(6);
  const [agi, setAgi] = useState(4);
  const [luk, setLuk] = useState(5);
  const [point, setPoint] = useState(5);

  function add(val: number, callbackFunc: any) {
    if (point > 0) {
      callbackFunc(val + 1);
      setPoint(point - 1);
    } else {
      toast.error("剩餘點數不足");
    }
  }

  function minus(val: number, callbackFunc: Function) {
    if (val > 0) {
      callbackFunc(val - 1);
      setPoint(point + 1);
    } else {
      toast.error("能力點數不足");
    }
  }

  const staticData = [
    {
      property: "STR",
      value: str,
      add: () => add(str, setStr),
      minus: () => minus(str, setStr),
    },
    {
      property: "INT",
      value: int,
      add: () => add(int, setInt),
      minus: () => minus(int, setInt),
    },
    {
      property: "AGI",
      value: agi,
      add: () => add(agi, setAgi),
      minus: () => minus(agi, setAgi),
    },
    {
      property: "LUK",
      value: luk,
      add: () => add(luk, setLuk),
      minus: () => minus(luk, setLuk),
    },
  ];

  const StaticControler = staticData.map((item) => (
    <Statistic key={item.property}>
      <StatisticText>{item.property}</StatisticText>
      <ControlButton onClick={item.add}>+</ControlButton>
      <StatisticText>{item.value}</StatisticText>
      <ControlButton onClick={item.minus}>-</ControlButton>
    </Statistic>
  ));

  return (
    <ProfileContainer>
      <ProfileLeft>{StaticControler}</ProfileLeft>
      <ProfileRight>
        <StatisticText>剩餘點數 : {point}</StatisticText>
        <SaveButton>儲存</SaveButton>
      </ProfileRight>
      <Toaster />
    </ProfileContainer>
  );
}
