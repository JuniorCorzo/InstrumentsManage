import { ButtonHTMLAttributes } from "react";

interface Props {
  text: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  handleClick?: () => void;
  handleSubmit?: () => void;
}

const Button = ({ text, type, handleClick, handleSubmit }: Props) => {
  return (
    <button
      className="px-1.5 py-0.5 rounded-md bg-secondary text-background-color/80 cursor-pointer"
      type={type}
      onClick={handleClick}
      onSubmit={handleSubmit}
    >
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
