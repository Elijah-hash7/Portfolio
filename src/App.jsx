import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scaling from './components/Scaling';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'white'
            }`}>
            <div className={`transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}>
                <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* CARD CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
                <div className={`rounded-2xl p-8 md:p-12 shadow-lg transition-all duration-2000 ease-out ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    } ${isLoaded
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}>
                    <Hero isDarkMode={isDarkMode} />
                    <Scaling isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
}

export default App;