import { Quest, ReservationQuest } from '../../types';
import QuestCard from '../quest-card/quest-card';

type CardsListProps = {
  quests: (Quest | ReservationQuest)[];
}

const CardsList = ({quests}: CardsListProps): JSX.Element => (
  <div className="cards-grid">
    {quests.map((quest) =>
      <QuestCard key={quest.id} questProp={quest} />
    )}
  </div>
);

export default CardsList;
