import { Helmet } from 'react-helmet-async';
import { places } from '../../mocks/places';
import { quest } from '../../mocks/quest';
import BookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import { useState } from 'react';

const BookingPage = (): JSX.Element => {
  const [currentBookingId, setCurrentBookingId] = useState<string>(places[0].id);
  const currentBooking = places.find((place) => place.id === currentBookingId);
  const {title} = quest;
  const {slots, location} = currentBooking || {};
  const {address} = location || {};

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
            {title}
          </p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <Map markers={places} activeMarker={currentBooking} onMarkerClick={handleCurrentBookingChange} />
            <p className="booking-map__address">
              Вы&nbsp;выбрали: {address}
            </p>
          </div>
        </div>
        {slots && <BookingForm placeId={currentBookingId} places={slots} />}

      </div>
    </>
  );
};

export default BookingPage;
