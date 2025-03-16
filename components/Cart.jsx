import { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import Footer from "../components/Footer";
import Cpy from "../components/Cpy";

const Cart = () => {
  let { cartItems, addToCart, removeFromCart, setCartItems, setShippingDetails,shippingDetails,handleDetailsChange } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = (item) => {
    setQuantity(quantity + 1);
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrease = (item) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      addToCart({ ...item, quantity: -1 });
    } else {
      removeFromCart(item.product_id);
    }
  };

  const handleCheckout = (data) => {
    // hit checkout post  api
    console.log("checkout", data);
    let payload = {
      items: data,
      email: shippingDetails.email,
      contact_no: shippingDetails.contact_no,
      address: shippingDetails.address,
    }

    payload.items = payload.items.map(({ image, ...rest }) => rest);

    // post api using form data
    fetch(`${process.env.API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": process.env.API_TOKEN,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        window.location.href = result.data.payment_url;
        console.log("Success data:", result.data.payment_url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // clear cart
    setCartItems([]);
    setShippingDetails({
      address: "",
      email: "",
      contact_no: ""});
    
  };

  return (
    <>
      <div className="container mt-5" style={{ posiition: "relative" }}>
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
                      return (
                        <tr key={index}>
                          <td>
                            <img src={item.image} alt="" width={50} />
                          </td>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                          </td>
                          <td>{(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeFromCart(item.product_id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={6} className="text-right">
                        Total:{" "}
                        {cartItems.reduce(
                          (acc, item) =>
                            Number(
                              (acc + item.price * item.quantity).toFixed(2)
                            ),
                          0
                        )}
                      </td>
                    </tr>
                    <tr id="shipping-details">
                      <td colSpan={6}>
                        <h4>Shipping Details</h4>
                        <form>
                          <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              value={shippingDetails.address}
                              onChange={handleDetailsChange}
                              placeholder="Enter your address"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              id="contact_no"
                              name="contact_no"
                              value={shippingDetails.contact_no}
                              onChange={handleDetailsChange}
                              placeholder="Enter your contact number"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={shippingDetails.email}
                              onChange={handleDetailsChange}
                              placeholder="Enter your email"
                            />
                          </div>
                          {/* <div className="form-group">
                            <label htmlFor="paymentMode">Payment Mode</label>
                            <select
                              className="form-control"
                              id="paymentMode"
                              name="paymentMode"
                              value={shippingDetails.paymentMode}
                              onChange={handleDetailsChange}
                            >
                              <option value="online">Online</option>
                              <option value="cod">Cash on Delivery</option>
                            </select>
                          </div>
                          {shippingDetails.paymentMode === "online" && (
                            <>
                              <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cardNumber"
                                  name="cardNumber"
                                  value={shippingDetails.cardNumber}
                                  onChange={handleDetailsChange}
                                  placeholder="Enter your card number"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="expiry"
                                  name="expiry"
                                  value={shippingDetails.expiry}
                                  onChange={handleDetailsChange}
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cvv"
                                  name="cvv"
                                  value={shippingDetails.cvv}
                                  onChange={handleDetailsChange}
                                  placeholder="Enter your CVV"
                                />
                              </div>
                            </>
                          )} */}
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <button
                    className="btn btn-primary float-right"
                    onClick={() => handleCheckout(cartItems)}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center">Your cart is empty !</p>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
        {/* <Footer /> */}
        <Cpy />
      </div>
    </>
  );
};

export default Cart;
