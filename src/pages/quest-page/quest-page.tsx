import { Helmet } from 'react-helmet-async';
import { quest } from '../../mocks/quest';
import { AppRoute, QuestLevelLabel, QuestTypeLabel } from '../../const';
import { Link } from 'react-router-dom';

const QuestPage = () => {
  const {id, title, level, description, type, coverImg, coverImgWebp, peopleMinMax} = quest;

  return (
    <>
      <Helmet>
        <title>Квест - Escape Room</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={coverImgWebp}
          />
          <img
            src={coverImg}
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{QuestTypeLabel[type]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {peopleMinMax.join('-')}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {QuestLevelLabel[level]}
            </li>
          </ul>
          <p className="quest-page__description">
            {description}
          </p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={AppRoute.Booking.replace(':id', id)}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuestPage;
