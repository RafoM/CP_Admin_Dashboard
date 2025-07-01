# Admin Dashboard

## Setup

1. Copy `.env.example` to `.env` and adjust `REACT_APP_API_URL`.
2. Run `npm install` to install dependencies.
3. Use `npm start` to run the development server.

This project uses React, Redux Toolkit, Redux Saga and Axios. Styles are written with SASS and React Router DOM v6 is used for routing. The Redux store is configured in `src/redux/store.js` with slices for authentication, UI state and users. Sagas handle asynchronous API calls through the `src/sagas` directory.
