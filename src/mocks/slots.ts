import { BookingQuest } from '../types';

export const slot: BookingQuest[] = [
  {
    'id': '756751ec-847a-490d-9dae-b49183251053',
    'location': {
      'address': 'Набережная реки Карповки, 5П',
      'coords': [
        59.987803542201036,
        30.352889458736357
      ]
    },
    'slots': {
      'today': [
        {
          'time': '14:00',
          'isAvailable': false
        },
        {
          'time': '15:00',
          'isAvailable': true
        },
        {
          'time': '16:00',
          'isAvailable': false
        },
        {
          'time': '17:00',
          'isAvailable': true
        },
        {
          'time': '18:00',
          'isAvailable': true
        },
        {
          'time': '19:00',
          'isAvailable': false
        },
        {
          'time': '20:00',
          'isAvailable': true
        }
      ],
      'tomorrow': [
        {
          'time': '14:00',
          'isAvailable': false
        },
        {
          'time': '15:00',
          'isAvailable': true
        },
        {
          'time': '16:00',
          'isAvailable': true
        },
        {
          'time': '17:00',
          'isAvailable': true
        },
        {
          'time': '18:00',
          'isAvailable': false
        },
        {
          'time': '19:00',
          'isAvailable': true
        },
        {
          'time': '20:00',
          'isAvailable': true
        }
      ]
    }
  }
];
