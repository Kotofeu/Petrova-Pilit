import { HomeMainSection } from '../modules/HomeMain'
import { HomeWorksSection } from '../modules/HomeWorks'
import { ServicesSection } from '../modules/Services'
import { AdvantagesSection } from '../modules/Advantages'

const Home = () => {
  return (
    <main>
      <HomeMainSection />
      <HomeWorksSection />
      <ServicesSection />
      <AdvantagesSection />
    </main>
  )
}

export default Home