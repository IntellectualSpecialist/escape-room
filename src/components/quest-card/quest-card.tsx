import { Link } from 'react-router-dom';
import { Quest, ReservationQuest } from '../../types';
import { isReservationQuest } from '../../utils';
import { AppRoute, Date, QuestDateLabel, QuestLevelLabel } from '../../const';

type QuestCardProps ={
  questProp: Quest | ReservationQuest;
}

const QuestCard = ({questProp}:QuestCardProps): JSX.Element => {
  const isReservation = isReservationQuest(questProp);
  let quest: Quest;
  let date: null | Date = null;
  let time: null | string = null;
  let contactPerson: null | string = null;
  let phone: null | string = null;
  let withChildren: null | boolean = null;
  let peopleCount: null | number = null;
  let id: null | string = null;
  let address: null | string = null;
  let coords: null | number[] = null;

  if (isReservation) {
    quest = questProp.quest;
    ({date, time, contactPerson, phone, withChildren, peopleCount, id, location: {address, coords}} = questProp);

  } else {
    quest = questProp;
  }

  const {id: questId, title, previewImg, previewImgWebp, level, type, peopleMinMax} = quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp}
          />
          <img
            src={previewImg}
            width={344}
            height={232}
            alt=""
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={AppRoute.Quest.replace(':id', questId)}>
            {title}
          </Link>
          {isReservation &&
            <span className="quest-card__info">
              [{`${date ? QuestDateLabel[date] : ''},\u00A0${time ? time : ''}. ${address ? address : ''}`}]
            </span>}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {isReservation ? peopleCount : peopleMinMax.join('-')}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {QuestLevelLabel[level]}
          </li>
        </ul>
        {isReservation &&
          <button
            className="btn btn--accent btn--secondary quest-card__btn"
            type="button"
          >
            Отменить
          </button>}
      </div>
    </div>
  );
};

export default QuestCard;
