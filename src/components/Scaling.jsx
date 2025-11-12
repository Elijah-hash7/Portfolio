import { useState } from "react";

const Scaling = ({ isDarkMode }) => {
    const [showAllProjects, setShowAllProjects] = useState(false);

    return (
        <>
            {!showAllProjects ? (
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-8">
                    <div>
                        <h2 className="text-xsmd:text-sm tracking-wider text-gray-500 mb-2">
                            Currently Scaling
                        </h2>
                        <p className={`text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            AI & Blockchain Skills
                        </p>
                    </div>

                    <div >
                        <h2 className="text-xs md:text-sm tracking-wider text-gray-500 mb-2">
                            Reach Out
                        </h2>

                        <div className={`flex flex-wrap gap-4 md:gap-6 text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {[
                                { name: 'X', link: 'https://x.com/_elijahemmanuel' },
                                { name: 'Instagram', link: 'https://www.instagram.com/elijah.hashh' },
                                { name: 'Github', link: 'https://github.com/Elijah-hash7' },
                                { name: 'Linkedln', link: '' },
                                { name: 'Mail', link: 'mailto:Josephelijah357@gmail.com?subject=Hello%20Elijah&body=Hey%20bro!%20Just%20saw%20your%20portfolio.'
                                }].map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group cursor-pointer">
                                        {platform.name}
                                        <span className={`
                                        absolute left-0 -bottom-1 w-0 h-0.5 
                                        group-hover:w-full transition-all duration-300
                                        ${isDarkMode ? 'bg-white' : 'bg-gray-900'}
                                        `}></span>
                                    </a>
                                ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs md:text-sm tracking-wider text-gray-500 mb-2">
                            Recent works
                        </h2>
                        <button
                            onClick={() => setShowAllProjects(true)}
                            className={`text-sm md:text-2xl underline cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                            View More
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-sm md:text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Recent Works
                        </h2>
                        <button
                            onClick={() => setShowAllProjects(false)}
                            className={`underline cursor-pointer font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
                        >Collapse
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'text-gray-700 bg-gray-300'}`}>
                            Project 1
                        </div>
                        <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'text-gray-700 bg-gray-300'}`}>
                            Project 2
                        </div>
                        <div className={`p-4 md:p-6 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'text-gray-700 bg-gray-300'}`}>
                            Project 3
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Scaling;