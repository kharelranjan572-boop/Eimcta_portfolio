import React from "react";
import Confetti from "react-confetti";

const ConfettiEffect = () => {
  return (
    <div
      style={{
        position: "absolute",  // or "fixed" if you want it on top always
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={true}        // keeps confetti running
        numberOfPieces={500}  // adjust amount
        gravity={0.3}         // control falling speed
      />
    </div>
  );
};

export default ConfettiEffect;