import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="z-40 fixed container mx-auto max-w-full top-0 left-0 py-6 px-8 backdrop-blur-sm bg-slate-900/70 border-b border-white/10 scale-y-80 md:scale-y-100">
            <div className="flex flex-row items-center justify-between text-white text-xl ">
                <div className="flex items-center md:gap-3 gap-2 pointer-events-none">
                    <div className="logo">
                        <img src="icon.svg" alt="logo" />
                    </div>
                    <h2 className='sm:visible invisible'><span className="font-extrabold">three.js</span> journey</h2>
                </div>

                <ul className="flex items-center md:gap-x-5 gap-x-3">
                    <li>
                        <a href="https://github.com/keirace/threejs-journey" className="text-zinc-300 hover:text-white flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                            <p className="px-2 text-lg">Github</p>
                        </a>
                    </li>
                    <li><a className="text-zinc-300 hover:text-white flex" href="https://threejs-journey.com/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                    </svg><p className='px-2 text-lg'>Course</p></a></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;