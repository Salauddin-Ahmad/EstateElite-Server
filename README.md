# EstateElite

Welcome to EstateElite, a real estate platform designed to streamline the buying, selling, and managing of properties. This README will guide you through the features of the website and how to use it.

## Live Site URL
[EstateElite](https://estateelite-fdfad.web.app/)

## User Credentials for Testing
- **Admin Email**: abcdabcd@gmail.com
- **Agent Email**: agent@gmail.com
- **User Email**: user@gmail.com
- **Password for All Accounts**: 123456t@

## How to Use
- **Sign Up**: You can sign up with a new user account.
- **Login**: Use the provided credentials to log in as Admin, Agent, or User for testing purposes.

### User Actions
- **Offer an Amount**: Users can offer an amount for a property. If the agent accepts, they can proceed with the purchase.

### Agent Actions
- **Add Properties**: Agents can add new properties.
- **Manage Offers**: Agents can accept or reject offers made by users.

### Admin Actions
- **Verify Properties**: Admins can verify properties added by agents to make them visible in the "All Properties" section.
- **Manage Users**: Admins can manage users, promote normal users to admin or agent roles.
- **Manage Reviews**: Admins can manage all user reviews for properties.

## Features

- **User Management**:
  - Sign up and log in with email and password.
  - Roles: Admin, Agent, and User.
  - Admin can promote users to admin or agent.

  - Agents can add properties.
  - Admin verifies properties before they are listed.

- **Offers and Transactions**:
  - Users can make offers on properties.
  - Agents can accept or reject offers.
  - If accepted, users can proceed with the purchase.

- **Review System**:
  - Users can leave reviews for properties.
  - Admin can manage all reviews.

- **Parallax Effect on Reviews**:
  - Reviews are displayed with a parallax effect for a visually appealing experience.

- **Responsive Design**:
  - The website is designed to be responsive and works well on various devices.

## Technologies Used

### Frontend
- React
- Tailwind CSS
- Swiper.js for the parallax effect on reviews

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- Firebase Authentication

## Additional Topics

- **React Query**:
  - Used for data fetching and caching.

- **Axios**:
  - Used for making API requests.

- **SweetAlert2**:
  - Used for showing alerts and confirmations.

## Setting Up the Project Locally

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables for Firebase and MongoDB.
4. Run `npm start` to start the development server.

## Future Enhancements

- **Payment Integration**:
  - Integrate a payment gateway for processing transactions.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
