export enum AppRoute {
  Root = '/',
  Login = '/login',
  Contacts = '/contacts',
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Quest = '/quest',
  Booking = '/booking',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failed = 'FAILED'
}

export enum NameSpace {
  Quests = 'QUESTS',
  Quest = 'QUEST',
  Booking = 'BOOKING',
  User = 'USER',
  Reservation = 'RESERVATION'
}

export const QuestDate = {
  Today: 'today',
  Tomorrow: 'tomorrow',
} as const;

export type Date = typeof QuestDate[keyof typeof QuestDate];

export const QuestDateLabel: Record<Date, string> = {
  [QuestDate.Today]: 'сегодня',
  [QuestDate.Tomorrow]: 'завтра',
};

export const QuestLevel = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export type Level = typeof QuestLevel[keyof typeof QuestLevel];

export const QuestLevelLabel: Record<Level, string> = {
  [QuestLevel.Easy]: 'лёгкий',
  [QuestLevel.Medium]: 'средний',
  [QuestLevel.Hard]: 'сложный'
};

export const QuestType = {
  Adventures: 'adventures',
  Horror: 'horror',
  Mystic: 'mystic',
  Detective: 'detective',
  SciFi: 'sci-fi',
} as const;

export type Type = typeof QuestType[keyof typeof QuestType];

export const QuestTypeLabel: Record<Type, string> = {
  [QuestType.Adventures]: 'приключения',
  [QuestType.Horror]: 'ужасы',
  [QuestType.Mystic]: 'мистика',
  [QuestType.Detective]: 'детектив',
  [QuestType.SciFi]: 'sci-fi'
};
