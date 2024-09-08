const SERVICE_ERROR_TAG = '[ServiceError]:';

export const InternalError = (serviceName: TServiceName) => {
    return {
        CREATE: `${SERVICE_ERROR_TAG} Cannot insert new ${serviceName} row!`,
        UPDATE: `${SERVICE_ERROR_TAG} Cannot update ${serviceName}!`,
        DELETE: `${SERVICE_ERROR_TAG} Cannot delete ${serviceName}!`,
    };
};

export const PayloadError = {
    INVALID: (key: string) => `${key} is invalid!`,
    NOT_A_NUMBER: (key: string) => `${key} should be a number!`,
    NONEXISTENCE: (key: string, value: number | string) =>
        `${SERVICE_ERROR_TAG} ${key} '${value}' does not exist!`,
};
