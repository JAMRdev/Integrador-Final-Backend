# 🚀 Guía de Deploy en Vercel

Esta guía te ayudará a deployar el backend de JAMR Store en Vercel.

## Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [GitHub](https://github.com)
- MongoDB Atlas configurado (ver `MONGODB_SETUP.md`)
- Backend funcionando localmente

## Opción 1: Deploy desde GitHub (Recomendado)

### Paso 1: Subir el Código a GitHub

1. **Inicializar Git en el proyecto (si no lo has hecho):**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

2. **Crear repositorio en GitHub:**
   - Ve a [GitHub](https://github.com/new)
   - Crea un nuevo repositorio (ej: `jamr-store-backend`)
   - **NO** inicialices con README, .gitignore o licencia

3. **Conectar y subir:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/jamr-store-backend.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Importar en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Configura el proyecto:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (o `backend` si está en subcarpeta)
   - **Build Command**: Dejar vacío
   - **Output Directory**: Dejar vacío

### Paso 3: Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/jamr-store?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
PORT=5000
```

⚠️ **Importante**: Usa los mismos valores que en tu `.env` local

### Paso 4: Deploy

1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Tu backend estará en: `https://tu-proyecto.vercel.app`

## Opción 2: Deploy con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Deploy

```bash
cd backend
vercel
```

Sigue las instrucciones:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta
- **Link to existing project?** → No
- **Project name?** → jamr-store-backend
- **Directory?** → ./
- **Override settings?** → No

### Paso 4: Configurar Variables de Entorno

```bash
vercel env add MONGODB_URI
# Pega tu MongoDB URI cuando te lo pida

vercel env add JWT_SECRET
# Pega tu JWT secret

vercel env add NODE_ENV
# Escribe: production

vercel env add FRONTEND_URL
# Escribe la URL de tu frontend
```

### Paso 5: Deploy a Producción

```bash
vercel --prod
```

## Verificar el Deploy

1. **Abrir la URL de tu backend:**
   ```
   https://tu-proyecto.vercel.app
   ```

2. **Deberías ver:**
   ```json
   {
     "success": true,
     "message": "JAMR Store API is running",
     "version": "1.0.0",
     "documentation": "/api-docs"
   }
   ```

3. **Probar la documentación:**
   ```
   https://tu-proyecto.vercel.app/api-docs
   ```

4. **Probar un endpoint:**
   ```
   https://tu-proyecto.vercel.app/api/products
   ```

## Poblar la Base de Datos en Producción

Después del deploy, necesitas poblar la base de datos:

### Opción A: Desde Local

1. Cambia temporalmente `MONGODB_URI` en tu `.env` local al de producción
2. Ejecuta:
   ```bash
   npm run seed
   ```
3. Restaura el `MONGODB_URI` local

### Opción B: Usar MongoDB Atlas

1. Ve a MongoDB Atlas → Database → Browse Collections
2. Crea manualmente los productos o importa un JSON

## Actualizar el Deploy

### Con GitHub:
```bash
git add .
git commit -m "Update backend"
git push
```
Vercel detectará el push y redesplegará automáticamente.

### Con Vercel CLI:
```bash
vercel --prod
```

## Configurar CORS para el Frontend

Una vez que tengas la URL del frontend deployado:

1. Ve a Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Actualiza `FRONTEND_URL` con la URL real:
   ```
   FRONTEND_URL=https://tu-frontend.vercel.app
   ```
3. Redeploy:
   ```bash
   vercel --prod
   ```

## Monitoreo y Logs

### Ver Logs en Tiempo Real:
```bash
vercel logs
```

### Ver Logs en Dashboard:
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Ve a la pestaña **"Deployments"**
4. Haz clic en un deployment → **"View Function Logs"**

## Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que `MONGODB_URI` esté correctamente configurado en Vercel
- Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0)

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `vercel.json` esté configurado correctamente

### Error: "Function timeout"
- Vercel tiene un límite de 10 segundos para funciones serverless en el plan gratuito
- Optimiza tus queries de MongoDB

### Los cambios no se reflejan:
```bash
vercel --prod --force
```

## Límites del Plan Gratuito de Vercel

- ✅ 100 GB de ancho de banda
- ✅ Funciones serverless
- ✅ SSL automático
- ✅ Dominios personalizados
- ⚠️ Timeout de 10 segundos por función
- ⚠️ 100 deployments por día

## Siguiente Paso: Deploy del Frontend

Una vez que el backend esté deployado:

1. Copia la URL del backend (ej: `https://jamr-backend.vercel.app`)
2. Úsala en el frontend para configurar las llamadas a la API
3. Deploy el frontend siguiendo el mismo proceso

## URLs Importantes

- **Backend API**: `https://tu-backend.vercel.app`
- **API Docs**: `https://tu-backend.vercel.app/api-docs`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **MongoDB Atlas**: `https://cloud.mongodb.com`

## Comandos Útiles

```bash
# Ver información del proyecto
vercel inspect

# Ver lista de deployments
vercel ls

# Remover un proyecto
vercel remove

# Ver variables de entorno
vercel env ls
```

¡Tu backend ya está en producción! 🎉
