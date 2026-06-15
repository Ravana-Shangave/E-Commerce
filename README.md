# ShopSphere - E-Commerce Application

A complete full-stack e-commerce web application built with Next.js 15, TypeScript, MongoDB, Stripe, and modern web technologies.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT
- Google OAuth integration
- Email verification
- Forgot password and reset password
- Role-based access control (Admin and Customer)

### Customer Features
- Home page with hero section, featured products, and categories
- Product listing with pagination
- Advanced search and filtering
- Product details with image gallery
- Product reviews and ratings
- Wishlist functionality
- Shopping cart
- Stripe payment integration
- Order tracking
- User profile management

### Admin Dashboard
- Analytics dashboard with key metrics
- Product management (CRUD)
- Category management
- Order management
- User management
- Coupon management
- Inventory management
- Low stock alerts

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe
- **Image Management**: Cloudinary
- **Form Validation**: React Hook Form, Zod
- **State Management**: React Context
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Cloudinary account
- Google OAuth credentials

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ravana-Shangave/E-Commerce.git
cd E-Commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
E-Commerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (customer)/        # Customer routes
│   │   ├── (admin)/           # Admin dashboard
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── common/            # Common components
│   │   ├── forms/             # Form components
│   │   ├── admin/             # Admin components
│   │   └── ui/                # ShadCN UI components
│   ├── lib/                   # Utility functions
│   ├── actions/               # Server actions
│   ├── models/                # Mongoose models
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   ├── providers/             # React providers
│   ├── services/              # External services
│   └── styles/                # Global styles
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📚 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product details
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/[id]` - Update cart item
- `DELETE /api/cart/[id]` - Remove from cart

## 🎨 Customization

The project uses ShadCN UI components which can be customized via `tailwind.config.ts`.

## 🚀 Deployment

This project is ready to be deployed on Vercel:

```bash
npm run build
npm run start
```

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Ravana Shangave

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
