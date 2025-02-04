import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../contexts/cartContext"

const Card = ({id,title, image, price}) => {
  const {addToCart,  cartItems, removeFromCart } = useContext(CartContext)
  return (
    <>
              <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="box">
          <div className="option_container">
            <div className="options">
              <Link to={`/product/${id}`} className="option2">
              {title}
              </Link>
              {cartItems.find((item) => item.id === id) ? (
                <button
                  className="option1"
                  onClick={() => removeFromCart(id)}
                >
                  Remove from Cart
                </button>
              ) : (
                <Link to="/" onClick={() => addToCart({id, title, image, price,  quantity: 1})} className="option1"  >
                Buy Now
              </Link>
              )}

            </div>
          </div>
          <div className="img-box">
            <img src={image} alt="" />
          </div>
          <div className="detail-box">
            <h5>{title}</h5>
            <h6>RS {price}</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card