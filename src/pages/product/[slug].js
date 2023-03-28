import React, { useState } from 'react'
import {
  AiOutlineMinus, AiOutlinePlus,
  AiFillStar, AiOutlineStar
} from 'react-icons/ai'

import { client, urlFor } from "../../../lib/client"
import Product from '../../component/Product'
import { useStateContext } from '../../../context/StateContext'

const ProductDetails = ({ product, products }) => {

  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            {/* main product image  */}
            {product?.image?.length > 0 && (
              <img src={urlFor(product.image[index])}
                className="product-detail-image" />
            )}
          </div>
          <div className="small-images-container">
            {/* additional product images  */}
            {product?.image?.map((item, ind) => (
              <img
                key={ind}
                src={urlFor(item)}
                className={ind === index ?
                  "small-image selected-image" :
                  "small-image"}
                onMouseEnter={() => setIndex(ind)} />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product?.name}</h1>
          {/* star review  */}
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            {/* views  */}
            <p>{20}</p>
          </div>
          <h4>Details: </h4>
          <p>{product?.details}</p>
          <p className='price'>${product?.price}</p>
          {/* quantity  */}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus"
                onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                {qty}
              </span>
              <span className="plus"
                onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/* add to cart and buy now button  */}
          <div className="buttons">
            <button type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button"
              className="buy-now"
              onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* recommended products */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item, ind) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export const getStaticPaths = async () => {
  const query = `*[ _type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)
  const paths = products.map((product) => (
    { params: { slug: product.slug.current } }
  ))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[ _type == 'product' && slug.current == '${slug}' ][0]`
  const productsQuery = "*[ _type == 'product' ]"

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return { props: { products, product } }
}

export default ProductDetails
