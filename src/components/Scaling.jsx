import { useState } from "react";

const Scaling = ({ isDarkMode }) => {
    const [showAllProjects, setShowAllProjects] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
                <h2 className="text-sm tracking-wider text-gray-500 mb-2">
                    Currently Scaling
                </h2>

                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    AI & Blockchain Skills
                </p>
            </div>

            <div >
                <h2 className="text-sm tracking-wider text-gray-500 mb-2">
                    Reach Out
                </h2>

                <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    X • Instagram • LinkedIn • Medium • GitHub • Mail
                </div>
            </div>

            <div>
               <h2 className="text-sm tracking-wider text-gray-500 mb-2">
                    Recent works
                </h2>
                {!showAllProjects ? (
                    <button
                        onClick={() => setShowAllProjects(true)}
                        className={`underline cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                        View More
                    </button>
                ) :(
                    <div>
                        <p>Project grid coming soon....</p>
                        <button
                            onClick={() => setShowAllProjects(false)}
                            className="underline textgray-500"
                        >show less
                        </button>
                    </div>
                )}

                
            </div>


        </div>
    )
}

export default Scaling;