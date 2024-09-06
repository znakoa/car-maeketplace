import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

function Header() {
  const { isSignedIn } = useUser()

  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to={'/'}>
        <img src="/public/logo.svg" width={150} height={100} />
      </Link>
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
          <Link to={'/'}>Home</Link>
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
          <Link to={'/search'}>Search</Link>
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
          <Link to={'/profile'}>New</Link>
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-pretty">
          Preowned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to={'/profile'}>
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode='modal' fallbackRedirectUrl='/'>
          <Button>Submit Listing</Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Header
