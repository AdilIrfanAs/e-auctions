export type CreatePayload = {
	name: string;
	startTime: string;
	endTime: string;
	startingBid: string;
	userId: string;
}
export type CreateResponse = {
	status: boolean;
	message: string;
}
export type PublishItemPayload = {
	published: boolean;
}
export type PublishItemResponse = {
	status: boolean;
	message: string;
	item: ItemData
}
export interface ItemProps {
	type: number;
	_id: string;
	bidder: string;
	name: string;
	endTime: string;
	startTime: string;
	publishItem: (_id: string) => void;
}
export type ItemData = {
	name:string;
	published: boolean;
	startTime: string;
	endTime: string;
	userId: string;
	_id: string
}
export type ItemsResponse = {
	status: boolean;
	message: string;
	items: ItemData[]
}
export type BidData = {
	_id: string;
	userId: string;
	itemId: string;
	value: number;
	bidder: string;
	createdAt: string;
}
export type ItemDetailData = {
	startTime: Date;
	endTime: Date;
	published: boolean;
	name: string;
	creator: string;
	startingBid: number;
	bids: BidData[];
	userId: string;
}

export type CountdownRenderer = {
	seconds: number
}