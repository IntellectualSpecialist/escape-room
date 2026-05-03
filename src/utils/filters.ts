import { QuestLevel, QuestType } from '../const';
import { GenreFilter, LevelFilter, Quest } from '../types';

const filterByGenre = (questItems: Quest[], genre: GenreFilter) => {
  switch (genre) {
    case GenreFilter.All:
      return questItems;
    case GenreFilter.Adventure:
      return questItems.filter((item) => item.type === QuestType.Adventures);
    case GenreFilter.Detective:
      return questItems.filter((item) => item.type === QuestType.Detective);
    case GenreFilter.Horror:
      return questItems.filter((item) => item.type === QuestType.Horror);
    case GenreFilter.Mystic:
      return questItems.filter((item) => item.type === QuestType.Mystic);
    case GenreFilter.SciFi:
      return questItems.filter((item) => item.type === QuestType.SciFi);
    default:
      return questItems;
  }
};

const filterByLevel = (questItems: Quest[], level: LevelFilter) => {
  switch (level) {
    case LevelFilter.Any:
      return questItems;
    case LevelFilter.Easy:
      return questItems.filter((item) => item.level === QuestLevel.Easy);
    case LevelFilter.Middle:
      return questItems.filter((item) => item.level === QuestLevel.Medium);
    case LevelFilter.Hard:
      return questItems.filter((item) => item.level === QuestLevel.Hard);
    default:
      return questItems;
  }
};

export {filterByGenre, filterByLevel};
