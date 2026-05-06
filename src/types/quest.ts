import { Level, Type } from '../const';

export type PeopleMinMax = number[];

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: Level;
  type: Type;
  peopleMinMax: PeopleMinMax;
}
