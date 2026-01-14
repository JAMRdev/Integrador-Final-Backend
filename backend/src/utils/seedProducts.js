import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

const products = [
    {
        id: 1,
        name: "Auriculares Gamer",
        price: 5000,
        category: "audio",
        image: "/img/headphones.webp",
        description: "Sonido envolvente 7.1",
        stock: 100
    },
    {
        id: 2,
        name: "Teclado Mecánico",
        price: 8500,
        category: "gaming",
        image: "/img/keyboard.webp",
        description: "Switches Cherry MX Blue",
        stock: 100
    },
    {
        id: 3,
        name: "Monitor 24'",
        price: 25000,
        category: "tech",
        image: "/img/monitor.webp",
        description: "Full HD 144hz",
        stock: 100
    },
    {
        id: 4,
        name: "Mouse Gamer",
        price: 3500,
        category: "gaming",
        image: "/img/mouse.webp",
        description: "RGB y sensor óptico",
        stock: 100
    },
    {
        id: 5,
        name: "Parlante Bluetooth",
        price: 4000,
        category: "audio",
        image: "/img/speaker.webp",
        description: "Batería de larga duración",
        stock: 100
    },
    {
        id: 6,
        name: "Notebook Pro",
        price: 150000,
        category: "tech",
        image: "/img/laptop.webp",
        description: "Intel i7, 16GB RAM",
        stock: 100
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Borramos lo que haya para no duplicar
        await Product.deleteMany({});
        console.log('🗑️  Productos existentes eliminados');

        // Metemos los productos nuevos
        await Product.insertMany(products);
        console.log('✅ Productos insertados correctamente');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar productos:', error);
        process.exit(1);
    }
};

seedProducts();
