import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scaling from './components/Scaling';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => {
            setIsLoaded(true);
        }, 100);
    }, []);
    
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    
    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            {/* Navbar slides down */}
            <div className={`transform transition-all duration-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
                <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            
            {/* Hero fades in with delay */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                <div className={`transform transition-all duration-700 delay-200 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <Hero isDarkMode={isDarkMode} />
                </div>
                
                {/* Scaling section fades in last */}
                <div className={`transform transition-all duration-700 delay-400 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <Scaling isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
}

export default App;