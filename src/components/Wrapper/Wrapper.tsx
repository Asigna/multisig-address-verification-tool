import classes from "./WrapperStyles.module.scss";
import classNames from "classnames";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export function Wrapper({ className, children }: Props) {
  return (
    <div className={classNames(classes.wrapper, className)}>{children}</div>
  );
}
