"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { useSelectStore } from "@/store";
import { patchHeroProfile } from "@/utils/request";

const ProfileContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 20px 10px;
  padding: 2rem;
  border: 1px solid #707070;
  border-radius: 10px;
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

interface HeroStat {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export default function HeroProfile({ statData }: { statData: HeroStat }) {
  const [str, setStr] = useState(statData.str);
  const [int, setInt] = useState(statData.int);
  const [agi, setAgi] = useState(statData.agi);
  const [luk, setLuk] = useState(statData.luk);
  const [point, setPoint] = useState(0);
  const { selectedId } = useSelectStore();

  function increase(val: number, settingFunc: any) {
    if (point > 0) {
      settingFunc((val: number) => val + 1);
      setPoint(point - 1);
    } else {
      toast.error("剩餘點數不足", {
        duration: 1500,
      });
    }
  }

  function decrease(val: number, settingFunc: Function) {
    if (val > 0) {
      settingFunc((val: number) => val - 1);
      setPoint(point + 1);
    } else {
      toast.error("能力點數不足", {
        duration: 1500,
      });
    }
  }

  function saveStats() {
    // 檢查點數是否分配完畢
    if (point > 0) {
      toast.error("仍有點數尚未分配", {
        duration: 1500,
      });
      return;
    }

    const param = {
      str: str,
      int: int,
      agi: agi,
      luk: luk,
    };

    patchHeroProfile(selectedId, param)
      .then(() => {
        toast.success("儲存成功", {
          duration: 1500,
        });
      })
      .catch(() =>
        toast.error("發生錯誤", {
          duration: 1500,
        }),
      );
  }

  const staticData = [
    {
      property: "STR",
      value: str,
      increase: () => increase(str, setStr),
      decrease: () => decrease(str, setStr),
    },
    {
      property: "INT",
      value: int,
      increase: () => increase(int, setInt),
      decrease: () => decrease(int, setInt),
    },
    {
      property: "AGI",
      value: agi,
      increase: () => increase(agi, setAgi),
      decrease: () => decrease(agi, setAgi),
    },
    {
      property: "LUK",
      value: luk,
      increase: () => increase(luk, setLuk),
      decrease: () => decrease(luk, setLuk),
    },
  ];

  const StaticControler = staticData.map((item) => (
    <Statistic key={item.property}>
      <StatisticText>{item.property}</StatisticText>
      <ControlButton onClick={item.increase}>+</ControlButton>
      <StatisticText>{item.value}</StatisticText>
      <ControlButton onClick={item.decrease}>-</ControlButton>
    </Statistic>
  ));

  useEffect(() => {
    setStr(statData.str);
    setInt(statData.int);
    setAgi(statData.agi);
    setLuk(statData.luk);
  }, [statData]);

  return (
    <ProfileContainer>
      <ProfileLeft>{StaticControler}</ProfileLeft>
      <ProfileRight>
        <StatisticText>剩餘點數 : {point}</StatisticText>
        <SaveButton onClick={saveStats}>儲存</SaveButton>
      </ProfileRight>
      <Toaster />
    </ProfileContainer>
  );
}
