export interface contactUsInput {
    id?: string | number,
    type: string,
    name: "name" | "email",
    placeholder?: string,
}

/** Payload sent to POST /messages */
export interface SendMessagePayload {
    conversation_id: string;
    content: string;
    type: "text";
}

/** Shape of the API success response */
export interface SendMessageResponse {
    success: boolean;
    message: string;
    data?: unknown;
}
