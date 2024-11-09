# Loan Management API
POSTMAN loan_app_APIs_customer

https://documenter.getpostman.com/view/39592422/2sAY52cKFw

POSTMAN loan_app_APIs_admin

https://documenter.getpostman.com/view/39592422/2sAY52cKFv
## Description
This is a Loan Management API that supports functionalities such as user registration, login, loan application, repayment submission, and loan approval by admins. The system is designed to manage loan requests, repayments, and user roles (customer and admin).

---

## API Endpoints

### Authentication

#### 1. Register a New User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user with `name`, `email`, `password`, and `role`.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "role": "customer"
  }
Response:
Status: 201 Created
Body:
json
Copy code
{
  "message": "User registered successfully"
}
2. User Login
Endpoint: POST /api/auth/login
Description: Allows users to log in by providing email and password. A JWT token is returned upon successful login.
Request Body:
json
Copy code
{
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:
Status: 200 OK
Body:
json
Copy code
{
  "token": "your-jwt-token",
  "role": "customer"
}
Loan Management
1. Apply for Loan
Endpoint: POST /api/loans/apply
Description: Allows a customer to apply for a loan by specifying the amount and term (in weeks).
Request Body:
json
Copy code
{
  "amount": 1000,
  "term": 12
}
Response:
Status: 201 Created
Body:
json
Copy code
{
  "amount": 1000,
  "term": 12,
  "repayments": [
    {
      "dueDate": "2024-11-15T00:00:00.000Z",
      "amount": "83.33",
      "status": "PENDING"
    }
  ],
  "status": "PENDING",
  "customer": "user-id"
}
2. Get Loans for Customer
Endpoint: GET /api/loans
Description: Fetches all loans for the authenticated customer.
Response:
Status: 200 OK
Body:
json
Copy code
[
  {
    "amount": 1000,
    "term": 12,
    "repayments": [
      {
        "dueDate": "2024-11-15T00:00:00.000Z",
        "amount": "83.33",
        "status": "PENDING"
      }
    ],
    "status": "PENDING",
    "customer": "user-id"
  }
]
3. Admin View All Loans
Endpoint: GET /api/loans/all
Description: Allows admins to view all loan requests.
Headers:
Authorization: Bearer <admin-jwt-token>
Response:
Status: 200 OK
Body:
json
Copy code
[
  {
    "amount": 1000,
    "term": 12,
    "repayments": [
      {
        "dueDate": "2024-11-15T00:00:00.000Z",
        "amount": "83.33",
        "status": "PENDING"
      }
    ],
    "status": "PENDING",
    "customer": "user-id"
  }
]
4. Approve Loan
Endpoint: PATCH /api/loans/approve/:id
Description: Admin can approve a pending loan.
Parameters:
id: Loan ID
Headers:
Authorization: Bearer <admin-jwt-token>
Response:
Status: 200 OK
Body:
json
Copy code
{
  "message": "Loan approved successfully",
  "loan": {
    "status": "APPROVED",
    "amount": 1000,
    "term": 12,
    "repayments": [
      {
        "dueDate": "2024-11-15T00:00:00.000Z",
        "amount": "83.33",
        "status": "PENDING"
      }
    ],
    "customer": "user-id"
  }
}
Repayment Management
1. Submit Repayment
Endpoint: POST /api/repayments
Description: Allows customers to submit a repayment for a loan.
Request Body:
json
Copy code
{
  "loanId": "loan-id",
  "amount": 83.33
}
Response:
Status: 200 OK
Body:
json
Copy code
{
  "message": "Repayment submitted successfully"
}
Authentication
JWT Secret: The JWT secret is set in your environment variable as JWT_SECRET.
Authentication Middleware: This API uses JWT tokens to authenticate users. To authenticate, include the token in the Authorization header as a Bearer token for protected routes.
Environment Variables
MONGODB_URI: MongoDB connection URI.
JWT_SECRET: Secret key for signing JWT tokens.
PORT: The port the server listens on (default is 5000).
Running Locally
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Create a .env file with the necessary environment variables:

bash
Copy code
MONGODB_URI=mongodb://localhost:27017/loan-management
JWT_SECRET=your-secret-key
Start the server:

bash
Copy code
npm start
Testing
For API testing, you can use tools like Postman or Insomnia. Ensure to pass the JWT token in the Authorization header for routes that require authentication.

License
This project is licensed under the MIT License.

markdown
Copy code

### How to Use This Format:
1. **Endpoints**: List each API endpoint with its method (GET, POST, PATCH, etc.).
2. **Request Body**: Include the necessary request body in JSON format.
3. **Response Body**: Provide an example response that the API will return.
4. **Authentication**: Explain how authentication works and include any JWT token requirements.
5. **Environment Variables**: Specify any required environment variables (such as MongoDB URI and JWT secret).
6. **Running Locally**: Instructions for setting up the project locally (dependencies, `.env` file, etc.).
7. **License**: Specify the license if applicable.





