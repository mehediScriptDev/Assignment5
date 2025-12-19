import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from '../Pages/Login/Components/Header';
import Footer from '../Pages/Login/Components/Footer';

const Layout = () => {
    useEffect(() => {
        // Load lucide icons once for the app
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.async = true;
        script.onload = () => {
            try { window.lucide && window.lucide.createIcons(); } catch (e) {}
        };
        document.body.appendChild(script);

        // Dropdown toggle used by Filters — also toggles an active state on the trigger button
        window.toggleDropdown = (id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle('show');

            try {
                const btn = document.querySelector(`[data-dropdown-for="${id}"]`);
                if (btn) btn.classList.toggle('active');
            } catch (e) {}
        };

        return () => {
            try { document.body.removeChild(script); } catch (e) {}
            try { delete window.toggleDropdown; } catch (e) {}
        };
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