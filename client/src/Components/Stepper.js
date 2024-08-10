import React, { useEffect, useRef, useState } from "react";
import "./component.css";

const Stepper = () => {
  const [currentStep, setcurrentStep] = useState(1);
  const [isComplete, setisComplete] = useState(false);
  const [margin, setmargin] = useState({
    marginLeft:0,
    marginRight:0,
  });

  const stepRef = useRef([]);

  const checkoutSteps = [
    {
      name: "Order Confirmed",
      Component: () => <div>Order Confirmed</div>,
    },
    {
      name: "Shipped",
      Component: () => <div>Shipped</div>,
    },
    {
      name: "Delivering Today",
      Component: () => <div>Delivery Today</div>,
    },
    {
      name: "Out for Delivery",
      Component: () => <div>Out for Delivery</div>,
    },
  ];

  useEffect(() => {
    setmargin({
        marginLeft: stepRef.current[0].offsetWidth,
        marginRight: stepRef.current[checkoutSteps.length -1].offsetWidth
    });

  }, [stepRef])
  
  const handelNext = () => {
    setcurrentStep((preStep) => {
      if (preStep === checkoutSteps.length) {
        setisComplete(true);
        return preStep;
      } else {
        return preStep + 1;
      }
    });
  };

  const calculateProgressBar = () => {
    return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100;
  };
  const ActiveComponent = checkoutSteps[currentStep - 1].Component;

  return (
    <>
      <div className="stepper">
        {checkoutSteps.map((step, index) => {
          return (
            <div
              key={step.name}
              ref = {el => (stepRef.current[index] = el)}
              className={`step ${
                currentStep >= index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div>{step.name}</div>
            </div>
          );
        })}

        <div className="progress-bar"
        
        style={{
            width:`calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
            marginLeft:margin.marginLeft,
            marginRight:margin.marginRight,
            // margin:"10px"
        }}>

          <div
            className="progress"
            style={{
              width: `${calculateProgressBar()}%`,
            }}
          ></div>
        </div>
      </div>
      <ActiveComponent />

      <button className="btn btn-primary" onClick={handelNext}>
        {currentStep === checkoutSteps.length ? "Delivered" : "Next"}
      </button>
    </>
  );
};

export default Stepper;
