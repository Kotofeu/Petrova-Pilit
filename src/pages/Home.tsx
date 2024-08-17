import { HomeMainSection } from '../modules/HomeMain'
import { HomeWorksSection } from '../modules/HomeWorks'
import { HomeServicesSection } from '../modules/HomeServices'
import { HomeAdvantagesSection } from '../modules/HomeAdvantages'

const Home = () => {
  return (
    <main>
      <HomeMainSection />
      <HomeWorksSection />
      <HomeServicesSection />
      <HomeAdvantagesSection />
    </main>
  )
}

export default Home