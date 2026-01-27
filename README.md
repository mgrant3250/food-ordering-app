# Food Ordering App

A full-stack food ordering application built with React, Redux, Node.js, Express, MongoDB, and Stripe. Users can browse the menu, customize orders, and pay online. Admins can manage menu items, orders, update user roles or delete users.

## Features

- Browse entrees, sides, drinks, and sauces
- Add items to cart and customize options
- Secure authentication with JWT (register, login, forgot/reset password)
- Stripe payment integration
- Admin dashboard for managing menu items, orders, and users
- Admin can add/update menu items with image uploads (handled via Multer)
- Responsive design for desktop and mobile
- Toast notifications for feedback


## Tech Stack

- **Frontend:** React, Redux, React Router, React-Toastify
- **Backend:** Node.js, Express, Multer (file uploads)
- **Database:** MongoDB, Mongoose
- **Payments:** Stripe
- **Authentication:** JWT
- **Testing:** Vitest, React Testing Library

## Installation

### Clone the repo
```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app

# frontend
cd client
npm install

# backend
cd ../server
npm install


PORT=your_port_number
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000

# frontend
npm run dev

# backend
npm start
```


## License

This project is proprietary. You may not use or distribute the code without permission.

