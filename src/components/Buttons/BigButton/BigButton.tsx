import classes from "./BigButtonStyles.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};
export const BigButton = ({ text, onClick, disabled, className }: Props) => {
  return (
    <button
      className={classNames(classes.component, className || "")}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={classes.text}>{text}</span>
    </button>
  );
};
