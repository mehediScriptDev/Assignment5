import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from '../Pages/Login/Components/Header';
import Footer from '../Pages/Login/Components/Footer';

const Layout = () => {
    useEffect(() => {
        // Note: lucide runtime removed to avoid DOM mutations that conflict with React.
        // Dropdown behavior is handled inside components with React state.
        return undefined;
    }, []);

    return (
        <div className="bg-background text-foreground antialiased">
            <Header />
            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;