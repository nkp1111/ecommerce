import React from 'react'

import { HeroBanner, Product, FooterBanner } from '../component'

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {["product1", "product2"].map(item => item)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home
