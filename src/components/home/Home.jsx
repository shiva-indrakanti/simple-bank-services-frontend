import { Link } from "react-router-dom";
import './Home.css';
const Home=()=>{
    return (
        <div className="main">
        <div className="homeinnermain"> 
           <h2>Flexi Services</h2>
           <p>Enjoy our bank services by registering into our Bank. </p>
           <div className="button">
             <button ><Link id="link" to="/account-register">Register Here</Link></button>
           </div>
        </div>
        </div>
    )
}
export default Home;