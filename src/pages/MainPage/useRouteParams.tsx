import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { RequestKeys, RequestParams } from "../../types";

export const useRouteParams = () => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const params: RequestParams = {};
    Array.from(searchParams).forEach((param) => {
      const paramName = param[0] as RequestKeys;
      const paramValue = param[1];
      try {
        if (paramName === "publicKeys") {
          params.publicKeys = JSON.parse(decodeURIComponent(paramValue));
          return;
        }
        if (paramName === "ownerAddresses") {
          params.ownerAddresses = JSON.parse(decodeURIComponent(paramValue));
          return;
        }
        if (paramName == "threshold") {
          params.threshold = Number(paramValue) + 0;
          return;
        }
        if (
          paramName === "network" &&
          (paramValue === "mainnet" || paramValue === "testnet")
        ) {
          params.network = paramValue;
          return;
        }
        if (
          paramName === "chain" &&
          (paramValue === "STX" || paramValue === "BTC")
        ) {
          params.chain = paramValue;
          return;
        }
        if (paramName === "address") {
          params.address = paramValue;
          return;
        }
        if (paramName === "safeType") {
          params.safeType = paramValue;
          return;
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    });
    return {
      params,
      isValid:
        !!params.address &&
        !!params.chain &&
        !!params.network &&
        !!params.publicKeys &&
        !!params.threshold,
    };
  }, [searchParams]);
};