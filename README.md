# Techpanion Assignment Reference Document

## Project Overview

This project implements a web application for managing invoice details and tracking action history using React.js for the frontend and Node.js with MongoDB for the backend.

![Screenshot 2024-07-04 005633](https://github.com/kaliprasadkunche/InvoiceManagementSystem/assets/113325469/37489921-5394-4b65-9847-08bb08dfd81a)

![Screenshot 2024-07-04 005647](https://github.com/kaliprasadkunche/InvoiceManagementSystem/assets/113325469/7426474f-f42a-4fe8-9f24-5c6e19a62ef2)


## Features

1. **Components:**
   - **Image Component:** Displays a static image on the left side of the screen.
   - **Form Component:** Captures user inputs such as Country, Bank Key, Bank Account Number, and Reference.
   - **Invoice Details Component:** Displays currency, invoice amounts, and related details.
   - **Action History Component:** Tracks and displays historical actions taken.

2. **React Components:**
   - Implemented using class-based components.
   - Utilizes lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) for managing state and API interactions.

3. **State Management:**
   - Uses local component state to manage form inputs and data.
   - Includes methods for handling form submissions, validation, and state updates.

4. **API Integration:**
   - Utilizes Axios for backend API calls.
   - Implements service files to handle API requests and responses.

5. **Styling:**
   - Styled using CSS.
   - Components styled to match provided design requirements.

## Backend (Node.js + MongoDB)

1. **Database Setup:**
   - **MongoDB:**
     - Defines models and schemas using Mongoose.
     - Collections store form data and action history.

2. **API Endpoints:**
   - **GET `/api/invoice-details`:** Retrieves invoice details from the database.
   - **POST `/api/submit-form`:** Handles form submissions, validates input, and saves data to MongoDB.
   - **GET `/api/action-history`:** Retrieves and displays historical action data.

3. **Middleware:**
   - Implements middleware for request validation, authentication (if needed), and error handling.

4. **Database Scripts:**
   - Includes scripts for creating MongoDB collections.
   - Provides sample data for initial testing.

## Setup Instructions

1. **Frontend Setup:**
   - Clone the repository.
   - Navigate to the `frontend` directory.
   - Run `npm install` to install dependencies.
   - Start the development server using `npm start`.

2. **Backend Setup:**
   - Navigate to the `backend` directory.
   - Run `npm install` to install dependencies.
   - Set up MongoDB locally or configure connection to a MongoDB instance.
   - Start the server using `npm start`.

3. **Environment Variables:**
   - Ensure environment variables are configured for MongoDB connection strings and any API keys.

## Usage

1. Open the application in your web browser.
2. Fill out the form with required details.
3. Submit the form to save data and view action history.
4. Explore different components and functionalities provided.
