# REST API SAVEMONEY

## Introduction

This API provides endpoints to manage users, expenses, and incomes for the SaveMoney application. Using Firebase, Firestore, and Nodejs Express.
Demo : https://savemoney-api-rdiyde43ea-uc.a.run.app/

## User Endpoints

### Register

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user with name, email, and password.
- **Parameters:**
  ```json
  {
    "email": "isallkun@bangkit.academy",
    "password": "123456789",
    "name": "Faishal Ananta Ridha"
  }
  ```

### Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user by email and password to obtain access token.
- **Parameters:**
  ```json
  {
    "email": "isallkun@bangkit.academy",
    "password": "123456789"
  }
  ```

### Logout

- **Endpoint:** `/auth/logout`
- **Method:** `GET`
- **Description:** Logout the authenticated user.

### Get All User Information

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Retrieve information for all users. (Authentication required)

### Get User

- **Endpoint:** `/api/users/me`
- **Method:** `GET`
- **Description:** Retrieve information for the authenticated user. (Authentication required)

### Update User

- **Endpoint:** `/api/users/me`
- **Method:** `PUT`
- **Description:** Update information for the authenticated user. (Authentication required)
- **Parameters:**
  ```json
  {
    "email": "isallkun@bangkit.academy",
    "name": "isallkun bangkit"
  }
  ```

### Delete User

- **Endpoint:** `/api/users/me`
- **Method:** `DELETE`
- **Description:** Delete the authenticated user. (Authentication required)

---

## Expense Endpoints

### Add Expense

- **Endpoint:** `/api/users/expense`
- **Method:** `POST`
- **Description:** Add a new expense for the authenticated user. (Authentication required)
- **Parameters:**
  ```json
  {
    "amount": "2000",
    "category": "shopping",
    "note": "pulsa byu"
  }
  ```

### Get All Expenses

- **Endpoint:** `/api/users/expense`
- **Method:** `GET`
- **Description:** Retrieve all expenses for the authenticated user. (Authentication required)

### Get Expense By ID

- **Endpoint:** `/api/users/expense/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific expense by ID for the authenticated user. (Authentication required)

### Update Expense By ID

- **Endpoint:** `/api/users/expense/:id`
- **Method:** `PUT`
- **Description:** Update a specific expense by ID for the authenticated user. (Authentication required)
- **Parameters:**
  ```json
  {
    "amount": "10000",
    "category": "shopping",
    "note": "pulsa byu"
  }
  ```

### Delete Expense By ID

- **Endpoint:** `/api/users/expense/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific expense by ID for the authenticated user. (Authentication required)

---

## Income Endpoints

### Add Income

- **Endpoint:** `/api/users/incomes`
- **Method:** `POST`
- **Description:** Add a new income for the authenticated user. (Authentication required)
- **Parameters:**
  ```json
  {
    "amount": "2000",
    "category": "salary",
    "note": "Gaji Bulanan"
  }
  ```

### Get All Incomes

- **Endpoint:** `/api/users/incomes`
- **Method:** `GET`
- **Description:** Retrieve all incomes for the authenticated user. (Authentication required)

### Get Income By ID

- **Endpoint:** `/api/users/incomes/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific income by ID for the authenticated user. (Authentication required)

### Update Income By ID

- **Endpoint:** `/api/users/incomes/:id`
- **Method:** `PUT`
- **Description:** Update a specific income by ID for the authenticated user. (Authentication required)
- **Parameters:**
  ```json
  {
    "amount": "60000",
    "category": "salary",
    "note": "Gaji Mingguan"
  }
  ```

### Delete Income By ID

- **Endpoint:** `/api/users/incomes/:id`
- **Method:** `DELETE`
- **Description:** Delete a specific income by ID for the authenticated user. (Authentication required)

---
