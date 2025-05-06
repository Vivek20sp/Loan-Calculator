# Loan Calculator

A modern, single-page loan calculator web application built with React JS and Material UI.

## 🚀 Live Demo

[Check out the live demo](https://loan-and-emi-calculator-app.netlify.app/)

## ✨ Features

- **Loan EMI calculation** using standard financial formulas
- **Dynamic amortization schedule table** with monthly breakdown
- **Real-time currency conversion** of EMI using live exchange rates
- **Paginated exchange rate table** for 160+ currencies
- **Dark/Light mode toggle** for a customizable experience
- **Collapsible header navigation** on mobile screens
- **Fully responsive UI** built with Material UI

## 🧮 EMI Formula Used

The EMI (Equated Monthly Installment) is calculated using the standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

Where:
- P = Principal loan amount
- R = Monthly interest rate (annual rate / 12 / 100)
- N = Loan duration in months

## 🌐 Currency Conversion API

This app integrates with the free tier of the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch live exchange rates.

API Endpoint Example:
https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD

> ⚠️ For any currency conversion feature to work, make sure the API key is valid and your network allows external API calls.

## 🛠️ Technologies Used

- **React** (Hooks, Routing, Context API)
- **Material UI** for styling and responsive components
- **Axios** for API calls
- **Exchange Rate API** for real-time currency conversion

## 📋 Application Structure

The application follows a modular structure

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/loan-calculator.git
   cd loan-calculator
   
2. Install dependencies:
   ```bash
   npm install
    or
   yarn install
   
3. Create a .env file in the root directory and add your API key:
   ```bash
   REACT_APP_API_KEY=your_api_key_here
   
4. Start the development server:
   ```bash
   npm start
   or
   yarn start

5. Open http://localhost:3000 to view it in the browser.

6. Building for Production
   ```bash
   npm run build
    # or
   yarn build

## 📱 Responsive Design
The application is fully responsive and works on all screen sizes:

- Desktop view with full navigation
- Tablet view with optimized layout
- Mobile view with collapsible header navigation

## 🌓 Theme Support

- Light mode for standard viewing
- Dark mode for reduced eye strain and battery consumption
- Theme preference saved in browser storage

## 🔒 Error Handling

- Graceful UI fallbacks for API failures
- Comprehensive error boundaries
- 404 page for unmatched routes

## 🧪 Testing
-  Run the test suite with:
    ```bash
    npm test
    # or
    yarn test

## 📄 License
- This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- ExchangeRate-API for providing the currency conversion service
- Material UI for the component library
- React for the frontend framework

## 👨‍💻 Development Notes

- Make sure to commit regularly with clear messages
- The code is modular, reusable, and well-structured
- Custom React hooks are used for logic separation
- Context API is used for global state management (theme, currency)
