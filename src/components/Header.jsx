import {UserButton, useUser} from '@clerk/clerk-react'
import {Button} from './ui/button'
import {Link} from 'react-router-dom'

function Header() {
    const {isSignedIn} = useUser()

    return (
        <div className="flex justify-between items-center shadow-sm p-5">
            <Link to={'/'}>
                <img src="/logo.svg" width={150} height={100}/>
            </Link>
            <ul className="hidden md:flex gap-16">
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
                    Home
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
                    Search
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
                    New
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
                    Preowned
                </li>
            </ul>

            {isSignedIn ? (
                <div className="flex items-center gap-5">
                    <UserButton/>
                    <Link to={'/profile'}>
                        <Button>Submit Listing</Button>
                    </Link>
                </div>
            ) : (
                <Button>Submit Listing</Button>
            )}
        </div>
    )
}

export default Header
