// import { Button } from './components/ui/button'
// import { SignInButton } from '@clerk/clerk-react'

import Category from './components/Category'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import MostSearchedCar from './components/MostSearchedCar'

function Home() {
  return (
    <div>
      {/* Heade */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* Category */}
      <Category />
      {/* Most Searched Car */}
      <MostSearchedCar />
      {/* InfoSection */}
      <InfoSection />
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
