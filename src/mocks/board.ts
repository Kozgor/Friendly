export const INITIAL_BOARD = {
    _id: '',
    name: '',
    theme: '',
    timer: 0,
    columns: [],
    status: '',
    participants: []
};

export const ACTIVE_BOARD = {
    _id: 'oe2r4-2034rm-2or12-ok3rke',
    name: 'Test board',
    theme: 'Default',
    timer: 10,
    columns: [],
    status: 'active',
    participants: [],
    __v: 0
};

export const FINALIZED_BOARD = {
    _id: 'oe2r4-2034rm-2or12-ok3rke',
    name: 'Test board',
    theme: 'Default',
    timer: 10,
    columns: [],
    status: 'finalized',
    participants: [],
    __v: 0
};

export const BOARD_STATUSES = ['created', 'active', 'finalized', 'archived'];
