# 🛒 JAMR Store - Proyecto Final

E-commerce completo de productos tecnológicos con frontend en React y backend en Node.js.

## 📁 Estructura del Proyecto

```
Integrador-Final-Backend/
├── backend/              # API REST con Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/      # Configuración de base de datos
│   │   ├── models/      # Modelos de Mongoose
│   │   ├── routes/      # Rutas de la API
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── middleware/  # Autenticación y manejo de errores
│   │   └── utils/       # Utilidades y validaciones
│   ├── package.json
│   ├── vercel.json
│   └── README.md
│
├── src/                 # Frontend React
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── routes/
├── public/
├── package.json
└── README.md (este archivo)
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de UI
- **Redux Toolkit** - Manejo de estado global
- **React Router** - Navegación
- **Formik + Yup** - Formularios y validación
- **Styled Components** - Estilos
- **Framer Motion** - Animaciones
- **EmailJS** - Envío de emails
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Swagger** - Documentación de API
- **Helmet** - Seguridad
- **CORS** - Control de acceso

## 📋 Características

### Frontend
- ✅ Catálogo de productos con filtros por categoría
- ✅ Carrito de compras con localStorage
- ✅ Sistema de autenticación (Login/Register)
- ✅ Proceso de checkout completo
- ✅ Formulario de contacto con EmailJS
- ✅ Notificaciones toast personalizadas
- ✅ Modales de confirmación e información
- ✅ Diseño responsive
- ✅ Animaciones con Framer Motion

### Backend
- ✅ API REST completa
- ✅ Autenticación con JWT
- ✅ CRUD de productos
- ✅ Gestión de órdenes
- ✅ Sistema de contacto
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Documentación con Swagger
- ✅ Rate limiting
- ✅ Seguridad con Helmet y CORS

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/integrador-final-backend.git
cd integrador-final-backend
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/`:

```env
MONGODB_URI=tu_mongodb_connection_string
JWT_SECRET=tu_clave_secreta_jwt
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

📖 **Guía completa**: Ver `backend/MONGODB_SETUP.md` para configurar MongoDB Atlas

Poblar la base de datos:
```bash
npm run seed
```

Iniciar el servidor:
```bash
npm run dev
```

El backend estará en: `http://localhost:5000`  
Documentación API: `http://localhost:5000/api-docs`

### 3. Configurar el Frontend

```bash
# Desde la raíz del proyecto
npm install
```

Crea un archivo `.env` en la raíz:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_API_URL=http://localhost:5000/api
```

Iniciar el frontend:
```bash
npm run dev
```

El frontend estará en: `http://localhost:5173`

## 📚 Documentación

- **API Documentation**: `backend/API_DOCUMENTATION.md`
- **MongoDB Setup**: `backend/MONGODB_SETUP.md`
- **Vercel Deploy**: `backend/VERCEL_DEPLOY.md`
- **Backend README**: `backend/README.md`

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (protegido)

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `GET /api/products/category/:category` - Productos por categoría

### Órdenes
- `POST /api/orders` - Crear orden (protegido)
- `GET /api/orders` - Mis órdenes (protegido)
- `GET /api/orders/:id` - Detalle de orden (protegido)

### Contacto
- `POST /api/contact` - Enviar formulario

📖 **Documentación completa**: `http://localhost:5000/api-docs`

## 🚀 Deploy

### Backend en Vercel

```bash
cd backend
vercel --prod
```

📖 **Guía completa**: Ver `backend/VERCEL_DEPLOY.md`

### Frontend en Vercel

```bash
# Desde la raíz
vercel --prod
```

Configurar variables de entorno en Vercel:
- `VITE_API_URL`: URL del backend deployado
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## 🧪 Testing

### Probar el Backend

1. **Con Swagger UI**: `http://localhost:5000/api-docs`
2. **Con cURL**:
   ```bash
   curl http://localhost:5000/api/products
   ```
3. **Con Postman**: Importar la colección desde Swagger

### Probar el Frontend

1. Abrir `http://localhost:5173`
2. Navegar por las diferentes páginas
3. Probar el flujo completo:
   - Registrarse
   - Ver productos
   - Agregar al carrito
   - Hacer checkout
   - Enviar formulario de contacto

## 📦 Scripts Disponibles

### Frontend
```bash
npm run dev      # Iniciar en desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

### Backend
```bash
npm run dev      # Iniciar con nodemon
npm start        # Iniciar en producción
npm run seed     # Poblar base de datos
```

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- Tokens JWT con expiración de 30 días
- Rate limiting: 100 requests/15min por IP
- CORS configurado
- Helmet para headers de seguridad
- Validación de inputs en todos los endpoints

## 📝 Variables de Entorno

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=clave_super_secreta
PORT=5000
NODE_ENV=development|production
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
```

## 🐛 Troubleshooting

### Backend no conecta a MongoDB
- Verifica que `MONGODB_URI` sea correcto
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
- Verifica que el usuario tenga permisos de lectura/escritura

### Frontend no se comunica con Backend
- Verifica que `VITE_API_URL` apunte al backend correcto
- Asegúrate de que el backend esté corriendo
- Verifica la configuración de CORS en el backend

### Error de autenticación
- Verifica que `JWT_SECRET` sea el mismo en desarrollo y producción
- Asegúrate de incluir el token en el header: `Authorization: Bearer token`

## 📧 Contacto

Para más información sobre el proyecto, consulta la documentación o abre un issue en GitHub.

## 📄 Licencia

ISC

---

## 🎯 Entregables

### Para la Corrección

1. **Link del Backend Deployado**: `https://tu-backend.vercel.app`
2. **Link del Frontend Deployado**: `https://tu-frontend.vercel.app`
3. **Repositorio GitHub Backend**: `https://github.com/tu-usuario/backend`
4. **Repositorio GitHub Frontend**: `https://github.com/tu-usuario/frontend`
5. **Documentación de API**: Accesible en `/api-docs` del backend
6. **Variables de Entorno**: Incluidas en `.env.example` (sin valores reales)

### Documentación Incluida

- ✅ README principal (este archivo)
- ✅ README del backend
- ✅ Documentación completa de API
- ✅ Guía de configuración de MongoDB Atlas
- ✅ Guía de deploy en Vercel
- ✅ Swagger/OpenAPI documentation

### Endpoints Documentados

Todos los endpoints están documentados en:
- `backend/API_DOCUMENTATION.md` (formato Markdown)
- `http://localhost:5000/api-docs` (Swagger UI interactivo)

---

**Desarrollado para NUCBA - Entrega Final Backend** 🚀
