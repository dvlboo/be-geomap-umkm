# Geomap UMKM API

Backend API for Geomap UMKM (Micro, Small, and Medium Enterprises) web application that enables UMKM data management with geographical location and social media integration.

## ✨ Features

- ✅ Complete UMKM CRUD with file uploads
- ✅ JWT Authentication & Authorization
- ✅ Geographic location tracking (latitude/longitude)
- ✅ Social media integration
- ✅ Cloudinary image storage
- ✅ Email notifications (forgot password)
- ✅ Optimized updates & soft deletes
- ✅ **Interactive API Documentation (Swagger)**

## 🛠 Tech Stack

**Backend:** Node.js, Express.js | **Database:** PostgreSQL, Sequelize ORM | **Cloud:** Cloudinary | **Auth:** JWT | **Docs:** Swagger/OpenAPI

## � Quick Start

### 1. Installation
```bash
git clone https://github.com/dvlboo/be-geomap-umkm.git
cd be-geomap-umkm/api
npm install
```

### 2. Environment Setup
Create `.env` file with your configurations:
```env
DB_HOST=localhost
DB_NAME=geomap_umkm
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup
```bash
# Create database
createdb geomap_umkm

# Run migrations
npx sequelize db:migrate

# (Optional) Seed data
npx sequelize db:seed:all
```

### 4. Run Server
```bash
npm run dev
```

Server: `http://localhost:3001`

## � API Documentation

### Interactive Documentation (Swagger)
Access the complete interactive API documentation at:
```
http://localhost:3001/api-docs
```

### API Endpoints Summary

**Authentication** (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /` - Get profile (protected)
- `PUT /` - Update profile (protected)
- `DELETE /` - Delete account (protected)
- `POST /change-password` - Change password (protected)
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:id/:token` - Reset password

**UMKM** (`/api/umkm`)
- `POST /` - Create UMKM (with file upload)
- `GET /` - Get all UMKM
- `GET /:id` - Get UMKM by ID
- `PUT /:id` - Update UMKM (with file upload)
- `DELETE /:id` - Delete UMKM

### Alternative Documentation
Postman Collection: [View Docs](https://documenter.getpostman.com/view/44615298/2sB3WmSMhA)

## � Database Schema

**Main Tables:**
- `umkms` - UMKM business data
- `locations` - Geographic coordinates (latitude/longitude)
- `medsos` - Social media links
- `auths` - User authentication

**Relationships:**
- UMKM → Location (Many-to-One)
- UMKM → Medsos (One-to-Many)

## ⚡ Performance Features

- **Smart Updates:** Only updates changed data
- **Soft Deletes:** Data recovery capability
- **Optimized Queries:** Eager loading with Sequelize
- **Image Optimization:** Cloudinary auto-optimization

## 📁 Folder Structure

```
api/
├── config/
│   ├── cloudinary.js           # Cloudinary configuration
│   ├── sequelize.js            # Database configuration
|   └── swagger.js              # Swagger configuration
├── docs/
│   └── swagger.yaml            # OpenAPI/Swagger documentation
├── migrations/                 # Database migrations
├── models/                     # Sequelize models (auth, location, medsos, umkm)
├── seeders/                    # Database seeders
├── src/
│   ├── auth/                   # Authentication module
│   │   ├── auth.controller.js
│   │   ├── auth.middleware.js
│   │   ├── auth.repository.js
│   │   ├── auth.routes.js
│   │   └── auth.services.js
│   ├── routes/
│   │   └── index.js            # Main router
│   └── umkm/                   # UMKM module
│       ├── location/
│       │   └── location.repository.js
│       ├── umkm.controller.js
│       ├── umkm.repository.js
│       ├── umkm.routes.js
│       └── umkm.services.js
├── temp/                       # Temporary file uploads
├── utils/                      # Utility functions
│   ├── cloudinary.js           # Image upload utility
│   ├── jwtoken.js              # JWT token utility
│   └── mailer.js               # Email utility
├── .env                        # Environment variables
├── index.js                    # Application entry point
└── package.json
```

## 🌟 Cloudinary Folder Structure

Images will be uploaded to Cloudinary with this structure:

```
cloudinary/
└── geomap/
    ├── products/    # UMKM product images
    └── places/      # UMKM place images
```

## 👨‍💻 Author

**Khai**

---

**Commit The Struggle, Push The Progress! 🚀**
