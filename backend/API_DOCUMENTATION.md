# 📚 Documentación de API - JAMR Store

## Base URL

**Desarrollo**: `http://localhost:5000`  
**Producción**: `https://tu-backend.vercel.app`

## Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación. Los endpoints protegidos requieren un token en el header:

```
Authorization: Bearer tu_token_jwt_aqui
```

## Respuestas

Todas las respuestas siguen este formato:

### Éxito:
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // Solo en listados
}
```

### Error:
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [ ... ]  // Opcional, para errores de validación
}
```

---

## 🔐 Autenticación

### Registrar Usuario

**POST** `/api/auth/register`

Crea una nueva cuenta de usuario.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validaciones:**
- `name`: Requerido
- `email`: Requerido, debe ser email válido, único
- `password`: Requerido, mínimo 6 caracteres

---

### Iniciar Sesión

**POST** `/api/auth/login`

Autentica un usuario existente.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errores:**
- `401`: Credenciales inválidas

---

### Obtener Usuario Actual

**GET** `/api/auth/me`  
🔒 **Requiere autenticación**

Obtiene la información del usuario autenticado.

**Headers:**
```
Authorization: Bearer tu_token_jwt
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
```

---

## 🛍️ Productos

### Listar Todos los Productos

**GET** `/api/products`

Obtiene todos los productos disponibles.

**Query Parameters:**
- `category` (opcional): Filtrar por categoría (`audio`, `gaming`, `tech`)

**Ejemplos:**
```
GET /api/products
GET /api/products?category=gaming
```

**Response (200):**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "id": 1,
      "name": "Auriculares Gamer",
      "price": 5000,
      "category": "audio",
      "image": "/img/headphones.png",
      "description": "Sonido envolvente 7.1",
      "stock": 100,
      "createdAt": "2024-01-13T12:00:00.000Z",
      "updatedAt": "2024-01-13T12:00:00.000Z"
    },
    ...
  ]
}
```

---

### Obtener Producto por ID

**GET** `/api/products/:id`

Obtiene un producto específico por su ID numérico.

**Ejemplo:**
```
GET /api/products/1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "id": 1,
    "name": "Auriculares Gamer",
    "price": 5000,
    "category": "audio",
    "image": "/img/headphones.png",
    "description": "Sonido envolvente 7.1",
    "stock": 100
  }
}
```

**Errores:**
- `404`: Producto no encontrado

---

### Obtener Productos por Categoría

**GET** `/api/products/category/:category`

Obtiene todos los productos de una categoría específica.

**Categorías válidas:** `audio`, `gaming`, `tech`

**Ejemplo:**
```
GET /api/products/category/gaming
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 2,
      "name": "Teclado Mecánico",
      "price": 8500,
      "category": "gaming",
      ...
    },
    {
      "id": 4,
      "name": "Mouse Gamer",
      "price": 3500,
      "category": "gaming",
      ...
    }
  ]
}
```

---

## 📦 Órdenes

### Crear Orden

**POST** `/api/orders`  
🔒 **Requiere autenticación**

Crea una nueva orden de compra.

**Headers:**
```
Authorization: Bearer tu_token_jwt
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Auriculares Gamer",
      "price": 5000,
      "quantity": 2
    },
    {
      "productId": "64a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Mouse Gamer",
      "price": 3500,
      "quantity": 1
    }
  ],
  "shippingInfo": {
    "name": "Juan Pérez",
    "address": "Av. Corrientes 1234",
    "city": "Buenos Aires",
    "zip": "1043"
  },
  "totalAmount": 13500
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [ ... ],
    "shippingInfo": { ... },
    "totalAmount": 13500,
    "status": "pending",
    "createdAt": "2024-01-13T12:00:00.000Z",
    "updatedAt": "2024-01-13T12:00:00.000Z"
  }
}
```

**Validaciones:**
- `items`: Requerido, array con al menos 1 producto
- `items[].productId`: Requerido
- `items[].quantity`: Requerido, mínimo 1
- `items[].price`: Requerido, mínimo 0
- `shippingInfo.name`: Requerido
- `shippingInfo.address`: Requerido
- `shippingInfo.city`: Requerido
- `shippingInfo.zip`: Requerido
- `totalAmount`: Requerido, mínimo 0

---

### Obtener Mis Órdenes

**GET** `/api/orders`  
🔒 **Requiere autenticación**

Obtiene todas las órdenes del usuario autenticado.

**Headers:**
```
Authorization: Bearer tu_token_jwt
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
      "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "items": [
        {
          "productId": {
            "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
            "name": "Auriculares Gamer",
            "image": "/img/headphones.png"
          },
          "name": "Auriculares Gamer",
          "price": 5000,
          "quantity": 2
        }
      ],
      "shippingInfo": { ... },
      "totalAmount": 13500,
      "status": "pending",
      "createdAt": "2024-01-13T12:00:00.000Z"
    },
    ...
  ]
}
```

---

### Obtener Orden por ID

**GET** `/api/orders/:id`  
🔒 **Requiere autenticación**

Obtiene una orden específica. Solo el propietario puede ver su orden.

**Headers:**
```
Authorization: Bearer tu_token_jwt
```

**Ejemplo:**
```
GET /api/orders/64a1b2c3d4e5f6g7h8i9j0k3
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k3",
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [ ... ],
    "shippingInfo": { ... },
    "totalAmount": 13500,
    "status": "pending",
    "createdAt": "2024-01-13T12:00:00.000Z"
  }
}
```

**Errores:**
- `404`: Orden no encontrada
- `403`: No autorizado para ver esta orden

---

## 📧 Contacto

### Enviar Formulario de Contacto

**POST** `/api/contact`

Envía un mensaje de contacto.

**Request Body:**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "subject": "Consulta sobre productos",
  "message": "Hola, quisiera saber si tienen stock del producto X..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te contactaremos pronto.",
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k4",
    "name": "María García",
    "email": "maria@example.com",
    "subject": "Consulta sobre productos",
    "message": "Hola, quisiera saber si tienen stock del producto X...",
    "status": "new",
    "createdAt": "2024-01-13T12:00:00.000Z"
  }
}
```

**Validaciones:**
- `name`: Requerido
- `email`: Requerido, debe ser email válido
- `subject`: Requerido
- `message`: Requerido

---

## 🔢 Códigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error de validación o datos incorrectos
- `401 Unauthorized`: No autenticado o token inválido
- `403 Forbidden`: No autorizado para acceder al recurso
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

---

## 🧪 Ejemplos de Uso

### Con JavaScript (Fetch)

```javascript
// Registrar usuario
const register = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: '123456'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Obtener productos
const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products');
  const data = await response.json();
  console.log(data);
};

// Crear orden (requiere token)
const createOrder = async (token) => {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      items: [{ productId: '...', name: '...', price: 5000, quantity: 1 }],
      shippingInfo: { name: '...', address: '...', city: '...', zip: '...' },
      totalAmount: 5000
    })
  });
  const data = await response.json();
  console.log(data);
};
```

### Con cURL

```bash
# Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","password":"123456"}'

# Obtener productos
curl http://localhost:5000/api/products

# Crear orden (con token)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_aqui" \
  -d '{"items":[...],"shippingInfo":{...},"totalAmount":5000}'
```

---

## 📖 Documentación Interactiva

Para probar los endpoints de forma interactiva, visita:

**Swagger UI**: `http://localhost:5000/api-docs`

La documentación Swagger permite:
- Ver todos los endpoints disponibles
- Probar endpoints directamente desde el navegador
- Ver ejemplos de request/response
- Autenticarse con JWT

---

## 🔒 Seguridad

- Las contraseñas se hashean con **bcrypt** antes de guardarse
- Los tokens JWT expiran en **30 días**
- Rate limiting: **100 requests por 15 minutos** por IP
- CORS configurado para permitir solo el frontend autorizado
- Headers de seguridad con **Helmet**
- Validación de inputs en todos los endpoints

---

## 💡 Notas

- Todos los timestamps están en formato ISO 8601
- Los IDs de MongoDB son strings hexadecimales de 24 caracteres
- Los productos tienen un `id` numérico (1-6) y un `_id` de MongoDB
- El campo `stock` en productos se actualiza automáticamente (futuro)
- El estado de las órdenes puede ser: `pending`, `processing`, `completed`, `cancelled`
