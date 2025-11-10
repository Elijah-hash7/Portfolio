const Hero = ({ isDarkMode }) => {
    return (
        <div className="flex items-start gap-8">
            <div className="flex-1">
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Elijahh
                </p>
                <h1 className={`text-3xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Bringing Ideas and solutions into reality in the most efficient way possible.
                </h1>
            </div>

            <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">Your Pic</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;