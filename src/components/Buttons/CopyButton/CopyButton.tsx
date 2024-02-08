import classes from "./CopyButtonStyles.module.scss";
import classNames from "classnames";
import CopyIcon from "../../../assets/images/icon-copy.svg";

type Props = {
  address: string;
  className?: string;
};
export const CopyButton = ({ address, className }: Props) => {
  return (
    <div
      className={classNames(classes.component, className || "")}
      onClick={() => navigator.clipboard.writeText(address)}
    >
      <img src={CopyIcon} alt="" />
    </div>
  );
};
