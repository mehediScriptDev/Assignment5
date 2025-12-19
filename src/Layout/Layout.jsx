import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Login/Components/Header';
import Footer from '../Pages/Login/Components/Footer';

const Layout = () => {
    return (
        <div className="bg-background text-foreground antialiased">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;