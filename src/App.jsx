import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Scaling from "./components/Scaling";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-white'}>
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <div className="max-w-6xl mx-auto mt-4">
                <div className={`rounded-2xl p-8 mx-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Hero isDarkMode={isDarkMode} />
                    <Scaling isDarkMode={isDarkMode} />
                </div>

            </div>
        </div>
    );
}

export default App;