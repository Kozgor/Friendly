/* eslint-disable max-len */
import { initColumnValue } from './column';

export const INITIAL_BOARD = {
    _id: '',
    name: '',
    theme: '',
    timer: 0,
    columns: [],
    status: '',
    participants: [],
    createdAt: '2023-10-31T10:59:17.953+00:00'
};

export const ACTIVE_BOARD = {
    _id: 'oe2r4-2034rm-2or12-ok3rke',
    name: 'Test board',
    theme: 'Default',
    timer: 10,
    columns: [initColumnValue, initColumnValue, initColumnValue],
    status: 'active',
    participants: [
      'atest',
      'test'
    ],
    createdAt: '2023-10-31T10:59:17.953+00:00',
    __v: 0
};

export const FINALIZED_BOARD = {
    _id: 'oe2r4-2034rm-2or12-ok3rke',
    name: 'Test board',
    theme: 'Default',
    timer: 10,
    columns: [initColumnValue, initColumnValue, initColumnValue],
    status: 'finalized',
    participants: [
      'atest',
      'test'
    ],
    createdAt: '2023-10-31T10:59:17.953+00:00',
    __v: 0
};

export const BOARD_SUMMARY = {
	'boardName': 'Board test name',
	'boardSummaryDataList': [
		{
			'columnId': 'start',
			'columnTitle': '6 грудня',
			'cardId': '658b2f7fd765be4b97b31f3a',
			'cardComment': 'Щорічно з важливими датами приходять і додаткові вихідні, але в умовах воєнного стану, який було введено 24 лютого 2022 року, їх в Україні скасовано.',
			'cardTags': '',
			'cardReactions': {
				'happy': 0,
				'unhappy': 0
			},
			'cardAuthor': 'Test Model'
		},
		{
			'columnId': 'stop',
			'columnTitle': '24 грудня',
			'cardId': '658b2c62d765be4b97b31edc',
			'cardComment': 'І нехай вихідних у грудні 2023 не так вже й багато, воєнний стан не скасовує свят. Наприклад, 6 грудня діти радітимуть подарункам від Святого Миколая, на 24 число припадає Святвечір, а на останній день у році – День святої Маланки.',
			'cardTags': 'Learning',
			'cardReactions': {
				'happy': 0,
				'unhappy': 1
			},
			'cardAuthor': 'Incognito'
		},
		{
			'columnId': 'continue',
			'columnTitle': '31 грудня',
			'cardId': '658b2c9dd765be4b97b31ee5',
			'cardComment': 'І нехай вихідних у грудні 2023 не так вже й багато, воєнний стан не скасовує свят. Наприклад, 6 грудня діти радітимуть подарункам від Святого Миколая, на 24 число припадає Святвечір, а на останній день у році – День святої Маланки.',
			'cardTags': '',
			'cardReactions': {
				'happy': 0,
				'unhappy': 1
			},
			'cardAuthor': 'Test AModel'
		}
	]
};

export const EMPTY_BOARD_SUMMARY = {
  'boardName': 'Empty board test name',
  'boardSummaryDataList': []
};
