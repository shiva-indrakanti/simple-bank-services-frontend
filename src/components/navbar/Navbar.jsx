import { Link } from "react-router-dom"
import './Navbar.css';
const Navbar =()=>{

    return(
        <div className="navMain">
          <ul className="navUL">
             <li> <Link id="link" to="/">Home</Link> </li> 
             <li> <Link id="link" to="/account-register">Register</Link></li> 
             <li> <Link id="link" to="/account/deposit">Deposit</Link></li> 
             <li> <Link id="link" to="/account/withdraw">Withdraw</Link></li> 
             <li> <Link id="link" to="/account/holder">Account Details</Link></li> 
          </ul> 
          <div className="logo">
            <h2>F/B</h2>
          </div>  
        </div>
    )
}
export default Navbar;