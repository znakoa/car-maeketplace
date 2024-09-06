import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Home from './home'
import Contact from './contact'
import Profile from './profile'
import AddListing from './add-listing'
import SarchByCategoty from '@/search/[category]/index.jsx'
import SarchByOptions from '@/search/index.jsx'
import ListDetails from '@/list-details/[id]/index.jsx'
// import { Toaster } from './components/ui/sonner'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: 'add-listing',
      element: <AddListing />,
    },
    {
      path: '/search',
      element: <SarchByOptions />,
    },
    {
      path: '/search/:category',
      element: <SarchByCategoty />,
    },
    {
      path: '/listing-details/:id',
      element: <ListDetails />,
    },
  ],
  // {
  //   basename: '/car-maeketplace', // 添加统一前缀
  // }
)
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      {/* <Toaster /> */}
    </ClerkProvider>
  </StrictMode>
)
