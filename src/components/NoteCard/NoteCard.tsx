import classes from "./NoteCardStyles.module.scss";

type Props = {
  chain?: string;
  safeType?: string;
};

export const NoteCard = ({ chain, safeType }: Props) => {
  return (
    <div className={classes.component}>
      <div className={classes.title}>Address construction logic</div>
      {chain === "STX" ? (
        <div className={classes.note}>
          Stacks blockchain has a built-in multisig feature, allowing to create
          a different address type for the multisig use case. Asigna uses native
          approach, ensuring the security is as good as the Stacks blockchain
          itself.
        </div>
      ) : (
        <>
          {safeType === "TAPROOT" ? (
            <div className={classes.note}>
              Asigna Safe addresses utilize the Taproot Bitcoin Upgrade. Every
              Taproot address necessitates an internal public key to be passed
              as a single spender, which doesn't align well with a multisig
              solution. To circumvent this, we employ MuSafe public key
              generation derived from all owners' public keys. This effectively
              creates an 'everyone agrees' branch, introducing no additional
              risks for multisig owners.
            </div>
          ) : (
            <div className={classes.note}>
              Asigna WSH scripts are created for a more general use case which
              can be used with almost any bitcoin wallet, including hardware,
              desktop, and extensions. It is done through a standard sorted wsh
              multisig script.
            </div>
          )}
        </>
      )}
    </div>
  );
};
