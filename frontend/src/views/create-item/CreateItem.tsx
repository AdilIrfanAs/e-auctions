import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Form} from 'react-bootstrap';
import toast from 'react-hot-toast';
import {createItem} from '../../actions/items.actions'
import {LoginUserData} from '../../interfaces-types/auth'
import {CreatePayload} from '../../interfaces-types/item'
import "react-datetime/css/react-datetime.css";

function CreateItem() {
	const navigate = useNavigate();
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startingBid, setstartingBid] = useState('');
    const createAnItem = async ()=> {
		if(!name || !startingBid || !startTime || !endTime) {
			toast.error("Please fill all fields.");
			return;
		  }
		let user:string | null | undefined= localStorage.getItem('user');
		if(user) {
			const userData: LoginUserData = JSON.parse(user);
			const payload: CreatePayload = {name, startTime, endTime, startingBid, userId: userData._id}
			const {status, message} = await createItem(payload);
			if(status) {
				toast.success(message);
				navigate('/draft-items');
			} else {
				toast.error(message);
			}
		}
    }
	return (
		<section className="create-item-form">
			<Container>
				<div className="item-detail-holder">
					<Row>
						<Col>
							<h1 className="mb-3 mtp0">Create Item</h1>
						</Col>
					</Row>
					<Form className="app-form">
						<Row>
							<Col md="6">
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Name</label>
									<input className="form-control" type="text" onChange={(e: FormEvent<HTMLInputElement>)=>setName(e.currentTarget.value)} value={name}/>
								</Form.Group>
							</Col>
							<Col md="6">
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Start Time</label>
									<Datetime value={startTime} onChange={(value:any)=>setStartTime(value.toDate())}/>
								</Form.Group>
							</Col>
							<Col md="6">
								<Form.Group className="mb-3">
									<label className="d-block mb-1">End Time</label>
									<Datetime value={endTime} onChange={(value:any)=>setEndTime(value.toDate())}/>
								</Form.Group>
							</Col>
							<Col md="6">
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Minimum Bid</label>
									<input className="form-control" type="number" onChange={(e: FormEvent<HTMLInputElement>)=>setstartingBid(e.currentTarget.value)} value={startingBid}/>
								</Form.Group>
							</Col>
							<Col md="6">
								<Form.Group className="mb-3">
									<Link to="/draft-items" className="btn btn-secondary me-2 mb-2">
										Cancel
									</Link>
									<Button className="me-2 mb-2" variant="primary" onClick={()=>createAnItem()}>
										Create Item
									</Button>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</div>
			</Container>
		</section>
	);
}
export default CreateItem;