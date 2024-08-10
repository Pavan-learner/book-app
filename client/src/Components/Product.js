import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNow } from "../State/slice";
import { useNavigate } from "react-router-dom";



const Product = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const buyProduct = useSelector((state) => state.buy.buy);

  const handelBuy = (item) =>{
    dispatch(buyNow({item}));
    // <Checkout items = {buyProduct} />
    navigate('/checkout')
  }

  return (
    <>
          <div key={item.id} className="col-md-4 col-sm-6 col-xs-12 mb-3">
            <div className="card" style={{ width: "100%" }}>
              <img
                src={item.images[0]}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p>
                  <strong>${item.price}</strong>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(addToCart({ item }))}
                >
                  Add to cart
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handelBuy(item)}
                >
                  Buy Now
                </button>
                <p> Rating : {item.rating} </p>
              </div>
            </div>
          </div>
  
    </>
  );
};

export default Product;
