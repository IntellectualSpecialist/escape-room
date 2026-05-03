import { Helmet } from 'react-helmet-async';
import { slot } from '../../mocks/slots';
import { quest } from '../../mocks/quest';
import BookingForm from '../../components/booking-form/booking-form';


const BookingPage = (): JSX.Element => {
  const {title} = quest;
  const {id, slots, location} = slot[0];
  const {address} = location;

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
            <div className="map">
              <div className="map__container" />
            </div>
            <p className="booking-map__address">
              Вы&nbsp;выбрали: {address}
            </p>
          </div>
        </div>
        {<BookingForm placeId={id} slots={slots} />}

      </div>
    </>
  );
};

export default BookingPage;
