import { useContext, useState } from "react"
import { CartContext } from "../contexts/cartContext"
import Footer from "../components/Footer"
import Cpy from "../components/Cpy"

const Cart = () => {
  let {cartItems, addToCart, removeFromCart,  setCartItems} = useContext(CartContext)
  console.log('cartItems', cartItems)
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = (item) => {
    setQuantity(quantity + 1)
    addToCart({...item, quantity: 1})
  }

  const handleDecrease = (item) => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
      addToCart({...item, quantity: - 1})
    } else {
      removeFromCart(item.id)
    }
  }

  const handleCheckout = () => {
    // hit checkout post  api
    console.log('checkout')
    setCartItems([])
  }

  return (
    <>
<div className="container mt-5" style={{posiition: 'relative'}}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            <>
            <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                return <tr key={index}>
                  <td><img src={item.image} alt="" width={50} /></td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleDecrease(item)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-primary" onClick={() => handleIncrease(item)}>+</button>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              })}
              <tr>
                <td colSpan={6} className="text-right">
                  Total: {cartItems.reduce((acc, item) => Number((acc + item.price * item.quantity).toFixed(2)), 0)}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary float-right" onClick={() => handleCheckout()}>Checkout</button>
          </div>
            </>
          
        ) : (
            <p className="text-center">Your cart is empty !</p>          )}
        </div>
      </div>
    </div>
    <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
        <Footer />
        <Cpy />
    </div>
    </>
  )
}

export default Cart

