import {useEffect, useState, FormEvent} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { login } from '../../actions/auth.actions';
import {LoginPayload, LoginResponse} from '../../interfaces-types/auth'
import { setUser } from '../../redux/slices/user.slice';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState<any>('')
	const [password, setPassword] = useState<any>('')
	useEffect(()=>{
		
	},[])
	const loginUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload: LoginPayload = {
			email, password
		}
		const {status, message, data}: LoginResponse = await login(payload);
		if(status) {
			toast.success(message);
			localStorage.setItem('user', JSON.stringify(data));
			dispatch(setUser(data));
			navigate('/draft-items');
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
							<h3 className="item-name d-block mb-3">Login</h3>
							<Form className="app-form login-form"  onSubmit={(e)=>loginUser(e)}>
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Email</label>
									<input className="form-control" type="text" onChange={(e: FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} value={email}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<label className="d-block mb-1">Password</label>
									<input className="form-control" type="password" onChange={(e: FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} value={password}/>
								</Form.Group>
								<Form.Group className="mb-3">
									<Button variant="primary" type='submit'>
										Login
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
export default Login;