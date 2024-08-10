import React, { useState } from "react";
import axios from "axios";

const Image = () => {
  const [image, setimage] = useState("");

  const genrator = async () => {
    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
      headers: {
        "x-rapidapi-key": "bc7e91e93cmsh880ef9ca572567cp112e10jsn6f40e93e3c56",
        "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        inputs: "Find the dog ",
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setimage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={genrator}>Generate</button>
      {/* <img src={image}> */}
      <img src={image} alt="Generated Image" />
    </div>
  );
};
export default Image;
