import { useState, useEffect } from "react";

const Hero = ({ isDarkMode }) => {
    const titles = [
        "Elijah",
        "Web3 Enthusiast",
        "Full Stack Developer",
        "Idea Alchemist",
        "Psalm 143 : 10 :)",
        "Kobe and Stephen?? The Best",
        "User centered Developer",
        "Code+Music = Productivity🌚",
        "Hiphop",
        "Not Your Average Developer",
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
        <div className="flex items-start gap-8 mb-12">
            <div className="flex-1">
                <div className="h-10 md:h-12">
                    <p className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>
                <h1 className={`text-3xl md:text-5xl font-bold leading-tight mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Crafting seamless digital experiences through innovative web solutions and blockchain technology.
                </h1>
            </div>
            <div className="flex-shrink-0">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-700'}>Your Pic</span>
                </div>
            </div>
        </div>
    )
}

export default Hero;