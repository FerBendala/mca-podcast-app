import { Outlet, Link } from 'react-router-dom'

import iconLoader from '../assets/images/icon-loader.svg'
import './layout.scss'

const Layout = ( { isLoading, setIsLoading } ) => {
    return (
        <>
            <header className='header'>
                <h1 className='header__title'>
                    <Link
                        to='/'
                        className='header__title__link'
                        onClick={() => setIsLoading( false )}
                    >Podcaster</Link>
                </h1>
                {isLoading &&
                    <img
                        src={iconLoader}
                        alt='loader'
                        title='loader'
                        className='header__loader'
                    />
                }
            </header>
            <main className='main'>
                <Outlet />
            </main>
        </>
    )
}

export default Layout