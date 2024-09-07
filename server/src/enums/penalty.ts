const SERVICE_ERROR_TAG = '[ServiceError]:';

export const PenaltyRoute = {
    RETRIEVE_BY_NODE: '/penalties',
    CREATE: '/penalty',
    UPDATE: '/penalties/:id',
    DELETE: '/penalties/:id',
};

export const PenaltyError = {
    CREATE: `${SERVICE_ERROR_TAG} Cannot insert new penalty row!`,
    UPDATE: `${SERVICE_ERROR_TAG} Cannot update penalty!`,
    DELETE: `${SERVICE_ERROR_TAG} Cannot delete penalty!`,
    INPUT_PAYLOAD: (key: string) => `${key} is invalid!`,
    NOT_A_NUMBER: (key: string) => `${key} should be a number!`,
    NONEXISTENCE: (key: string, value: number | string) =>
        `${SERVICE_ERROR_TAG} ${key} '${value}' does not exist!`,
};

export const PenaltySuccess = {
    CREATE: 'Created new penalty!',
    UPDATE: 'Updated!',
    DELETE: 'Deleted!',
};
