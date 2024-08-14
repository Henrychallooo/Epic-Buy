
# Epic Buy - Online Shopping Web Application

![Buy page](UI-screenshots/1.png)

The rise of the internet has transformed the way we shop, leading to the rapid growth of online shopping platforms in Tanzania, Africa and world-wide. This project "Epic Buy" responds to this evolution by introducing advanced features, including a Shopping Assistant Chatbot and in-app delivery services. The Shopping Assistant helps users make informed purchasing decisions by answering questions, providing comparisons, and recommending products based on conversations. The in-app local delivery feature enables drivers to register and receive delivery requests directly from sellers to buyers, and a user-friendly interface. These enhancements aim to improve the online shopping experience by providing convenience, reliability, and personalized assistance.

## Developers:
This project was developed as part of the Final Year Project (FYP) at the University of Dar es Salaam (UDSM) by 
### - Henry Challo
### - Fredrick Koka

## Table of Contents
- [Project Gap](#project-gap)
- [System Implementation](#system-implementation)
  - [Frontend Implementation](#frontend-implementation)
  - [Backend Implementation](#backend-implementation)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Project Gap
Epic Buy addresses gaps in traditional online shopping platforms by offering:
- A Shopping Assistant Chatbot for personalized product recommendations and comparisons based on conversations.
- An in-app local delivery feature for direct communication between sellers and delivery drivers.
- A simple and intuitive user interface designed to support users of various demographics.


## System Implementation

### User Interfaces
The User Interface of Epic Buy consists of several key pages:
- **Sign-Up/Sign-In Pages:** Allow users to register and log in to the system.
- **Buy Page:** Enables buyers to browse products, view details, and add items to their pay list.
- **Pay Page:** Manages orders, tracks delivery, and provides purchase history.
- **Sell Page:** Allows sellers to post products, manage orders, and request delivery services.
- **Driver Page:** Enables drivers to accept delivery requests and track routes.
- **Discover Page:** Allows buyers to discover new products and interact with the Shopping Assistant Chatbot.

### Backend Implementation
The backend implementation involves data management and server-side functions essential for the online shopping experience, including handling user authentication, processing orders, and managing product listings.

## Technologies Used
- **Frontend:** ReactJS, HTML, CSS, JavaScript
- **Backend:** JavaScript
- **Database:** PostgreSQL
- **UI Design:** Figma
- **APIs:** Google Maps API, Firebase Authentication API
- **Version Control:** Git

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- PostgreSQL database set up and running

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Henrychallooo/Epic-Buy.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Epic-Buy
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:** Create a `.env` file in the root directory and add your environment variables (e.g., database connection, API keys).
5. **Run the application:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Usage
- **Browse Products:** Use the Buy page to browse products and add items to your pay list.
- **Manage Orders:** Use the Pay page to track delivery and review your purchase history.
- **Sell Products:** Use the Sell page to post new products and manage orders.
- **Handle Deliveries:** Drivers can accept delivery requests and track routes via the Driver page.
- **Discover New Products:** Use the Discover page to explore products and interact with the Shopping Assistant Chatbot.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.


---

This README provides a comprehensive guide to understanding, installing, and contributing to the "Epic Buy" online shopping application. It also details the project's innovative features and system implementation.
