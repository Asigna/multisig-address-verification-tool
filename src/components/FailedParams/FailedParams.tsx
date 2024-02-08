import { BigButton } from "../Buttons";
import { HeadCard } from "../HeadCard";
import FailedIcon from "../../assets/images/failed.svg";
import classes from "./FailedParams.module.scss";

export const FailedParams: React.FC = () => {
  return (
    <div className={classes.container}>
      <HeadCard
        title="Failed to parse parameters"
        text="Please check the entered data and try again."
        icon={FailedIcon}
      />
      <BigButton text="asigna.io" onClick={() => <></>} />
    </div>
  );
};
