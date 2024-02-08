import React, { useEffect, useMemo, useState } from "react";
import { useRouteParams } from "./useRouteParams";
import { networks } from "bitcoinjs-lib";
import { Welcome } from "../../components/Welcome";
import { FailedParams } from "../../components/FailedParams";
import classes from "./MainPage.module.scss";
import { Header } from "../../components/Header";
import { Wrapper } from "../../components/Wrapper";

import ErrorIcon from "../../assets/images/error.svg";
import VerifiedIcon from "../../assets/images/verified.png";
import { HeadCard } from "../../components/HeadCard";
import { NoteCard } from "../../components/NoteCard";
import { CopyButton } from "../../components/Buttons";
import classNames from "classnames";
import { uniqueId } from "lodash";
import { generateMultisigAddress as generateTaprootMultisigAddress } from "../../utils/generateTaprootMultisigAddress";
import {
  StxChain,
  generateMultiSigAddress as generateStacksMultiSigAddress,
} from "../../utils/generateStacksMultisigAddress";
import { generateWshMultisig as generateWshMultisigAddress } from "../../utils/generateWshMultisigAddress";
import { validatePubKeyAndAddress } from "../../utils/publicKeyHelper";
import * as bitcoin from "bitcoinjs-lib";
import {
  TransactionVersion,
  getAddressFromPublicKey,
} from "@stacks/transactions";
import P2trIcon from "../../assets/images/p2tr.svg";
import P2wshIcon from "../../assets/images/p2wsh.svg";
import BtcIcon from "../../assets/images/btc.png";
import StxIcon from "../../assets/images/stx.png";

export const MainPage: React.FC = () => {
  const [calculatedStatus, setCalculatedStatus] = useState<
    "loading" | "error" | "success"
  >("loading");

  const { params, isValid } = useRouteParams();

  const isEmptyParams = useMemo(
    () => Object.keys(params).length === 0,
    [params],
  );

  const isMainnet = params.network === "mainnet";
  const [calculatedAddress, setCalculatedAddress] = useState("");
  const [calculatedError, setCalculatedError] = useState("");

  const isBitcoinAddressesValid = useMemo(() => {
    if (params.chain !== "BTC") {
      return true;
    }

    if (!params.ownerAddresses || !params.publicKeys || (params.ownerAddresses?.length !== params?.publicKeys?.length)) {
      return false;
    }
    for (let i = 0; i < params.ownerAddresses.length; i++) {
      try {
        validatePubKeyAndAddress(
          params.publicKeys[i],
          params.ownerAddresses[i],
          params.network === "mainnet"
            ? bitcoin.networks.bitcoin
            : bitcoin.networks.testnet,
        );
      } catch (e) {
        return false;
      }
    }
    return true;
  }, [params]);

  useEffect(() => {
    if (!isValid || isEmptyParams || !isBitcoinAddressesValid) return;
    (async function () {
      let address = "";
      try {
        if (params.chain === "BTC") {
          const response =
            params.safeType === "TAPROOT"
              ? await generateTaprootMultisigAddress(
                  params.publicKeys!,
                  params.threshold!,
                  isMainnet ? networks.bitcoin : networks.testnet,
                )
              : generateWshMultisigAddress(
                  isMainnet ? "mainnet" : "testnet",
                  params.publicKeys!,
                  params.threshold!,
                );
          address = response.address || "";
        } else {
          address = generateStacksMultiSigAddress(
            params.publicKeys!,
            params.threshold!,
            isMainnet ? StxChain.STX_MAINNET_CHAIN : StxChain.STX_TESTNET_CHAIN,
          );
        }
        setCalculatedAddress(address || "");
      } catch (e) {
        setCalculatedError("Error generating address");
      }
    })();
  }, [params, isValid, isMainnet, isEmptyParams, isBitcoinAddressesValid]);

  useEffect(() => {
    if (!calculatedAddress) return;
    setCalculatedStatus(
      calculatedAddress === params.address && calculatedError === ""
        ? "success"
        : "error",
    );
  }, [calculatedAddress, params, calculatedError]);
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>
        <Wrapper className={classes.wrapper}>
          {!isEmptyParams && (!isValid || !isBitcoinAddressesValid) ? (
            <FailedParams />
          ) : (
            <></>
          )}
          {isEmptyParams ? <Welcome /> : <></>}
          <div className={classes.container}>
            {calculatedStatus !== "loading" && (
              <div className={classes.container}>
                {calculatedStatus === "success" ? (
                  <HeadCard
                    title="Your address successfully verified"
                    text={
                      <>
                        <span>The Verification Tool</span> is an open-source
                        utility designed to ensure that a multisig address is
                        solely composed of designated owners and is free from
                        any unauthorized internal or external keys that might
                        permit access without the consent of the owners.
                      </>
                    }
                    icon={VerifiedIcon}
                    isSuccess
                  />
                ) : (
                  <HeadCard
                    title={
                      calculatedError === ""
                        ? "Verification failed. Address doesn't match"
                        : `Verification failed. ${calculatedError}.`
                    }
                    text="Please check the entered data and try again."
                    icon={ErrorIcon}
                  />
                )}
              </div>
            )}
            {calculatedStatus !== "loading" && (
              <div className={classes.dataCard}>
                <div className={classes.headRow}>
                  <div className={classes.headItem}>
                    Network{" "}
                    <img
                      className={classes.chain}
                      src={params.chain === "BTC" ? BtcIcon : StxIcon}
                      alt=""
                    />
                    <span className={classes.network}> {params.network}</span>
                  </div>
                  <div className={classes.headItem}>
                    Safe type{" "}
                    {params.chain === "STX" ? (
                      <span>Native</span>
                    ) : (
                      <>
                        {params.safeType === "TAPROOT" ? (
                          <span>
                            <img src={P2trIcon} alt="" />
                            Taproot (P2TR)
                          </span>
                        ) : (
                          <span>
                            <img src={P2wshIcon} alt="" />
                            Native SegWit (P2WSH)
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={classes.dataItem}>
                  <div className={classes.dataColumn}>
                    <div className={classes.caption}>Safe address</div>
                    <div
                      className={classNames(
                        classes.value,
                        calculatedStatus !== "success" &&
                          calculatedError === "" &&
                          classes.valueError,
                      )}
                    >
                      {params.address || ""}
                    </div>
                  </div>
                  <div className={classes.dataColumn}>
                    <div className={classes.caption}>Expected address</div>
                    <div className={classes.value}>{calculatedAddress}</div>
                  </div>
                  <div className={classes.dataColumn}>
                    <div className={classes.caption}>
                      Confirmation threshold
                    </div>
                    <div className={classes.value}>
                      <span
                        className={classNames(
                          classes.threshold,
                          Number(params.threshold) >
                            Number(params.publicKeys?.length) &&
                            classes.thresholdError,
                        )}
                      >
                        {params.threshold || ""}
                      </span>{" "}
                      <span className={classes.threshold}>
                        / {params.publicKeys?.length || ""}
                      </span>{" "}
                      Owners
                    </div>
                  </div>
                  <div className={classes.hr} />
                </div>
                {params.publicKeys?.map((publicKey, index) => {
                  const addr =
                    params?.chain === "BTC"
                      ? params?.ownerAddresses?.[index]
                      : getAddressFromPublicKey(
                          publicKey,
                          params?.network === "mainnet"
                            ? TransactionVersion.Mainnet
                            : TransactionVersion.Testnet,
                        );
                  return (
                    <div className={classes.dataItem} key={uniqueId(publicKey)}>
                      <div className={classes.dataTitle}>Owner {index + 1}</div>
                      <div className={classes.dataColumn}>
                        <div>
                          <div className={classes.caption}>Address</div>
                          <div className={classes.value}>
                            {addr}
                            <CopyButton address={addr || ""} />
                            {/* <LinkButton address={addr || ""} /> */}
                          </div>
                        </div>
                        <div>
                          <div className={classes.caption}>publicKey</div>
                          <div className={classes.value}>{publicKey}</div>
                        </div>
                      </div>
                      {index < 2 && <div className={classes.hr} />}
                    </div>
                  );
                })}
              </div>
            )}
            {calculatedStatus !== "loading" && (
              <NoteCard chain={params.chain} safeType={params.safeType} />
            )}
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
