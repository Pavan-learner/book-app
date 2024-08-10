const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');  
  });


app.post('/api/reverse-geocode', async (req, res) => {
  const { latitude, longitude } = req.body;


  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    if (response.data) {
      res.json({ address: response.data.display_name });
    } else {
      res.status(404).json({ error: 'No address found for this location' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred: ' + error.message });
  }
});




app.post('/send-mail', async(req,res) =>{
  // Create a transporter object using SMTP transport

  const {name,email,address,products} = req.body;

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
  secure: true,
  port : 465,
  auth: {
      user: 'monoking.in@gmail.com', // Your email address
      pass: 'yrmyaqrjzonmqbhw' // Your email password
  }
});

const productDetails = products.map(product => 
  `<li>${product.name} - Quantity: ${product.quantity}, Price: $${product.price}</li>`
).join('');

// Set up email data
let mailOptions = {
  from: 'monoking.in@gmail.com', // Sender address
  to: [email], // List of recipients
  subject: 'Order Confirmation from monoking.in <notreplay>', // Subject line
  text: 'Order Confirmation', // Plain text body
  html: `
  <h2>Order Confirmation</h2>
  <p>Thank you for your order, ${name}!</p>
  <p>Address: ${address}</p>
  <h3>Ordered Products:</h3>
  <ul>${productDetails}</ul>
`
};



// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
    return res.status(500).send('Error sending email');
  }
  console.log('Message sent:', info.response);
    res.status(200).send({
      success:true,
      message:'Email sent successfully' 
    });
  });

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
