import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartModal from '../UI/CartModal';
import ToastList from '../UI/ToastList';
import ConfirmModal from '../UI/ConfirmModal';
import InfoModal from '../UI/InfoModal';

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <CartModal />
            <ToastList />
            <ConfirmModal />
            <InfoModal />
            <main key={location.pathname}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
