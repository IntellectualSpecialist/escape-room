import { Quest } from './quest';

export type PageQuest = Quest & {
  coverImg: string;
  coverImgWebp: string;
  description: string;
}
