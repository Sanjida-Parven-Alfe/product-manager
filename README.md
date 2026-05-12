# Shelve - Premium Product Manager

Shelve is a full-stack product management application built with the MERN stack. It features a modern, responsive UI, secure authentication, and a robust backend for managing a product catalog with ease.

**Live Demo:** [Shelve App](https://product-manager-sigma-gray.vercel.app/)  
**Backend API:** [Shelve API](https://product-manager-x87r.vercel.app/)

![App Screenshot](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80)

## 🚀 Features

- **Authentication:** Secure Register/Login using JWT.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality.
- **Image Upload:** Integrated with Cloudinary for seamless image hosting.
- **Search & Filter:** Find products instantly with real-time search and price sorting.
- **Pagination:** Optimized data loading for large catalogs.
- **Responsive Design:** Premium UI built with Tailwind CSS, fully optimized for all screen sizes.
- **Special Offers:** Dynamic carousel for highlighting featured products.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Lucide React (Icons)
- Swiper.js (Carousels)
- Axios (API Calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (Image storage)
- JWT (Security)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sanjida-Parven-Alfe/product-manager.git
cd product-manager
```

### 2. Backend Setup
Navigate to the backend folder:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add the variables from `.env.example`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend folder:
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 Folder Structure

```text
product-manager/
├── backend/
│   ├── config/         # DB & Cloudinary config
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth & Error handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios instance
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth context
│   │   ├── hooks/      # Custom hooks
│   │   └── pages/      # Page components
```

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---
Developed by **Sanjida Parven Alfe** 🚀
