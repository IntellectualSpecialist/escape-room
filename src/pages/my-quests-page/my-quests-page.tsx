import { Helmet } from 'react-helmet-async';
import CardsList from '../../components/cards-list/cards-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchReservationAction } from '../../store/api-actions';
import { selectReservation, selectReservationStatus } from '../../store/reservation/selectors';
import { RequestStatus } from '../../const';
import Loading from '../../components/loading/loading';

const MyQuestsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const reservationQuests = useAppSelector(selectReservation);
  const reservationStatus = useAppSelector(selectReservationStatus);

  useEffect(() => {
    dispatch(fetchReservationAction());
  }, [dispatch]);

  if (reservationStatus === RequestStatus.Loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width={1366}
            height={1959}
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
          Мои бронирования
          </h1>
        </div>
        {reservationQuests?.length ?
          <CardsList quests={reservationQuests} /> :
          <p>Пока ничего не забронировано.</p>}
      </div>
    </>
  );
};

export default MyQuestsPage;
