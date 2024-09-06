const SERVICE_ERROR_TAG = '[ServiceError]:';

export const NodeRoute = {
    RETRIEVE: '/nodes',
    CREATE: '/node',
    UPDATE: '/nodes/:id',
    DELETE: '/nodes/:id',
    FIND_BY_ID: '/nodes/:id',
};

export const NodeError = {
    CREATE: `${SERVICE_ERROR_TAG} Cannot insert new node row!`,
    UPDATE: `${SERVICE_ERROR_TAG} Cannot update node!`,
    DELETE: `${SERVICE_ERROR_TAG} Cannot delete node!`,
    INPUT_PAYLOAD: (key: string) => `${key} is invalid!`,
    NOT_A_NUMBER: (key: string) => `${key} should be a number!`,
    NONEXISTENCE: (key: string, value: number | string) =>
        `${SERVICE_ERROR_TAG} ${key} '${value}' does not exist!`,
};

export const NodeSuccess = {
    CREATE: 'Created new node!',
    UPDATE: 'Updated!',
    DELETE: 'Deleted!',
};
