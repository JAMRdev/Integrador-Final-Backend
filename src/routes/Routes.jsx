import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Contact from '../pages/Contact';
import MyOrders from '../pages/MyOrders';
import Developers from '../pages/Developers';
import Layout from '../components/Layout/Layout';

const RoutesComp = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="contact" element={<Contact />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="developers" element={<Developers />} />
            </Route>
        </Routes>
    );
};

export default RoutesComp;
