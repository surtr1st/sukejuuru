const SERVICE_ERROR_TAG = '[ServiceError]:';

export const NodeError = {
    CREATE: `${SERVICE_ERROR_TAG} Cannot insert new node row!`,
    UPDATE: `${SERVICE_ERROR_TAG} Cannot update node!`,
    DELETE: `${SERVICE_ERROR_TAG} Cannot delete node!`,
};

export const NodeSuccess = {
    CREATE: 'Created new node!',
    UPDATE: 'Updated!',
    DELETE: 'Deleted!',
};
