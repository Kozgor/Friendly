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
