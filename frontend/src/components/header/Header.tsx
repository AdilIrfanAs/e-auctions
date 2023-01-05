import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'
import DepositMoney from '../deposit-money/DepositMoney';
import { UserStateType } from '../../interfaces-types/auth'
import { setUser, unsetUser } from '../../redux/slices/user.slice';


function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation()
	const [depositPopup, setDepositPopup] = useState(false);
	const toggleDepositPopup = (value: boolean) => setDepositPopup(value);
	const user = useSelector((state: UserStateType) => state.user);

	useEffect(() => {
		let user: string | null = localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			dispatch(setUser(user));
		}
		else {
			const currentPath = location.pathname;
			if (currentPath !== "/login" && currentPath !== "/register" && currentPath !== "/") {
				navigate("/login");
			}
		}
	}, [dispatch, location.pathname, navigate])
	const logout = () => {
		localStorage.clear();
		dispatch(unsetUser());
		navigate("/");
	}
	return (
		<React.Fragment>
			<header id="header">
				<Container className="d-flex justify-content-between align-items-center">
					<Link className="home-link" to="/">
						<span className="d-none d-sm-block">Home</span>
						<span className="d-block d-sm-none">
							<FontAwesomeIcon icon={faHouse} />
						</span>
					</Link>
					{
						user.length ?
							<>
								<Link className="home-link" to="/active-bids">
									<span className="d-none d-sm-block">Active Auctions</span>
									<span className="d-block d-sm-none">
										<FontAwesomeIcon icon={faHouse} />
									</span>
								</Link>
								<Link className="home-link" to="/future-items">
									<span className="d-none d-sm-block">Future Auctions</span>
									<span className="d-block d-sm-none">
										<FontAwesomeIcon icon={faHouse} />
									</span>
								</Link>
								<Link className="home-link" to="/draft-items">
									<span className="d-none d-sm-block">Draft Auctions</span>
									<span className="d-block d-sm-none">
										<FontAwesomeIcon icon={faHouse} />
									</span>
								</Link>
							</>
							: ""

					}
					<div className="d-flex">

						{
							user.length ?
								<>
									<Button className="ms-2" variant="primary" onClick={() => navigate('/create')}>
										<span className="d-none d-sm-block">Create Item</span>
										<span className="d-block d-sm-none">
											<FontAwesomeIcon icon={faPencil} />
										</span>
									</Button>
									<Button className="ms-2" variant="primary" onClick={() => toggleDepositPopup(true)}>
										<span className="d-none d-sm-block">Deposit Amount</span>
										<span className="d-block d-sm-none">
											<FontAwesomeIcon icon={faPlus} />
										</span>
									</Button>
									<Button className="ms-2" variant="primary" onClick={() => logout()}>
										<span className="d-none d-sm-block">Logout</span>
										<span className="d-block d-sm-none">
											<FontAwesomeIcon icon={faPlus} />
										</span>
									</Button>
								</>
								:
								<>
									<Button className="ms-2" variant="primary" onClick={() => navigate('/login')}>
										<span className="d-none d-sm-block">Login</span>
										<span className="d-block d-sm-none">
											<FontAwesomeIcon icon={faPencil} />
										</span>
									</Button>
									<Button className="ms-2" variant="primary" onClick={() => navigate('/register')}>
										<span className="d-none d-sm-block">Register</span>
										<span className="d-block d-sm-none">
											<FontAwesomeIcon icon={faPlus} />
										</span>
									</Button>
								</>
						}

					</div>
				</Container>
			</header>
			<DepositMoney show={depositPopup} toggleDepositPopup={(value: boolean) => toggleDepositPopup(value)} />
		</React.Fragment>
	);
}
export default Header;