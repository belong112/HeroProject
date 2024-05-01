"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { useSelectStore } from "@/store";
import { HeroStat } from "@/interfaces";
import { patchHeroProfile } from "@/utils/request";

const ProfileContainer = styled.div`
  display: flex;
  max-width: 1000px;
  width: calc(100% - 60px); // 100% 寬度減去左右 margin + padding 的總寬度
  margin: 20px 10px;
  padding: 20px;
  border: 1px solid #707070;
  border-radius: 10px;
  background-color: #ffffff;
`;

const ProfileLeft = styled.div`
  justify-content: center;
  width: 60%;
`;

const ProfileRight = styled.div`
  align-content: flex-end;
  width: 40%;
`;

const Statistic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 24px;
`;

const StatisticText = styled.p`
  font-size: 20px;
`;

const Button = styled.button`
  background-color: #f5f5f5;
  border: 0px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const ControlButton = styled(Button)`
  height: 30px;
  width: 30px;
`;

const SaveButton = styled(Button)`
  height: 30px;
  width: 120px;
  margin: 1em 0;
`;

export default function HeroProfile({ statData }: { statData: HeroStat }) {
  const [str, setStr] = useState(statData.str);
  const [int, setInt] = useState(statData.int);
  const [agi, setAgi] = useState(statData.agi);
  const [luk, setLuk] = useState(statData.luk);
  const [point, setPoint] = useState(0); // 可分配的點數
  const { selectedId } = useSelectStore();

  // 增加技能點數
  function increase(val: number, settingFunc: any) {
    // 需有可分配點數
    if (point > 0) {
      settingFunc((val: number) => val + 1);
      setPoint(point - 1);
    } else {
      toast.error("剩餘點數不足", {
        duration: 1500,
      });
    }
  }

  // 減少技能點數
  function decrease(val: number, settingFunc: Function) {
    // 技能點數不可為0
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

  const statisticData = [
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

  const StatisticControler = statisticData.map((item) => (
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
      <ProfileLeft>{StatisticControler}</ProfileLeft>
      <ProfileRight>
        <StatisticText>剩餘點數 : {point}</StatisticText>
        <SaveButton onClick={saveStats}>儲存</SaveButton>
      </ProfileRight>
      <Toaster />
    </ProfileContainer>
  );
}
