import React, { useEffect } from 'react';
import Header from '../Login/Components/Header';
import Footer from '../Login/Components/Footer';
import Hero from './Components/Hero';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import Highlights from './Components/Highlights';

const Home = () => {
    useEffect(() => {
        // load lucide icons
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.async = true;
        script.onload = () => {
            try { window.lucide && window.lucide.createIcons(); } catch (e) {}
        };
        document.body.appendChild(script);

        // Dropdown toggle used by Filters
        window.toggleDropdown = (id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle('show');
        };

        return () => {
            try { document.body.removeChild(script); } catch (e) {}
            try { delete window.toggleDropdown; } catch (e) {}
        }
    }, []);

    return (
        <div className="bg-background text-foreground antialiased">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Hero />
                <SearchBar />
                <Filters />
                <Highlights />
            </main>
            <Footer />
        </div>
    );
};
export default Home;