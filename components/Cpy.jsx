const moment = require('moment')
const Cpy = () => {
  return (
    <div className="cpy_">
       <p>©{moment().format('YYYY')} All Rights Reserved By My Store</p>
    </div>
  )
}

export default Cpy