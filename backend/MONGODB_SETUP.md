# 🗄️ Configuración de MongoDB Atlas

Esta guía te ayudará a configurar MongoDB Atlas (base de datos en la nube gratuita) para el backend de JAMR Store.

## Paso 1: Crear Cuenta en MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Regístrate con tu email o cuenta de Google
3. Completa el formulario de registro

## Paso 2: Crear un Cluster

1. Una vez dentro, haz clic en **"Build a Database"** o **"Create"**
2. Selecciona la opción **FREE** (M0 Sandbox)
3. Elige un proveedor cloud:
   - **AWS**, **Google Cloud**, o **Azure**
   - Selecciona la región más cercana a ti (ej: São Paulo para Argentina)
4. Dale un nombre a tu cluster (ej: `jamr-store-cluster`)
5. Haz clic en **"Create Cluster"**
6. Espera 1-3 minutos mientras se crea

## Paso 3: Configurar Acceso de Red

1. En el menú lateral, ve a **"Network Access"**
2. Haz clic en **"Add IP Address"**
3. Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Esto es para desarrollo. En producción, usa IPs específicas
4. Haz clic en **"Confirm"**

## Paso 4: Crear Usuario de Base de Datos

1. En el menú lateral, ve a **"Database Access"**
2. Haz clic en **"Add New Database User"**
3. Selecciona **"Password"** como método de autenticación
4. Ingresa:
   - **Username**: `jamr-admin` (o el que prefieras)
   - **Password**: Genera una contraseña segura (guárdala!)
5. En **"Database User Privileges"**, selecciona **"Read and write to any database"**
6. Haz clic en **"Add User"**

## Paso 5: Obtener Connection String

1. Ve a **"Database"** en el menú lateral
2. Haz clic en **"Connect"** en tu cluster
3. Selecciona **"Connect your application"**
4. Asegúrate de que esté seleccionado:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
5. Copia el **connection string** que se muestra. Se verá así:
   ```
   mongodb+srv://jamr-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Paso 6: Configurar en el Backend

1. Abre el archivo `.env` en la carpeta `backend/`
2. Reemplaza `<password>` en el connection string con tu contraseña
3. Agrega el nombre de la base de datos después de `.net/`:
   ```env
   MONGODB_URI=mongodb+srv://jamr-admin:TU_PASSWORD_AQUI@cluster0.xxxxx.mongodb.net/jamr-store?retryWrites=true&w=majority
   ```

### Ejemplo completo de .env:

```env
MONGODB_URI=mongodb+srv://jamr-admin:MiPassword123@cluster0.abc123.mongodb.net/jamr-store?retryWrites=true&w=majority
JWT_SECRET=mi_clave_super_secreta_para_jwt_tokens_12345
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Paso 7: Generar JWT Secret

Para generar un JWT_SECRET seguro, abre una terminal y ejecuta:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copia el resultado y pégalo en `JWT_SECRET` en tu archivo `.env`

## Paso 8: Poblar la Base de Datos

Una vez configurado el `.env`, ejecuta:

```bash
cd backend
npm run seed
```

Esto creará los productos iniciales en tu base de datos.

## Verificar Conexión

Para verificar que todo funciona:

```bash
npm run dev
```

Deberías ver en la consola:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
🚀 Server running on port 5000
📚 API Documentation: http://localhost:5000/api-docs
```

## Troubleshooting

### Error: "MongoServerError: bad auth"
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de no tener caracteres especiales sin encodear en la contraseña

### Error: "MongooseServerSelectionError"
- Verifica que tu IP esté en la whitelist (Network Access)
- Verifica que el connection string sea correcto

### Error: "Authentication failed"
- El usuario debe tener permisos de lectura/escritura
- Verifica que el nombre de usuario sea correcto

## Ver tus Datos

1. Ve a **"Database"** en MongoDB Atlas
2. Haz clic en **"Browse Collections"**
3. Aquí verás tus colecciones:
   - `products`
   - `users`
   - `orders`
   - `contacts`

## Notas Importantes

- ⚠️ **NUNCA** compartas tu `.env` en GitHub
- ⚠️ El archivo `.env` ya está en `.gitignore`
- 💡 El tier gratuito de MongoDB Atlas incluye:
  - 512 MB de almacenamiento
  - Conexiones compartidas
  - Suficiente para desarrollo y proyectos pequeños

## Para Producción (Vercel)

Cuando despliegues en Vercel, agrega las mismas variables de entorno en:
**Vercel Dashboard → Tu Proyecto → Settings → Environment Variables**

No olvides cambiar:
- `NODE_ENV=production`
- `FRONTEND_URL=https://tu-frontend.vercel.app`
