# E-Commerce Footwear Website

## Overview
This is a full-stack eCommerce website for footwear shopping. The platform allows users to browse products, add them to the cart, make purchases, and manage their profiles. The website features a MySQL database with Sequelize ORM for efficient data management, a Node.js and Express.js backend for API handling, and a React.js frontend for an interactive user experience.

## Features
- User authentication (signup, login, logout)
- Product catalog with filtering and sorting
- Shopping cart and checkout functionality
- Order management
- Admin dashboard for product and order management
- Secure payments integration
- Responsive design for mobile and desktop users

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT-based authentication
- **Payment Gateway:** Stripe
- **Deployment:** Docker

---

## Installation Guide

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```sh
git clone https://github.com/https://github.com/Guranshsingh5911/footwear-ecomm.git
cd ecommerce-footwear
```

### 2. Setup Backend
#### Navigate to backend directory:
```sh
cd backend
```
#### Install dependencies:
```sh
npm install
```
#### Configure environment variables:
Create a `.env` file in the `backend` folder and add the following:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
JWT_SECRET=your-secret-key
```
#### Run database migrations:
```sh
npx sequelize db:migrate
```
#### Start the backend server:
```sh
npm start
```
Backend will run on `http://localhost:5000`.

---

### 3. Setup Frontend
#### Navigate to frontend directory:
```sh
cd ../frontend
```
#### Install dependencies:
```sh
npm install
```
#### Configure environment variables:
Create a `.env` file in the `frontend` folder and add:
```
REACT_APP_API_URL=http://localhost:5000
```
#### Start the frontend server:
```sh
npm start
```
Frontend will run on `http://localhost:3000`.

---

## Running the Application
Once both the frontend and backend servers are running, open your browser and visit:
```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | /api/get-all-product | Fetch all products        |
| GET    | /api/products/:id    | Fetch a single product    |
| POST   | /api/auth/register   | Register a new user       |
| POST   | /api/auth/login      | Login user                |
| POST   | /api/create-product  | Add item to cart          |
| GET    | /api/orders          | Fetch user orders         |
| PUT    | /api/update-product/:id | Update product details |
| DELETE | /api/delete-product/:id | Delete a product       |

## Deployment
### **Docker Deployment**
To deploy the project using Docker:
1. Ensure Docker is installed.
2. Navigate to the project root.
3. Run the following command:
```sh
docker-compose up --build -d
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
