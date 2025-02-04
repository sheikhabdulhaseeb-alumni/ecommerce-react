import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { CartContext } from "../contexts/cartContext"

const Hero = () => {
  let {pathname } = useLocation()
  const [selectedDD, setSelectedDD] = useState('Categories')
  const {cartItems, getProductByCategory,  fetchProducts} = useContext(CartContext)

  // get product categories list
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch(`${process.env.API_URL}/category`, {
      headers: {
      'token': process.env.API_TOKEN
      }
    })
    .then(res => res.json())
    .then(data => setCategories(data.data))
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
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
              >

                <span className="nav-label">
                  Pages <span className="caret" />
                </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="testimonial.html">Testimonial</a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item active">
              <a className="nav-link" href="product.html">
                Products 
              </a>
            </li>   */}
            <li className={pathname === '/cart' ? "nav-item active" : "nav-item"}>
              <Link to="/cart" className="nav-link"> Cart ({cartItems.length} Items)</Link>
            </li>                   {/* <li className="nav-item">
              <a className="nav-link" href="blog_list.html">
                Blog
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="contact.html">
                Contact
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 456.029 456.029"
                  style={{ enableBackground: "new 0 0 456.029 456.029" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                                    c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                                    C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                                    c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                                    C457.728,97.71,450.56,86.958,439.296,84.91z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                                    c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </a>
            </li> */}
            {/* <form className="form-inline">
              <button
                className="btn  my-2 my-sm-0 nav_search-btn"
                type="submit"
              >
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </form> */}
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