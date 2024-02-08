import { BigButton } from "../Buttons";
import { HeadCard } from "../HeadCard";
import VerifyIcon from "../../assets/images/verify.png";

import classes from "./Welcome.module.scss";

export const Welcome: React.FC = () => {
  return (
    <div className={classes.container}>
      <HeadCard
        title="Verify your multisig Safe address"
        text={
          <>
            <span>The Verification Tool</span> is an open-source utility
            designed to ensure that a multisig address is solely composed of
            designated owners and is free from any unauthorized internal or
            external keys that might permit access without the consent of the
            owners.
          </>
        }
        icon={VerifyIcon}
      />
      <BigButton
        text="asigna.io"
        onClick={() => window.open("https://asigna.io/", `_blank`)}
      />
    </div>
  );
};
