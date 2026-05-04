import { Helmet } from 'react-helmet-async';
import CardsList from '../../components/cards-list/cards-list';
import { reservationQuests } from '../../mocks/reservation-quests';

const MyQuestsPage = (): JSX.Element => (
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

export default MyQuestsPage;
