import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const ProductDetail = () => {
    let {id} = useParams();
    let [product, setProduct] = useState({})
    useEffect(() => {
      fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct({price: data.price, title: data.title, description: data.description, images: data.images}));
    },[])


    var settings = {
      dots: true,
      infinite: product?.images?.length > 3,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

  return (
    <div className="container">
      <div className="row">
        {product?.images?.length ? <div className="col-md-6">
              <Slider {...settings}>
                {
                  product?.images?.map((image,  index) => {
                    return <div key={index}>
                      <img className="h-5000" src={image} alt="product" />
                    </div>
                  })
                }
              </Slider>
        </div> : <div className="col-md-6">Loading...</div>}
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p className="mt-5">Price: RS {product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail