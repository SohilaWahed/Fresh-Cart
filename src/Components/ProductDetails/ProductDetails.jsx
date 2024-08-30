import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import Loading from '../Loading/Loading';
import { ProductsContext } from '../../Context/ProductsContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {

  var settingsRelatedSlide = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ]
  };

  var settingsImagesOfProduct = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000
  };

  let { products, addToWishList, removeFromWishList } = useContext(ProductsContext)
  const [favourite, setfavourite] = useState(false)
  let { addToCart } = useContext(CartContext)
  let { id } = useParams()
  const [productDetails, setProductDetails] = useState({})
  let [relatedProducts, setRelatedProducts] = useState([])
  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProductDetails(data.data)
      setRelatedProducts(products.filter((prod) => prod.category?.name === productDetails.category?.name))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails(id)
  }, [relatedProducts])


  return <>
    <h1 className="text-5xl md:mt-20 text-center">Product Details</h1>
    {Object.keys(productDetails).length && products.length ?
      <>
        <div className='flex flex-col md:flex-row flex-wrap items-center justify-start mt-8'>
          <div className="image w-full md:w-1/3">
            <Slider {...settingsImagesOfProduct}>
              {productDetails.images?.map((image, index) => <img key={index} src={image} className='w-full' alt='image' />)}
            </Slider>
          </div>
          <div className="details md:w-2/3 md:px-12">
            <div>
              <div className='flex justify-between'>
                <h2 className='text-2xl font-semibold'>{productDetails.title}</h2>
                <div className='flex justify-end items-center pe-4'>
                  {favourite ? <i className="fa-solid fa-heart text-2xl text-red-600" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setfavourite(false)
                    removeFromWishList(productDetails.id)
                    toast.success('it has been successfully removed', { position: 'top-center', style: { backgroundColor: '#22c55e' } });
                  }} ></i> : <i className="fa-solid fa-heart text-2xl text-green-600" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setfavourite(true)
                    addToWishList(productDetails.id)
                    toast.success('it has been successfully added', { position: 'top-center', style: { backgroundColor: '#22c55e' } });

                  }} ></i>}
                </div>
              </div>
              <p className='my-6 text-gray-500'>{productDetails.description}</p>
              <h3 className='text-emerald-500'>{productDetails.category?.name}</h3>
              <div className='flex justify-between my-2'>
                <h3 className='text-xl'>{productDetails.price} EGP</h3>
                <h3 className='text-xl'><i className='fas fa-star text-amber-400'></i> {productDetails.ratingsAverage}</h3>
              </div>
              <button onClick={() => addToCart(productDetails.id)} className='w-full bg-green-600 font-semibold text-xl text-white rounded py-2 my-2'>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className='py-6'>
          <h2 className="text-4xl py-6 ">Related Products</h2>
          <Slider {...settingsRelatedSlide}>
            {relatedProducts.map((product, index) => <div className='h-[200px]' key={index}>
              <img src={product.imageCover} alt='img-relatedProducts' className='w-full' />
              <h3 className='font-semibold text-emerald-600 py-1'>{product.title}</h3>
            </div>)}
          </Slider>
        </div>
      </> :
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div>}
  </>

}

