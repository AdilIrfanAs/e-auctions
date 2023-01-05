import {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Item from "../../components/item/Item";
import {fetchItems} from '../../actions/items.actions';
import {ItemData} from '../../interfaces-types/item'

function ActiveBids() {
	const [items, setItems] = useState<ItemData[]>([]);
	useEffect(()=>{
		const getItems = async ()=>{
			const {status, items} = await fetchItems(2);
			if(status) {
				setItems(items)
			}
		}
		getItems();
	},[])
	return (
		<section className="active-bids">
			<Container>
				<Row>
					<Col>
						<h1 className="mb-3 mtp0">Active Auctions</h1>
					</Col>
				</Row>
				<Row>
					{
						items && items.length ? items.map((item: object, index)=>{
							return (
								<Col key={index} xl={3} lg={4} md={6}>
									<Item {...item} type={2} />
								</Col>
							)
						}) :
						<span className="no-data-found d-flex justify-content-center align-items-center">No Bids Found</span>
					}
				</Row>
			</Container>
		</section>
	);
}
export default ActiveBids;