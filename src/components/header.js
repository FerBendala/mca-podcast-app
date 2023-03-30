import { Outlet, Link } from 'react-router-dom'

const Header = ( { isLoading } ) => {
    return (
        <>
            <Link to='/'>Podcaster</Link>
            {isLoading && <p>loading...</p>}
            <Outlet />
        </>
    )
}

export default Header