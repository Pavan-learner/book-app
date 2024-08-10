import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "../Pages/Image";
// import Location from "../Pages/Location";
// import Location from "../Pages/location";
import Fetch from "../Pages/Fetch";
import PopUp from "./PopUp";
import { Button } from 'react-bootstrap';


const Home = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [data, setdata] = useState([]);

  // useEffect(() => {
  //     const fetchProducts = async() =>{
  //       try{
  //           const response = await axios.get('https://dummyjson.com/products');
  //           const data = response.data.products;
  //           setdata(data);
  //           console.log(data)
  //       }
  //       catch(e){
  //         console.error(e)
  //       }
  //   }
  //   fetchProducts()
  // }, []);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className = 'container'>
        <div className = 'row'>
         <div className = 'col-lg-8 d-flex' >

         {
        data.map((item) => {
          return (
            <Product item = {item} key = {item.id}/>
          )
        })
       }
         </div>
        </div>
       

      </div>

      <h1>Cart items length : {cartItems.length}</h1>

      <Link to={"/cart"}>
        <button className="btn btn-danger">Checkout your cart</button>
      </Link>

      {/* <Location /> */}

      {/* <Image/> */}
      {/* <Fetch/> */}

      <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <PopUp
        show={showModal}
        handleClose={handleClose}
      />

      <div>
        <Link to='send-mail'><button className="btn btn-danger">Send Mail</button></Link>
      </div>
    </div>
    </>
  );
};

export default Home;
