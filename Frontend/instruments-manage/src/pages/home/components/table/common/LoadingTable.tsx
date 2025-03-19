import { SpinnerInfinity } from "spinners-react";

const LoadingTable = () => {
  return (
    <div className="h-80 flex justify-center items-center">
      <SpinnerInfinity
        size={200}
        speed={110}
        thickness={41}
        color="#09090b"
        secondaryColor="#cad0d8"
      />
    </div>
  );
};

export default LoadingTable;
