import React from 'react';
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { ItemProps } from '../../interfaces-types/item'
import moment from 'moment'

function Item(props: any) {
	const publishItem = async () => {
		props.publishItem(props._id);
	}
	return (
		<div className="item-holder mb-4">
			<h3 className="item-name d-block mb-2">
				<Link to={`/item-detail/${props._id}`}>{props.name}</Link>
			</h3>
			<ul className="list-unstyled">
				{
					props.type === 1 &&
					<li>
						<strong>Earned By: </strong>
						<span>{props.bidder ? props.bidder : 'None (Ended without Accepting)'}</span>
					</li>
				}
				{
					props.type === 2 &&
					<li>
						<strong>Ends In: </strong>
						<span>{moment(new Date(props.endTime)).format('MM/DD/YYYY h:mm A')}</span>
					</li>
				}
				{
					props.type === 3 || props.type === 4 ?
						<>
							<li className="mb-2">
								<strong className="d-block mb-1">Start Time: </strong>
								<span>{moment(new Date(props.startTime)).format('MM/DD/YYYY h:mm A')}</span>
							</li>
							<li>
								<strong className="d-block mb-1">End Time: </strong>
								<span>{moment(new Date(props.endTime)).format('MM/DD/YYYY h:mm A')}</span>
							</li>
						</>
						: ""}
			</ul>
			{
				props.type === 2 ?
					<Link to={`/item-detail/${props._id}`} className="btn btn-primary">Bid</Link>
					:
					props.type === 3 ?
						<Button variant="primary" onClick={() => publishItem()}>Publish</Button>
						:
						''
			}
		</div>
	);
}
export default Item;