import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';


const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className='pt-4 '>
            <nav className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 md:gap-8">
                            <h1 className={`font-display ${isDarkMode ? 'text-white  text-2xl font-Bold' : 'text-gray-900 text-2xl font-semibold'} text-lg md:text-2xl font-bold`}>
                                Elijah.hash
                            </h1>
                            <span className={`font-sans text-sm md:text-lg mx-4 md:mx-20 mx-32 font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                                Emmanuel Elijah
                            </span>
                        </div>
                        <div
                            onClick={toggleDarkMode}
                            className={`w-16 h-8 rounded-full flex items-center cursor-pointer transition-all duration-300 relative flex-shrink-0 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                }`}
                        >
                            <div
                                className={`w-6 h-6 md:w-7 md:h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-8' : 'translate-x-0.5'
                                    }`}
                            >
                                {isDarkMode ? (
                                    <MoonIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                                ) : (
                                    <SunIcon className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>


    )
}

export default Navbar;
