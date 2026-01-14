import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import contactRoutes from './routes/contact.routes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'JAMR Store API',
            version: '1.0.0',
            description: 'API REST para JAMR Store - E-commerce de productos tecnológicos',
            contact: {
                name: 'JAMR Store',
                email: 'contact@jamrstore.com'
            }
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? `https://${process.env.VERCEL_URL || 'integrador-final-backend.vercel.app'}`
                    : `http://localhost:${process.env.PORT || 5000}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Cosas de express que no entiendo bien pero tiene que estar
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "res.cloudinary.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
}));
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Control de abuso de pedidos para que no nos rompan la api
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Lo puse alto para que no moleste mientras codeo
    message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.'
});
app.use('/api/', limiter);

// Swagger CDN configuration for Vercel
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URLS = [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
];

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'JAMR Store API Docs',
    customCssUrl: CSS_URL,
    customJs: JS_URLS
}));

// Las rutas de verdad
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'JAMR Store API is running',
        version: '1.0.0',
        documentation: '/api-docs'
    });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Solo escuchamos en local, Vercel se encarga de lo suyo
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
}

export default app;
