// Hero List 中的 Hero 基本資料
export interface Hero {
  id: string;
  name: string;
  image: string;
}

// Hero Profile 的基本能力數值
export interface HeroStat {
  str: number;
  int: number;
  agi: number;
  luk: number;
}
