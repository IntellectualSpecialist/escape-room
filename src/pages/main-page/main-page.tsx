import { Helmet } from 'react-helmet-async';
import CardsList from '../../components/cards-list/cards-list';
import { quests } from '../../mocks/quests';
import { ReactEventHandler, useMemo, useState } from 'react';
import { GenreFilter, LevelFilter } from '../../types';
import { filterByGenre, filterByLevel } from '../../utils';

type ChangeHandler = ReactEventHandler<HTMLInputElement>

type GenreItem = {
  title: GenreFilter;
  text: string;
  icon: {
    name: string;
    width: number;
    height: number;
  };
}

type LevelItem = {
  title: LevelFilter;
  text: string;
}

const GENRE_ITEMS: GenreItem[] = [
  {
    title: GenreFilter.All,
    text: 'Все квесты',
    icon: {
      name: 'icon-all-quests',
      width: 26,
      height: 30,
    },
  },
  {
    title: GenreFilter.Adventure,
    text: 'Приключения',
    icon: {
      name: 'icon-adventure',
      width: 36,
      height: 30,
    },
  },
  {
    title: GenreFilter.Horror,
    text: 'Ужасы',
    icon: {
      name: 'icon-horror',
      width: 30,
      height: 30,
    },
  },
  {
    title: GenreFilter.Mystic,
    text: 'Мистика',
    icon: {
      name: 'icon-mystic',
      width: 30,
      height: 30,
    },
  },
  {
    title: GenreFilter.Detective,
    text: 'Детектив',
    icon: {
      name: 'icon-detective',
      width: 40,
      height: 30,
    },
  },
  {
    title:  GenreFilter.SciFi,
    text: 'Sci-fi',
    icon: {
      name: 'icon-sci-fi',
      width: 28,
      height: 30,
    },
  }
];

const LEVEL_ITEMS: LevelItem[] = [
  {
    title: LevelFilter.Any,
    text: 'Любой',
  },
  {
    title: LevelFilter.Easy,
    text: 'Лёгкий',
  },
  {
    title: LevelFilter.Middle,
    text: 'Средний',
  },
  {
    title: LevelFilter.Hard,
    text: 'Сложный',
  },
];


const MainPage = (): JSX.Element => {
  const [filters, setFilters] = useState<{type: GenreFilter; level: LevelFilter}>({
    type: GenreFilter.All,
    level: LevelFilter.Any
  });

  const handleFiltersChange: ChangeHandler = (evt) => {
    const {name, id} = evt.currentTarget;

    setFilters(
      {
        ...filters,
        [name]: id
      }
    );
  };

  const filteredByGenreQuests = useMemo(() => filterByGenre(quests, filters.type), [filters.type]);

  const filteredByGenreAndLevelQuests = useMemo(() => filterByLevel(filteredByGenreQuests, filters.level), [filteredByGenreQuests, filters.level]);

  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
          квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
          Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>
              <ul className="filter__list">
                {GENRE_ITEMS && GENRE_ITEMS?.map(({title, text, icon: {width, height, name}}) => (
                  <li key={title} className="filter__item">
                    <input
                      type="radio"
                      name="type"
                      id={title}
                      checked={filters.type === title}
                      onChange={handleFiltersChange}
                    />
                    <label className="filter__label" htmlFor={title}>
                      <svg
                        className="filter__icon"
                        width={width}
                        height={height}
                        aria-hidden="true"
                      >
                        <use xlinkHref={`#${name}`} />
                      </svg>
                      <span className="filter__label-text">{text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <ul className="filter__list">
                {LEVEL_ITEMS && LEVEL_ITEMS?.map(({title, text}) => (
                  <li key={title} className="filter__item">
                    <input
                      type="radio"
                      name="level"
                      id={title}
                      checked={filters.level === title}
                      onChange={handleFiltersChange}
                    />
                    <label className="filter__label" htmlFor={title}>
                      <span className="filter__label-text">{text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        {filteredByGenreAndLevelQuests?.length ?
          <CardsList quests={filteredByGenreAndLevelQuests} /> :
          'Квесты по указанным жанру и сложности не найдены.'}
      </div>
    </>
  );
};

export default MainPage;
