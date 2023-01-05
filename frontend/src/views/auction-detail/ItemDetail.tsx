import { useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import Countdown from "react-countdown";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchItemById } from '../../actions/items.actions';
import { BidData, ItemDetailData, CountdownRenderer } from '../../interfaces-types/item'
import { io, Socket } from "socket.io-client";
import { LoginUserData } from '../../interfaces-types/auth'
import toast from 'react-hot-toast'
import moment from 'moment'

interface ServerToClientEvents {
	newBidClient: (data: BidData) => void;
	acceptBidClient: (isAccepted: boolean) => void;
}

interface ClientToServerEvents {
	newBidServer: (data: BidData) => void;
	acceptBidServer: (bidId: string) => void;
}

function ItemDetail() {
	const navigate = useNavigate();
	const [item, setItem] = useState<ItemDetailData>()
	const [userId, setUserId] = useState('')
	const [highestBid, setHighestBid] = useState(0)
	const [bidDisabled, setBidDisabled] = useState(false)
	const [bids, setBids] = useState<BidData[]>([])
	const [socketIo, setSocket] = useState<any>(null)
	const [amount, setAmount] = useState<string>('')
	const params = useParams();
	const itemId = params.id;
	useEffect(() => {
		const getItems = async () => {
			const responsedItems = await fetchItemById(itemId);
			setItem(responsedItems.item);
			setBids(responsedItems.item.bids);
			setHighestBid(responsedItems.item.highestBid || 0);
		}
		getItems();

		const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8081");
		socket.on("newBidClient", (data) => {
			setBidDisabled(true)
			setHighestBid(data.value)
			setBids(prev => [data, ...prev]);
		})
		socket.on("acceptBidClient", (isAccepted) => {
			if (isAccepted) {
				toast.success('Bid accepted successfully');
				navigate('/')
			}
		})
		setSocket(socket)

		const user: string | null | undefined = localStorage.getItem('user');
		if (user) {
			const { _id }: LoginUserData = JSON.parse(user);
			setUserId(_id)
		}
	}, []);
	const bid = () => {
		if(!Number.isInteger(Number(amount))) {
			toast.error('Please enter valid number');
			return;
		}
		let user: string | null | undefined = localStorage.getItem('user');
		if (user) {
			// if no bid, requested bid should be equal or greater than starting bid
			if (item && !bids?.length && Number(amount) < item.startingBid)
				return toast.error('Bid should be equal or greater than starting bid');

			// amount should be greater than last highest bid
			if (!amount.trim() || Number(amount) <= highestBid)
				return toast.error('Bid amount should be greater than last placed highest bid');
			const { _id, name }: LoginUserData = JSON.parse(user);
			socketIo.emit("newBidServer", {
				"userId": _id, "itemId": itemId, "value": amount, bidder: name, createdAt: new Date()
			})
		}
	}
	const Completionist = () => {
		setBidDisabled(false)
	};
	const renderer = (data: CountdownRenderer) => {
		return <span>Next bid will be allowed in {data.seconds} seconds!</span>;
	};
	const acceptBid = (bidId: string) => {
		if (userId && bidId)
			socketIo.emit("acceptBidServer", bidId)
	}
	const today = moment(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS')
	const startDate = item && moment(new Date(item.startTime), 'YYYY-MM-DD HH:mm:ss:SSS')
	const endDate = item && moment(new Date(item.endTime), 'YYYY-MM-DD HH:mm:ss:SSS')
	const isItemActive = item?.published && (today.isBetween(startDate, endDate))

	return (
		<section className="item-detail">
			<Container>
				{
					item ? <div className="item-detail-holder">
						<h3 className="item-name d-block mb-3">{item.name}</h3>
						<ul className="list-unstyled mb-3 mb-md-5">
							<li>
								<strong>Created By: </strong>
								<span>{item.creator}</span>
							</li>
							<li>
								<strong>Starting Bid: </strong>
								<span>${item.startingBid}</span>
							</li>
							{
								highestBid > 0 &&
								<li>
									<strong>Highest Bid: </strong>
									<span>${highestBid}</span>
								</li>
							}
						</ul>
						{
							isItemActive && userId !== item?.userId &&
							<div className="mb-3 mb-md-5">
								<h4 className="mt-0 mb-3">Place your Bid here:</h4>
								<div className="d-flex align-items-center">
									<span className="me-2">Amount</span>
									<Form className="d-flex align-items-center">
										<div className="me-2">
											<input className="form-control" type="text" onChange={(e: FormEvent<HTMLInputElement>) => setAmount(e.currentTarget.value)} />
										</div>
										{
											!bidDisabled ?
												<Button className="ms-2" variant="primary" type="button" disabled={bidDisabled} onClick={() => bid()}>
													Bid
												</Button> :
												<strong className="time-holder">
													<Countdown date={Date.now() + 5000} onComplete={Completionist} renderer={renderer} />
												</strong>
										}
									</Form>
								</div>
							</div>
						}
						<h4 className="mt-0 mb-3">Bids:</h4>
						{bids?.length ?
							<ul className="posted-bids-list list-unstyled mb-3">
								{
									bids.map((bid: BidData, index: number) => {
										return (
											<li key={index} className="d-flex align-items-center">
												<div className="bid-holder">
													{bid.bidder ?
														<strong>{bid.bidder} </strong>
														:
														""
													}
													placed a bid for <strong>${bid.value}</strong> at <strong>{moment(new Date(bid.createdAt)).format('MM/DD/YYYY h:mm A')}</strong>
												</div>
												{
													item.userId === userId &&
													<Button className="ms-2" variant="primary" onClick={() => acceptBid(bid._id)}>
														<span className="d-none d-sm-block">Accept</span>
													</Button>
												}
											</li>
										)
									})
								}
							</ul>
							:
							<span className="no-data-found d-flex justify-content-center align-items-center">No Bids Found</span>
						}

					</div> : ""
				}
			</Container>
		</section>
	);
}
export default ItemDetail;