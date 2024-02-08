import classes from "./SimpleButtonStyles.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};
export const SimpleButton = ({
  text,
  icon,
  onClick,
  disabled,
  className,
}: Props) => {
  return (
    <button
      className={classNames(classes.component, className || "")}
      onClick={onClick && onClick}
      disabled={disabled}
    >
      <span className={classes.text}>{text}</span>
      {icon && <img src={icon} alt="" />}
    </button>
  );
};
