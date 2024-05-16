import React from "react";
import { Button } from "@nextui-org/react";
import { DNA } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default LoadingScreen;
