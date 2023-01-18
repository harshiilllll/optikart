import React from 'react'
import Anouncement from '../../components/Anouncement/Anouncement'
import Category from '../../components/Category/Category'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Newsletter from '../../components/Newsletter/Newsletter'
import Slider from '../../components/Slider/Slider'

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts title="trending glasses" />
      <FeaturedProducts title="sunglasses" />
      <Category />
      <FeaturedProducts title="new arrivals" />
      <Anouncement />
      <Newsletter />
    </div>
  )
}

export default Home