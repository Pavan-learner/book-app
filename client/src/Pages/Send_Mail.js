import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Send_Mail = () => {
  const [loading, setLoading] = useState(false);
const cartItems =  useSelector((state) => state.cart.cart);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    products: [],
  });

  useEffect(() => {
    // Map cartItems to the required format if necessary
    const formattedProducts = cartItems.map(item => ({
      id: item.id,
      name: item.title, // Ensure the property names match your data structure
      quantity: item.quantity,
      price: item.price,
    }));

    // Update formData with cartItems
    setFormData((prevData) => ({
      ...prevData,
      products: formattedProducts,
    }));
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const products = [
    { id: 1, name: "Product 1", quantity: 2, price: 100 },
    { id: 2, name: "Product 2", quantity: 1, price: 50 },
    // Add more products as needed
  ];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    try {
      const res = await axios.post("http://localhost:5000/send-mail", formData);
      if (res.data.success === true) {
        console.log(res.data.message);
        alert("Order placed successfully");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid full name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <h4 className="mb-3">Payment</h4>

              <div className="row">
                {/* // * create check box for cash on delivery */}
                Cash on delivery
              </div>

              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Send_Mail;
