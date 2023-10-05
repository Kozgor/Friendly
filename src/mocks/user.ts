export const INITIAL_LOCAL_PROFILE = {
    _id: '',
    fullName: '',
    role: '',
    avatar: '',
    token: ''
};

export const LOCAL_USER_PROFILE = {
    _id: '650b15bfc45ee8d80c27c388',
    fullName: 'John Doe',
    role: 'user',
    avatar: 'avatar.jpg',
    token: 'dummy-token-12345-test-user'
};

export const LOCAL_ADMIN_PROFILE = {
    _id: '650b15bfc45ee8d80c27c388',
    fullName: 'Admin',
    role: 'admin',
    avatar: 'avatar.jpg',
    token: 'dummy-token-12345-test-admin'
};

export const INITIAL_USER_PROFILE = {
    fullName: '',
    _id: '',
    avatar: '',
    role: '',
    email: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    boards: {
        active: null,
        finalized: null
    },
    __v: 0,
    token: ''
};


export const STORE_USER_PROFILE = {
    fullName: 'John Doe',
    _id: 'test-id-john',
    avatar: 'avatar.jpg',
    role: 'user',
    email: 'user@mail-test.com',
    description: 'dummy descrition',
    createdAt: '2023-08-25T09:23:57.495+00:00',
    updatedAt: '2023-08-25T09:23:57.495+00:00',
    boards: {
        active: 'oe2r4-2034rm-2or12-ok3rke',
        finalized: null
    },
    __v: 0,
    token: 'dummy-token-12345-test'
};
