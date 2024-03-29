import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'> </span>
                        <span className='text-slate-700'>Touring</span>
                    </h1>
                </Link>

                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-700 hover:underline cursor-pointer'>Sign in</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header