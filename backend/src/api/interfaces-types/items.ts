export type CreatePayload = {
	name: string;
	startTime: string;
	endTime: string;
	startingBid: string;
	userId: string;
}

export type UpdatePayload = {
	published: boolean
}
export type ListItemsPayload = {
	type: number
}