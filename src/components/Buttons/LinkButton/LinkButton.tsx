import classes from "./LinkButtonStyles.module.scss";
import classNames from "classnames";
import LinkIcon from "../../../assets/images/icon-link.svg";

type Props = {
  address: string;
  className?: string;
};
export const LinkButton = ({ address, className }: Props) => {
  return (
    <div
      className={classNames(classes.component, className || "")}
      onClick={() =>
        window.open(
          `https://explorer.hiro.so/txid/${address}?chain=mainnet`,
          `_blank`,
        )
      }
    >
      <img src={LinkIcon} alt="" />
    </div>
  );
};
