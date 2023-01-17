import React from 'react'
import Category from '../../components/Category/Category'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts title="trending" />
      <Category />
      <FeaturedProducts title="new arrivals" />
    </div>
  )
}

export default Home