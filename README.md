<img src="src/images/logo.png" alt="Logo" width="250" />


This project presents a modified online shopping application that adds innovative features to
enhance the efficiency and user experience in buying and selling goods online. Key
improvements over traditional platforms include a Shopping Assistant Chatbot offering
personalized support through products recommendations and comparisons to help buyers in
making informed purchasing decisions, an in-app delivery feature for simplified requesting and
tracking of local deliveries, and a user-friendly interface to support users of all demographics.
These enhancements aim to significantly improve the online shopping experience by providing
convenience, reliability, and personalized assistance at every stage of the shopping process


![Buy page](UI-screenshots/1.png)


## Developers:
This project was developed as part of the Final Year Project (FYP) at the University of Dar es Salaam (UDSM) by 
- *Henry Challo*
- *Fredrick Koka*


## Table of Contents
- [Project Gap](#project-gap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [User Interfaces ](#user-interfaces)
- [Technologies Used](#technologies-used)


## Project Gap
Epic Buy addresses gaps in traditional online shopping platforms by offering:
- A Shopping Assistant Chatbot for personalized product recommendations and comparisons based on conversations.
- An in-app local delivery feature for direct communication between sellers and delivery drivers.
- A simple and intuitive user interface designed to support users of various demographics.


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
2. Create a new branch  `git checkout -b feature-branch`
3. Commit your changes  `git commit -m 'Add new feature'`
4. Push to the branch  `git push origin feature-branch`
5. Create a pull request.


## User Interfaces

The User Interface of Epic Buy consists of several key pages:

1. **Sign-Up/Sign-In Pages:**
Allow users to register and log in to the system.

### Sign-Up  
![EpicBuy](UI-screenshots/2.png)

### Sign-In
![EpicBuy](UI-screenshots/3.png)

2. **Buy Page:**
Enables buyers to browse products, view details, and add items to their pay list.

### Buy Page
![EpicBuy](UI-screenshots/1.png)

### Product's details
![EpicBuy](UI-screenshots/4.png)

3. **Pay Page:**
Manages orders, tracks delivery, and provides purchase history.

### Pay Page
![EpicBuy](UI-screenshots/5.png)

### Track Delivery progress
![EpicBuy](UI-screenshots/6.png)

**Track delivery driver's current location on a map**
![EpicBuy](UI-screenshots/7.png)

4. **Sell Page:**
Allows sellers to post products, manage orders, and request delivery services.

### Sell Page
![EpicBuy](UI-screenshots/8.png)

### Edit profile
![EpicBuy](UI-screenshots/9.png)

### Post products
![EpicBuy](UI-screenshots/10.png)

### Manage orders
![EpicBuy](UI-screenshots/11.png)

![EpicBuy](UI-screenshots/12.png)

### Request delivery
![EpicBuy](UI-screenshots/13.png)

![EpicBuy](UI-screenshots/14.png)

![EpicBuy](UI-screenshots/15.png)

5. **Driver Page:**
Enables drivers to accept delivery requests and track routes.

### Driver's page
![EpicBuy](UI-screenshots/16.png)

### Track delivery routes
![EpicBuy](UI-screenshots/17.png)

### Edit driver's profile
![EpicBuy](UI-screenshots/18.png)

6. **Discover Page:**
Allows buyers to discover new products and interact with the Shopping Assistant Chatbot.

### Discover page
![EpicBuy](UI-screenshots/19.png)

### Search products
![EpicBuy](UI-screenshots/20.png)

### Shopping Assistant Chatbot
![EpicBuy](UI-screenshots/21.png)

![EpicBuy](UI-screenshots/22.png)

![EpicBuy](UI-screenshots/23.png)


## Technologies Used
- **Frontend:** ReactJS, HTML, CSS, JavaScript
- **Backend:** JavaScript
- **Database:** PostgreSQL
- **UI Design:** Figma
- **APIs:** Google Maps API, Firebase Authentication API
- **Version Control:** Git


---

This README provides a comprehensive guide to understanding, installing, and contributing to the "Epic Buy" online shopping application. It also details the project's innovative features and system implementation.
