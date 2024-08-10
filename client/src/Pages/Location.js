import React, { useEffect } from "react";


const fetctLocation = () => {
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          console.log(result.state);
          //If granted then you can directly call your function here
        } else if (result.state === "prompt") {
          console.log(result.state);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable Location
        }
        result.onchange = function () {
          console.log(result.state);
        };
      });
  } else {
    alert("Sorry Not available!");
  }
};

useEffect(() => {
  fetctLocation();
}, [])


const Location = () => {
  return <div>
  </div>;
};

export default Location;
