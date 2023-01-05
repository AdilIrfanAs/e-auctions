# E-Auctions

## Backend - Express, Typescript, MongoDB, Socket.io
- Backend implements the logic of the e-auctions website. It includes the API end points and sockets implementation for bidding system.
- Please follow the instructions below to setup and make the project running.

### Install Packages
```
npm install
```

### Setup .env file
- Copy the .env.example to create a .env file and change the content accordingly.

### Run for Development
```
npm run dev
```

### Build TS file
```
npm run build
```

### Run for Production
```
npm run prod
```

## Frontend - ReactJS, TypeScript, Redux Toolkit
- Frontend implements the user's side for the auctions system.
- User can:
- - Register
- - Login
- - Create Items for auction, if loggedin
- - View completed auctions
- - - An auction is marked as completed if the bid is accepted by the owner, or the time is ended
- - View thier own draft auctions, if loggedin
- - View current active auctions, if loggedin
- - View upcoming / future actions,if loggedin
- - Can place bids on the auctions, if loggedin
- - Owner can accept the bid.
- - Deposit Money
- - - In this module user can just deposit a number in the DB, and the record is created in DB, payment method is not integrated yet.

### Install Packages
```
npm install
```

### Setup .env file
- Copy the .env.example to create a .env file and change the content accordingly.

## Run for Development
```
npm start
```

## Create a static build
```
npm run build
```