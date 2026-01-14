import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CartModal from '../UI/CartModal';
import ToastList from '../UI/ToastList';
import ConfirmModal from '../UI/ConfirmModal';
import InfoModal from '../UI/InfoModal';

const Layout = () => {
    return (
        <>
            <Navbar />
            <CartModal />
            <ToastList />
            <ConfirmModal />
            <InfoModal />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
