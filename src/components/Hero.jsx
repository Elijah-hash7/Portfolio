import { useState, useEffect } from "react";
import profilePic from '../assets/images/Profile.jpg';

const Hero = ({ isDarkMode }) => {
    const titles = [
        "Elijah",
        "Web3 Enthusiast",
        "Full Stack Developer",
        "Idea Alchemist",
        "Psalm 143 : 10 :)",
        "Code + Music = Productivity",
        "User centered Developer",
        "Hiphop",      
        "BlockChain Engineer"
    ];

    const [currentTitle, setCurrentTitle] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = titles[currentTitle];
        const speed = isDeleting ? 60 : 120;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText.length < currentWord.length) {
                // Typing
                setDisplayText(currentWord.slice(0, displayText.length + 1));
            } else if (!isDeleting && displayText.length === currentWord.length) {
                // Wait before deleting
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText.length > 0) {
                // Deleting
                setDisplayText(displayText.slice(0, -1));
            } else if (isDeleting && displayText.length === 0) {
                // Move to next title
                setIsDeleting(false);
                setCurrentTitle((prev) => (prev + 1) % titles.length);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTitle]);

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 mb-15 md:mb-3">
            <div className="flex-1 max-w-4xl">
                <div className="h-10 md:h-12 mb-2">
                    <p className={`font-display text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>
                <h1 className={`font-display text-3xl md:text-4xl lg:text-5xl mt-10 md:mt-2  font-bold leading-tight mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Crafting seamless digital experiences through innovative web solutions and blockchain technology.
                </h1>
            </div>
            <div className="flex-shrink-0 mt-5 lg:mt-0">
                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden transition-colors duration-300 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                    <img
                        src={profilePic}
                        alt="Elijah"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;