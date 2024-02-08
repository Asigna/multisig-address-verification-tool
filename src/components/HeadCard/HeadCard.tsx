import classes from "./HeadCardStyles.module.scss";
import classNames from "classnames";

type Props = {
  title: string;
  text: JSX.Element | string;
  icon: string;
  isSuccess?: boolean;
  className?: string;
};
export const HeadCard = ({
  title,
  text,
  icon,
  isSuccess = false,
  className,
}: Props) => {
  return (
    <div className={classNames(classes.component, className || "")}>
      <img src={icon} alt="" className={classes.icon} />
      <h3 className={classNames(classes.title, isSuccess && classes.success)}>
        {title}
      </h3>
      <div className={classes.text}>{text}</div>
    </div>
  );
};
