// src/hooks/useTheme.jsx

import { useState, useEffect } from 'react';

const useTheme = () => {
    // 1. Initialize state with a preference from localStorage or default to 'light'
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    // 2. useEffect to apply the theme class to the <html> tag whenever the state changes
    useEffect(() => {
        const html = document.documentElement; // Targets the <html> element

        // Remove existing theme classes
        html.classList.remove('light', 'dark'); 
        html.removeAttribute('data-theme');

        // Check if using DaisyUI data-theme attribute
        if (theme === 'dark' || theme === 'light') {
            html.setAttribute('data-theme', theme);
        } else {
            // Fallback for simple Tailwind class
            html.classList.add(theme); 
        }

        // Save the new preference to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]); // Rerun effect whenever 'theme' state changes

    // 3. Toggle Function
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useTheme;