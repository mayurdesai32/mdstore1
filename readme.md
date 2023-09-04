# MDSTORE (mern) :- Ecommerce Website

## 1. Introduction

### Purpose

MDSTORE is a full-fledged eCommerce website developed using the MERN stack (MongoDB, Express, React, Node.js). It offers a wide range of features for users and administrators to manage products, orders, and user roles. The website also integrates with the Stripe payment gateway for seamless online transactions.

### Features

#### User Authentication

- Users can create accounts, log in, and log out.
- Authentication is secure and customizable.
- Admins have access to user management features.

#### Product Management

- Users can view product listings and product details.
- Users can add products to their cart.
- Admins can add, edit, and delete products.

#### Shopping Cart

- Users can manage their shopping carts.
- Cart items are saved across sessions.
- Users can place orders from their carts.

#### Orders

- Users can place and track orders.
- Admins can change the order status.

#### Product Comments

- Users can leave comments and reviews on products.

#### Admin Panel

- Admins have access to an admin panel for product and user management.
- Admins can change user roles (e.g., promote regular users to admins).
- Admins can manage product listings, including adding, editing, and deleting products.
- Admins can change the order status for user orders.

#### Payment Gateway

- Integration with the Stripe payment gateway for secure online payments.

### Technologies Used

- Frontend: ReactJS, HTML, SCSS,redux-thunk
- Backend: Node.js, Express, mongoose
- Database: MongoDB
- Payment-Gateway: Stripe
- Other: Axios, sendgrid, Bcrypt, Cors

### Env Variable

#### Create new folder name env

#### 1.Inside env folder create filename backend.env with following detail

- PORT=
- DBURI=

- DOCKER= true

- PORT=

- DB_USERNAME =
- DB_PASSWORD =
- DB_CONTAINERNAME= mongodb

- MONGODB_URI=

- JWT_SECRET=

- JWT_EXPIRES_TIME=120

- cookie_EXPIRES_TIME=120000

#### 2. Inside env folder create filename mongodb.env with following detail

- MONGO_INITDB_ROOT_USERNAME=
- MONGO_INITDB_ROOT_PASSWORD=

## 2a. Installation and Setup (without docker)

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installing the App

- Install frontend dependencies: npm install (inside frontend directory)
- Install backend dependencies: npm install (inside backend directory)
- Start frontend development server: npm start (inside frontend directory)
- Start backend server: npm start (inside backend directory)

## 2b. Installation and Setup (via docker)

### Prerequisites

- Docker

#### Install dependencies:

##### 1st way

Go inside directory

- cd \<service folder>

To install/uninstall dependencies

- add/delete dependencies name in package.json

##### 2nd way

step1 Build image

- docker build -t \<image-name> .

step2 To install/uninstall dependencies

- docker run -it -v \<servicelocation>:/app \<image-name> install \<dependencies name>

### Using docker compose

#### To start the application

- docker compose up

#### To stop the application

- docker compose down

#### For list of container

- docker container ps
- docker container ps -a

#### To check the log of container

- docker logs \<container-name>

#### To check the log attach container

- docker logs -f \<container-name>
