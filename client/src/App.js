import { useSelector } from "react-redux";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Fetch from "./Pages/Fetch";
import Send_Mail from "./Pages/Send_Mail";

function App() {
  const cartItems = useSelector(state => state.cart.cart);
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/cart' element = {<Cart/>}/>
      <Route path = '/checkout' element = {<Checkout/>} />
      <Route path = '/location' element ={<Fetch/>} />
      <Route path = '/send-mail' element = {<Send_Mail/>} />
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
