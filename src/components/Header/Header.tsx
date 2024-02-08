import React from "react";
import classes from "./Header.module.scss";
import { uniqueId } from "lodash";
import Logo from "../../assets/images/logo.svg";
import LogoAsigna from "../../assets/images/logoAsigna.svg";
import { Wrapper } from "../Wrapper";
import { SimpleButton } from "../Buttons";

export const Header: React.FC = () => {
  const menuItems = [
    {
      title: "asigna.io",
      link: "https://asigna.io/",
      icon: "/images/link.svg",
      hide: false,
    },
    {
      title: "Audit Reports",
      link: "https://asigna.gitbook.io/asigna/appendix/asigna-audits",
      icon: "/images/link.svg",
      hide: false,
    },
    {
      title: "Documentation",
      link: "https://asigna.gitbook.io/asigna/bitcoin-multisig/quickstart",
      icon: "",
      hide: false,
    },
  ];

  return (
    <div className={classes.component}>
      <Wrapper className={classes.wrapper}>
        <div className={classes.logoWrapper}>
          <img src={Logo} alt="" />
          <h3 className={classes.txtLogo}>&</h3>
          <img src={LogoAsigna} alt="" />
        </div>
        <div className={classes.menuWrapper}>
          {menuItems
            .filter((menuItem) => !menuItem.hide)
            .map((menuItem) => (
              <SimpleButton
                key={uniqueId(menuItem.title)}
                text={menuItem.title}
                icon={menuItem.icon}
                onClick={() => window.open(menuItem.link, `_blank`)}
              />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};
