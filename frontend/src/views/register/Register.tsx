import {useEffect, useState, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { register } from '../../actions/auth.actions';
import {RegisterPayload, RegisterResponse} from '../../interfaces-types/auth'

function Register() {
	const [name, setName] = useState<any>('')
	const [email, setEmail] = useState<any>('')
	const [password, setPassword] = useState<any>('')
	const navigate = useNavigate();
	useEffect(()=>{
		
	},[])
	const registerUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(!name.trim() || !email.trim() || !password.trim()) {
			toast.error('Please fill all fields.');
			return ;
		}
		const payload: RegisterPayload = {
			name, email, password
		}
		const {status, message}: RegisterResponse = await register(payload);
		if(status) {
			toast.success(message);
			navigate('/login');
		} else {
			toast.error(message);
		}
	}

	return (
		<section className="item-detail">
			<Container>
				<div className="auth-form">
					<Row>
						<Col>
							<h3 className="item-name d-block mb-3">Register</h3>
							<Form className="app-form login-form" onSubmit={(e)=>registerUser(e)}>
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Name</label>
									<input className="form-control" type="text" onChange={(e: FormEvent<HTMLInputElement>)=>setName(e.currentTarget.value)} value={name}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Email</label>
									<input className="form-control" type="email" onChange={(e: FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} value={email}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Password</label>
									<input className="form-control" type="password" onChange={(e: FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} value={password}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<Button variant="primary" type='submit'>
										Register
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</div>
			</Container>
		</section>
	);
}
export default Register;