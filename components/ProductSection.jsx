import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { CartContext } from "../contexts/cartContext";

const ProductSection = () => {
  let { products, fetchProducts } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  // let [products, setProducts] = useState([])
  // useEffect(() => {
  //   fetch('https://dummyjson.com/products')
  //   .then(res => res.json())
  //   .then(data => setProducts(data.products));
  // },[])
  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            Our <span>products</span>
          </h2>
        </div>
        <div className="row">
          {products.length ? (
            products.map((product) => {
              return (
                <Card
                  key={product?.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  image={product.image_url}
                  price={product.price}
                />
              );
            })
          ) : (
            <div className="heading_container heading_center">
              <h2>No products</h2>
            </div>
          )}
        </div>
        {products.length ? (
          <div className="btn-box">
            <a href="">View All products</a>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProductSection;
