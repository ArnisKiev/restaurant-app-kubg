export enum WebsocketMessageType {
    OrderCreatingMessage = 'OrderCreatingMessage',
    OrderedDishUpdatingState = 'OrderedDishUpdatingState'
}


export interface IWebsocketMessage {
    payload: any;
    channel: string;
    type: WebsocketMessageType;
}