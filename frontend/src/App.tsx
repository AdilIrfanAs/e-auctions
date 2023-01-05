import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import ActiveBids from "./views/active-bids/ActiveBids";
import CreateItem from "./views/create-item/CreateItem";
import CompletedBids from "./views/completed-auctions/CompletedBids";
import DraftItems from "./views/draft-auctions/DraftItems";
import FutureItems from "./views/future-auctions/FutureItems";
import ItemDetail from "./views/auction-detail/ItemDetail";
import './App.css';

function App() {
	return (
		<React.Fragment>
			<Router>
				<Header />
				<Toaster />
				<Routes>
					<Route path="/" element={<CompletedBids />} />
					<Route path="/active-bids" element={<ActiveBids />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/create" element={<CreateItem />} />
					<Route path="/item-detail/:id" element={<ItemDetail />} />
					<Route path="/draft-items" element={<DraftItems />} />
					<Route path="/future-items" element={<FutureItems />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}
export default App;