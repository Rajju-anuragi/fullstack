import react from 'react';
import {Link} from "react-router-dom";
const Home = ()=>{
return(
    <div className='home'>
        <h1>Welcome to ShopNow</h1>
        <p> your one-stop shop for all your needs . Explore our wide range of product anything</p>
        <Link to="/shop" className="btn">Start shopping</Link>
    </div>
)
}
export default Home;