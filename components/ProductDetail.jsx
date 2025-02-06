import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const ProductDetail = () => {
    let {id} = useParams();
    let [product, setProduct] = useState({})
    useEffect(() => {
      fetch(`${process.env.API_URL}/product/${id}`, {
        headers: {
          token: process.env.API_TOKEN,
        },
      }
      )
      .then(res => res.json())
      .then(data => setProduct({price: data.data.price, title: data.data.title, description: data.data.description, images:[ data.data.image_url]}));
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
          <p>{product.description}</p>
          <p className="mt-5">Price: RS {product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail