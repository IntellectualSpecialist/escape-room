import { Helmet } from 'react-helmet-async';
import { AppRoute, QuestLevelLabel, QuestTypeLabel, RequestStatus } from '../../const';
import { Link, Navigate, useParams } from 'react-router-dom';
import { fetchQuestAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { selectQuest, selectQuestStatus } from '../../store/quest/selectors';
import Loading from '../../components/loading/loading';

const QuestPage = () => {
  const {id: pageId} = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(selectQuest);
  const questStatus = useAppSelector(selectQuestStatus);

  useEffect(() => {
    dispatch(fetchQuestAction(pageId as string));
  }, [dispatch, pageId]);

  if (questStatus === RequestStatus.Failed) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (questStatus === RequestStatus.Loading || !quest) {
    return <Loading/>;
  }

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
