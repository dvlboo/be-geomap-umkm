# Geomap UMKM API

Backend API for Geomap UMKM (Micro, Small, and Medium Enterprises) web application that enables UMKM data management with geographical location and social media integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)
- [Request Examples](#request-examples)

## ✨ Features

- ✅ UMKM CRUD operations (Create, Read, Update, Delete)
- ✅ Upload product and place images to Cloudinary
- ✅ Geographic location management (latitude, longitude)
- ✅ Social media management for UMKM
- ✅ Auto-generate slug from UMKM name
- ✅ Soft delete (paranoid mode)
- ✅ File upload with express-fileupload
- ✅ Optimized updates (skip if data is unchanged)

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **File Upload:** Express-FileUpload
- **Cloud Storage:** Cloudinary
- **Authentication:** JWT (JSON Web Token)
- **Email:** Nodemailer

## 📦 Installation

1. Clone repository:
```bash
git clone https://github.com/dvlboo/be-geomap-umkm.git
cd be-geomap-umkm/api
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration

1. Create `.env` file in root folder:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=geomap_umkm
DB_USER=postgres
DB_PASSWORD=your_password

# Server
PORT=3001

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_jwt_secret

# Email (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

2. Adjust configuration in `config/sequelize.js` if needed.

## 🗄️ Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE geomap_umkm;
```

2. Run migrations:
```bash
npx sequelize db:migrate
```

3. (Optional) Run seeders:
```bash
npx sequelize db:seed:all
```

## 🚀 Running the Server

### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will run at `http://localhost:3001`

## 📡 API Endpoints

### Base URL: `/api`

### UMKM Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new UMKM |
| GET | `/` | Get all UMKM |
| GET | `/:id` | Get UMKM by ID |
| PUT | `/:id` | Update UMKM |
| DELETE | `/:id` | Delete UMKM |

## 📊 Database Structure

### Table: `umkms`
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| name | STRING | UMKM name |
| owner | STRING | Owner name |
| phone | STRING | Phone number |
| address | STRING | Full address |
| regency | STRING | Regency/District |
| story | TEXT | UMKM story |
| year | INTEGER | Established year |
| place_pict | TEXT | Place image URL |
| product_pict | TEXT | Product image URL |
| classification | STRING | Business classification |
| type | STRING | UMKM type |
| order | STRING | Order method |
| payment | STRING | Payment method |
| location_id | INTEGER | FK to locations table |
| slug | STRING | URL-friendly name |

### Table: `locations`
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| longitude | FLOAT | Longitude coordinate |
| latitude | FLOAT | Latitude coordinate |

### Table: `medsos`
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| umkm_id | INTEGER | FK to umkms table |
| platform | STRING | Social media platform |
| username | STRING | Username |
| url | TEXT | Profile URL |

## 📝 Request Examples

Full API documentation and Postman collection: [Postman API Docs](https://documenter.getpostman.com/view/44615298/2sB3WmSMhA)

## 🔐 Update Optimization

This API has optimization for updates:

1. **Location:** Only updates if coordinates change
2. **Medsos:** Only destroy/create if data changes
3. **Images:** Only upload if new files are sent

This saves database operations and improves performance.

## 📁 Folder Structure

```
api/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   └── sequelize.js        # Database configuration
├── migrations/             # Database migrations
├── models/                 # Sequelize models
│   ├── auth.js
│   ├── location.js
│   ├── medsos.js
│   ├── type.js
│   ├── umkm.js
│   └── umkm_type.js
├── seeders/               # Database seeders
├── src/
│   ├── auth/              # Auth module
│   ├── routes/            # Route definitions
│   └── umkm/              # UMKM module
│       ├── location/
│       │   └── location.repository.js
│       ├── umkm.controller.js
│       ├── umkm.repository.js
│       ├── umkm.routes.js
│       └── umkm.services.js
├── temp/                  # Temporary upload folder
├── utils/                 # Utility functions
│   ├── cloudinary.js
│   ├── jwtoken.js
│   └── mailer.js
├── .env                   # Environment variables
├── index.js               # Entry point
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
