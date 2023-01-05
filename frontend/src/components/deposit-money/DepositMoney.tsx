import React, { useState, FormEvent } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import toast from 'react-hot-toast';
import {createPayment} from '../../actions/payments.actions'
import {LoginUserData} from '../../interfaces-types/auth'
import {CreatePayload} from '../../interfaces-types/payment'

function DepositMoney(props: any) {
    const [amount, setAmount] = useState('');
    const depositMoney = async ()=> {
		if(!parseInt(amount)) {
			return toast.error("Please enter valid amount");
		}

		let user:string | null | undefined= localStorage.getItem('user');
		if(user) {
			const userData: LoginUserData = JSON.parse(user);
			const payload: CreatePayload = {amount: parseInt(amount), userId: userData._id}
			const {status, message} = await createPayment(payload);
			if(status) {
				toast.success(message);
			} else {
				toast.error(message);
			}
		}
		props.toggleDepositPopup(false)
    }
	return (
			<Modal show={props.show}>
				<Modal.Header>
					<Modal.Title>Deposit Amount</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="app-form create-item-form">
						<Form.Group className="mb-3">
							<label className="d-block mb-1">Amount</label>
							<input className="form-control" type="text" value={amount} onChange={(e: FormEvent<HTMLInputElement>)=>setAmount(e.currentTarget.value)}/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={()=>props.toggleDepositPopup(false)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={()=>depositMoney()}>
						Deposit Amount
					</Button>
				</Modal.Footer>
			</Modal>
	);
}
export default DepositMoney;