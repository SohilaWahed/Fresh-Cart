import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from "../RecentProducts/RecentProducts.jsx";
import Loading from '../Loading/Loading.jsx';
import Slider from 'react-slick';
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import { ProductsContext } from '../../Context/ProductsContext.jsx';
import Products from '../Products/Products.jsx';


export default function Home() {

  var settingsMainSlide = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };

  var settingsCategoriesSlide = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const { products , categories } = useContext(ProductsContext)
  // const [mainList, setMainList] = useState([])


  // useEffect(() => {
  //   setMainList(products)
  // }, [products])

  return <>
    <h1 className="text-5xl md:mt-20 text-center">Recent Products</h1>
    {products.length && categories.length ?
      <>
        <div className="flex flex-col lg:flex-row py-4">
          <div className='lg:w-3/4'>
            <Slider {...settingsMainSlide}>
              <img src={slide3} alt="img-slide" className='w-full h-[400px]' />
              <img src={slide2} alt="img-slide" className='w-full h-[400px]' />
            </Slider>
          </div>
          <div className="lg:w-1/4 flex flex-row lg:flex-col">
            <img src={slide1} alt="img-slide" className='w-full h-[200px]' />
            <img src={slide3} alt="img-slide" className='w-full h-[200px]' />
          </div>
        </div>
        <div className='py-4'>
          <Slider {...settingsCategoriesSlide}>
            {categories.map((category, index) =>
              <div key={index}>
                <img src={category.image} alt="category-image" className='w-full h-[200px]' />
                <h3 className='font-semibold text-emerald-600 py-1'>{category.name}</h3>
              </div>)}
          </Slider>
        </div>
        <Products/>
        {/* <div className="flex justify-center mt-4">
          <input type="text" onInput={(e) => search(e.target.value)} className='p-2 mb-6 w-2/3 block border-[1px] border-slate-300 text-black rounded-md focus:outline-none' placeholder='Search...' />
        </div>
        <div className='grid gap-8 md:grid-cols-3 lg:grid-cols-5'>
          {mainList.map((product, index) => <RecentProducts key={index} product={product} />)}
        </div> */}
      </> :
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div>
    }
  </>
}
