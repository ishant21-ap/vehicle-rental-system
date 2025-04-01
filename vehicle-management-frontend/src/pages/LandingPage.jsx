/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Services from '../components/Services'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'
import CarSection from '../components/CarSection'

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Section />
            <CarSection />
            <Services />
            <Testimonial />
            <Footer />
        </>
    )
}

export default LandingPage
