import { SpinnerInfinity } from "spinners-react";

const LoadingTable = () => {
  return (
    <>
      <tbody className="h-80">
        <tr>
          <td className="cells">
            <div className="flex justify-center items-center">
              <SpinnerInfinity
                size={200}
                speed={110}
                thickness={41}
                color="#09090b"
                secondaryColor="#cad0d8"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default LoadingTable;
