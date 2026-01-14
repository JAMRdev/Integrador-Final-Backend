# JAMR Store Backend

Backend API REST para JAMR Store - E-commerce de productos tecnológicos.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Swagger** - Documentación de API

## 📋 Requisitos Previos

- Node.js 18 o superior
- MongoDB Atlas account (gratis)
- npm o yarn

## 🔧 Instalación

1. **Instalar dependencias:**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno:**

Crea un archivo `.env` en la carpeta `backend/` basado en `.env.example`:

```env
MONGODB_URI=tu_connection_string_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_super_segura
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. **Obtener MongoDB URI:**

- Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crea una cuenta gratuita
- Crea un nuevo cluster (gratis)
- Ve a "Connect" → "Connect your application"
- Copia el connection string
- Reemplaza `<password>` con tu contraseña
- Pega el string en `MONGODB_URI`

4. **Poblar la base de datos con productos:**
```bash
npm run seed
```

## 🏃 Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:5000`

## 📚 Documentación de API

Una vez que el servidor esté corriendo, accede a la documentación interactiva:

```
http://localhost:5000/api-docs
```

## 🌐 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Productos
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `GET /api/products/category/:category` - Productos por categoría

### Órdenes
- `POST /api/orders` - Crear orden (requiere token)
- `GET /api/orders` - Mis órdenes (requiere token)
- `GET /api/orders/:id` - Detalle de orden (requiere token)

### Contacto
- `POST /api/contact` - Enviar formulario de contacto

## 🔐 Autenticación

Para endpoints protegidos, incluye el token JWT en el header:

```
Authorization: Bearer tu_token_jwt
```

## 📦 Deploy en Vercel

1. **Instalar Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login en Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd backend
vercel --prod
```

4. **Configurar variables de entorno en Vercel:**

Ve a tu proyecto en Vercel Dashboard → Settings → Environment Variables y agrega:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL` (URL de tu frontend deployado)

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── models/
│   │   ├── User.js              # Modelo de Usuario
│   │   ├── Product.js           # Modelo de Producto
│   │   ├── Order.js             # Modelo de Orden
│   │   └── Contact.js           # Modelo de Contacto
│   ├── routes/
│   │   ├── auth.routes.js       # Rutas de autenticación
│   │   ├── products.routes.js   # Rutas de productos
│   │   ├── orders.routes.js     # Rutas de órdenes
│   │   └── contact.routes.js    # Rutas de contacto
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── products.controller.js
│   │   ├── orders.controller.js
│   │   └── contact.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js   # Verificación JWT
│   │   └── errorHandler.js      # Manejo de errores
│   ├── utils/
│   │   ├── validators.js        # Validaciones
│   │   └── seedProducts.js      # Script para poblar DB
│   └── app.js                   # Aplicación Express
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## 🧪 Testing

Puedes probar los endpoints usando:
- Swagger UI en `/api-docs`
- Postman
- Thunder Client (VS Code extension)
- curl

### Ejemplo con curl:

```bash
# Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Listar productos
curl http://localhost:5000/api/products
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación JWT
- Helmet para headers de seguridad
- Rate limiting para prevenir abuso
- CORS configurado
- Validación de inputs

## 📝 Notas

- El token JWT expira en 30 días
- Rate limit: 100 requests por 15 minutos por IP
- Todas las contraseñas deben tener mínimo 6 caracteres

## 🐛 Troubleshooting

**Error: Cannot connect to MongoDB**
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Verifica que el connection string sea correcto
- Verifica que la contraseña no tenga caracteres especiales sin encodear

**Error: JWT secret not defined**
- Asegúrate de tener el archivo `.env` con `JWT_SECRET`

## 📧 Contacto

Para más información, visita la documentación en `/api-docs`
