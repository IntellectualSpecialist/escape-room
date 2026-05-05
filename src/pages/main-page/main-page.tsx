import { Helmet } from 'react-helmet-async';
import CardsList from '../../components/cards-list/cards-list';
import { ReactEventHandler, useMemo, useState } from 'react';
import { GenreFilter, LevelFilter } from '../../types';
import { filterByGenre, filterByLevel } from '../../utils';
import Filters from '../../components/filters/filters';
import { useAppSelector } from '../../hooks';
import { selectQuests, selectQuestsStatus } from '../../store/quests/selectors';
import { RequestStatus } from '../../const';
import Loading from '../../components/loading/loading';

type ChangeHandler = ReactEventHandler<HTMLInputElement>

const MainPage = (): JSX.Element => {
  const [filters, setFilters] = useState<{type: GenreFilter; level: LevelFilter}>({
    type: GenreFilter.All,
    level: LevelFilter.Any
  });

  const quests = useAppSelector(selectQuests);
  const status = useAppSelector(selectQuestsStatus);

  const handleFiltersChange: ChangeHandler = (evt) => {
    const {name, id} = evt.currentTarget;

    setFilters(
      {
        ...filters,
        [name]: id
      }
    );
  };

  const filteredByGenreQuests = useMemo(() => filterByGenre(quests, filters.type), [quests, filters.type]);

  const filteredByGenreAndLevelQuests = useMemo(() => filterByLevel(filteredByGenreQuests, filters.level), [filteredByGenreQuests, filters.level]);

  if (status === RequestStatus.Loading) {
    return <Loading />;
  }

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
          <Filters type={filters.type} level={filters.level} onFilterChange={handleFiltersChange} />
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
