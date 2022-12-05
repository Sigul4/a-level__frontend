type promisePayload = {
    type: string,
    status: object,
    name: string,
    payload: object,
    error: object
}

export default function promiseReducer(state :object, { type, status, name, payload, error }: promisePayload) {
    if (state === undefined) {
        return {};
    }

    if (type === "PROMISE") {
        return {
        ...state,
        [name]: { status, payload, error },
        };
    }
    return state;
}
