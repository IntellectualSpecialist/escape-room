import { ReservationQuest } from '../types';

export const reservationQuests: ReservationQuest[] = [
  {
    'date': 'today',
    'time': '14:00',
    'contactPerson': 'Oliver',
    'phone': '899911122233',
    'withChildren': true,
    'peopleCount': 3,
    'id': '0c5fa01d-e89c-478d-9b85-799cf4abe29f',
    'location': {
      'address': 'Набережная реки Карповки, 5П',
      'coords': [
        59.96536433646851,
        30.424032915448624
      ]
    },
    'quest': {
      'id': 'aba664c3-bdf3-4fb3-b8f3-42e007864bbf',
      'title': 'Склеп',
      'previewImg': 'https://grading.design.htmlacademy.pro/static/quest/maniac.jpg',
      'previewImgWebp': 'https://grading.design.htmlacademy.pro/static/quest/maniac.webp',
      'level': 'easy',
      'type': 'adventures',
      'peopleMinMax': [
        5
      ]
    }
  }
];
