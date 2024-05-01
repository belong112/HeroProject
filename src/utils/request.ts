import axios from "axios";

import { HeroStat } from "@/interfaces";

export async function get(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function patch(url: string, param: Object) {
  try {
    const response = await axios.patch(url, param);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getHeroListsInfo() {
  return get("https://hahow-recruit.herokuapp.com/heroes");
}

export async function getSingleHeroInfo(heroId: string) {
  return get(`https://hahow-recruit.herokuapp.com/heroes/${heroId}`);
}

export async function getHeroProfile(heroId: string) {
  return get(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`);
}

export async function patchHeroProfile(heroId: string, param: HeroStat) {
  return patch(
    `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
    param,
  );
}
