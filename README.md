# OPTIKART - A React E-Commerce Web App

OPTIKART is an E-Commerce web application developed using Node, MongoDB, Express, React and REST APIs. It provides a platform for users to buy and sell products in a seamless and user-friendly manner.

## Key Features

- User authentication and authorization
- Product listing and management
- User cart and checkout functionality
- Order tracking and management
- Admin dashboard for product and order management

## Tech Stack

- Node.js
- MongoDB
- Express
- React
- REST APIs

## Prerequisites

- Node.js and npm installed on your local machine
- A MongoDB Atlas account

## Getting Started

1. Clone the repository to your local machine
   https://github.com/harshiilllll/optikart.git

2. Change into the project directory
   cd optikart-main

3. Install the required packages
   npm install

4. Create a .env file in the following directories and configure the following environment variables:

### admin

PORT=<YOUR-PORT-YOU-WANT-TO-RUN-ADMIN>
FIREBASE_API=<YOUR-FIREBASE-SECRET-API-KEY>

### api

MONGO_URL=<YOUR-MONGODB-URL>
SECRET_KEY=<YOUR-SECERET-KEY>
STRIPE_KEY=<YOUR-STRIPE-SECRET-KEY>

5. Start the server
   `cd api`
   `npm start`

Start the client
`cd client`
`npm start`

Start the admin
`cd admin`
`npm start`

6. Open your web browser and navigate to http://localhost:3000

## Contributing

1. Fork the repository
2. Create a new branch with a descriptive name
3. Make your changes and commit
4. Push your changes to your fork
5. Submit a pull request to the development branch of the original repository
