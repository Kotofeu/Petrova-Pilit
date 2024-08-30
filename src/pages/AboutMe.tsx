import React from 'react'
import { AboutMainSection } from '../modules/AboutMain'
import { AdvantagesSection } from '../modules/Advantages'
import { HowToGetSection } from '../modules/HowToGet'
import { OfficeSection } from '../modules/Office'

const AboutMe = () => {
  return (
    <main>
      <AboutMainSection/>
      <AdvantagesSection/>
      <HowToGetSection/>
      <OfficeSection/>

    </main>
  )
}

export default AboutMe