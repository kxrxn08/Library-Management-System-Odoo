# Library Management System

## Project Description

![library-management-system](https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2023/02/30120325/Top-5-Benefits-of-Library-Management-System-for-Education.png)

The Library Management System is a comprehensive web application designed to efficiently manage book inventories, track borrower details, and handle transactions. With role-based access control for Admins, Librarians, and Users, it offers features such as book inventory management, borrowing system, search and recommendations, notifications, and reporting, ensuring a seamless experience for all users.

## Table of Contents

- [Project Description](#project-description)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Admin](#admin)
  - [Librarian](#librarian)
  - [User](#user)

## Features

### User Management
- **Login/Logout Functionality:** Secure login and logout for Admins, Librarians, and Users.
- **Role-based Access Control:** Different roles with specific access and functionalities (Admin, Librarian, User).

### Book Inventory Management
- **CRUD Operations:** Add, update, delete, and search for books.
- **Book Details:** Manage details like ISBN, title, author, publisher, year, genre, and quantity.
- **Real-time Availability:** Check the real-time availability status of books.

### Borrowing System
- **Checkout Process:** Manage the borrowing process, including selecting books and assigning them to users.
- **Return Process:** Handle book returns, calculate due dates, and apply late fees.
- **History Tracking:** Keep track of each user's borrowed and returned books.

### Search and Recommendations
- **Advanced Search:** Search books by title, author, genre, and other criteria.
- **Recommendations:** Provide book recommendations based on user history or popular trends.

### Notifications and Alerts
- **Due Date Notifications:** Send email or SMS notifications for upcoming due dates.
- **New Arrivals Alerts:** Notify users about new book arrivals.
- **Overdue Alerts:** Alert users about overdue books and outstanding fees.

### Reporting
- **Usage Reports:** Generate detailed reports on book usage.
- **Overdue Items Reports:** Report on overdue books.
- **User Activity Reports:** Monitor user activity including borrowing and returning of books.
- **Dashboard:** Real-time statistics for admins and librarians.

## Tech Stack

**Frontend:**
- React
- Redux
- Material-UI (MUI)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Authentication:**
- JWT (JSON Web Tokens)
- OAuth

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the `backend` directory and add the following:

     ```plaintext
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

   - Create a `.env` file in the `frontend` directory if needed and add any necessary environment variables.

5. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server:**

   ```bash
   cd ../frontend
   npm start
   ```

7. **Open your browser and navigate to:**

   ```plaintext
   http://localhost:3000
   ```

## Usage

### Admin

- **Login:** Use your admin credentials to log in.
- **Manage Users:** Add, update, or remove users (Librarians and Users).
  - **Add User:** Fill in user details such as username, password, and role.
  - **Update User:** Modify existing user details.
  - **Delete User:** Remove users from the system.
- **Manage Books:** Add, update, or remove books from the inventory.
  - **Add Book:** Enter book details such as ISBN, title, author, publisher, year, genre, quantity, and rack number.
  - **Update Book:** Modify existing book details.
  - **Delete Book:** Remove books from the inventory.
- **View Reports:** Access detailed reports on book usage, overdue items, and user activity.
  - **Usage Reports:** Analyze book usage trends.
  - **Overdue Reports:** Identify and manage overdue items.
  - **User Activity Reports:** Monitor and evaluate user interactions with the system.

### Librarian

- **Login:** Use your librarian credentials to log in.
- **Manage Books:** Add, update, or remove books from the inventory.
  - **Add Book:** Enter book details such as ISBN, title, author, publisher, year, genre, quantity, and rack number.
  - **Update Book:** Modify existing book details.
  - **Delete Book:** Remove books from the inventory.
- **Borrowing System:** Process book checkouts and returns, including due dates and late fees.
  - **Checkout Books:** Assist users in borrowing books, setting due dates, and recording the transaction.
  - **Return Books:** Handle the return process, update book availability, and calculate late fees if applicable.
- **Notifications:** Send notifications for due dates, new arrivals, etc.
  - **Due Date Reminders:** Notify users of upcoming due dates via email or SMS.
  - **New Arrivals Alerts:** Inform users about newly added books.
  - **Overdue Alerts:** Alert users about overdue books and outstanding fees.

### User

- **Login:** Use your user credentials to log in.
- **Search Books:** Search for books by title, author, genre, etc.
  - **Advanced Search:** Utilize filters to find books based on specific criteria.
- **Borrow Books:** Checkout books and view your borrowing history.
  - **Checkout Books:** Select books to borrow and view the due date.
  - **Borrowing History:** Access a history of all borrowed and returned books.
- **Receive Notifications:** Get email or SMS notifications for due dates, new arrivals, etc.
  - **Due Date Reminders:** Receive notifications for upcoming due dates.
  - **New Arrivals Alerts:** Stay informed about new book additions.
  - **Overdue Alerts:** Get alerts for overdue books and outstanding fees.
- **Recommendations:** Get book recommendations based on your borrowing history or popular trends.
  - **Personalized Recommendations:** View book suggestions tailored to your reading habits.
  - **Popular Trends:** Discover books that are currently trending in the library.
