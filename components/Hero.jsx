import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { CartContext } from "../contexts/cartContext"
import { UIContext } from "../contexts/UIContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  let {pathname } = useLocation()
  const [selectedDD, setSelectedDD] = useState('Categories')
  const {cartItems, getProductByCategory,  fetchProducts} = useContext(CartContext)
  const {isMenuOpen, toggleMenu} = useContext(UIContext)

  // get product categories list
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch(`${process.env.API_URL}/category`, {
      headers: {
      'token': process.env.API_TOKEN
      }
    })
    .then(res => res.json())
    .then(data => data?.data ? setCategories(data.data): [])
  },[])



return (
<>
<div className="hero_area">
  {/* header section strats */}
  <header className="header_section">
    <div className="container">
      <nav className="navbar navbar-expand-lg custom_nav-container ">
        <a className="navbar-brand" href="index.html">
          {/* <img width={250} src="images/logo.png" alt="#" /> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isMenuOpen == true ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className=""> </span>
        </button>
        <div className={ isMenuOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className={pathname === '/' ? "nav-item active" : "nav-item"}>
              <Link to="/" className="nav-link"> Home</Link>
            </li>
            <li className="nav-item  dropdown">
                <select value={selectedDD} onChange={(e) => {e.target.value === 'Categories'? fetchProducts() :  getProductByCategory(e.target.value); setSelectedDD(e.target.value)}} className="nav-link">
                  <option value="Categories">Categories</option>
                  {categories.map(data => <option key={data.id} value={data.id} >{data.title}</option>)}
                </select>
              </li>
            <li className={pathname === '/cart' ? "nav-item active" : "nav-item"}>
              {/* <Link to="/cart" className="nav-link"> Cart ({cartItems.length} Items)</Link> */}
              <Link style={{ position: "relative", display: "inline-block", fontSize: "15px", cursor: "pointer" }} to="/cart" className="nav-link"> <FontAwesomeIcon icon={faShoppingCart} size="3x" />
              {cartItems.length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    minWidth: "20px",
                    textAlign: "center",
                  }}>{cartItems.length}</span>
                )}
              </Link>
            </li>                  
          </ul>
        </div>
      </nav>
    </div>
  </header>
</div>

</>
  )
}

export default Hero