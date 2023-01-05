import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Item from "../../components/item/Item";
import { fetchDrafts } from '../../actions/items.actions';
import { updateItem } from '../../actions/items.actions'
import { ItemData } from '../../interfaces-types/item'
import { UserStateType } from '../../interfaces-types/auth'

function DraftItems() {
	const [items, setItems] = useState<ItemData[]>([]);
	const user = useSelector((state: UserStateType) => state.user);
	useEffect(() => {
		if(user.length) {
			const getItems = async () => {
				const { status, items } = await fetchDrafts(user[0]._id);
				if (status) {
					setItems(items)
				}
			}
			getItems();
		}
	}, [user])
	const publishItem = async (_id: string) => {
		const payload = {
			published: true
		}
		const { status, message, item } = await updateItem(_id, payload);
		if (status) {
			toast.success(message);
			const itemsArray = [...items];
			const draftItems = itemsArray.filter((a: any) => {
				return a._id !== item._id
			})
			setItems(draftItems)
		}
		else {
			toast.error(message);
		}
	}
	return (
		<section className="draft-items">
			<Container>
				<Row>
					<Col>
						<h1 className="mb-3 mtp0">Draft Auctions</h1>
					</Col>
				</Row>
				<Row>
					{
						items && items.length ? items.map((item: object, index) => {
							return (
								<Col key={index} xl={3} lg={4} md={6}>
									<Item {...item} type={3} publishItem={(_id: string) => publishItem(_id)} />
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
export default DraftItems;