import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBuy } from '../State/slice';
import Stepper from './Stepper';


const Checkout = () => {
    const items = useSelector((state) => state.cart.buy);
    const cartItems = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    

    // console.log(items[0].price)
  return (
    <div>
        <h1>Checkout</h1>
        
        {
            items.length > 0 ? 
            (
              <>
              <p>Items : {items.length}</p>
              {
                items.map((item) => {
                  <p key={item.id}>{item.title}</p>
                })
              }
              <button className='btn btn-danger' onClick={() => dispatch(removeFromBuy())}>Checkout Now</button>          
              </>
            
            ) : (

                
                  cartItems.map((item) => (
                    <p key={item.id}>{item.name}</p>
                  ))
            )
        }
        {/* <p>Items : {items.length}</p> */}

        
        <Stepper/>

    </div>
  )
}

export default Checkout