import { Helmet } from 'react-helmet-async';
import BookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPlacesAction } from '../../store/api-actions';
import { selectPlaces, selectPlacesRequestStatus } from '../../store/booking/selectors';
import { Navigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { AppRoute, RequestStatus } from '../../const';
import { selectQuests } from '../../store/quests/selectors';
import { findQuestById } from '../../utils';
import { PeopleMinMax } from '../../types';

const BookingPage = (): JSX.Element => {
  const {id: offerId} = useParams();
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectPlaces);
  const quests = useAppSelector(selectQuests);
  const placesStatus = useAppSelector(selectPlacesRequestStatus);
  const [currentBookingId, setCurrentBookingId] = useState<string>(places[0]?.id || '');

  useEffect(() => {
    dispatch(fetchPlacesAction(offerId as string));
  }, [dispatch, offerId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setCurrentBookingId(places[0]?.id || '');
    }

    return () => {
      isMounted = false;
    };
  }, [places]);

  const quest = useMemo(() => findQuestById(quests, offerId as string), [quests, offerId]);

  if (placesStatus === RequestStatus.Failed) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const currentBooking = places.find((place) => place.id === currentBookingId);
  const {title, peopleMinMax} = quest || {};
  const {slots, location} = currentBooking || {};
  const {address} = location || {};

  if (placesStatus === RequestStatus.Loading || !quest) {
    return <Loading/>;
  }

  const handleCurrentBookingChange = (placeId: string): void => {
    setCurrentBookingId(placeId);
  };

  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
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
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">
            {title || 'Без названия'}
          </p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <Map
              markers={places}
              activeMarker={currentBooking}
              onMarkerClick={handleCurrentBookingChange}
            />
            <p className="booking-map__address">
              Вы&nbsp;выбрали: {address}
            </p>
          </div>
        </div>
        {slots &&
          <BookingForm
            placeId={currentBookingId}
            places={slots}
            offerId={offerId as string}
            peopleMinMax={peopleMinMax as PeopleMinMax}
          />}

      </div>
    </>
  );
};

export default BookingPage;
