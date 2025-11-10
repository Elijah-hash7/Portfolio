import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';


const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className='pt-4 '>
            <nav className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center ">
                            <h1 className={isDarkMode ? 'text-white  text-2xl font-semibold' : 'text-gray-900 text-2xl font-semibold'}>
                                Elijah.hash
                            </h1>
                            <span className={`text-2xl mx-32 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Emmanuel Elijah
                            </span>
                        </div>
                        <div
                            onClick={toggleDarkMode}
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {isDarkMode ? (
                                <MoonIcon className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <SunIcon className="w-5 h-5 text-yellow-500" />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

        </div>


    )
}

export default Navbar;
