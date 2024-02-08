export type Chain = "STX" | "BTC";
export type Network = "mainnet" | "testnet";
export interface RequestParams {
  ownerAddresses?: string[];
  safeType?: string;
  threshold?: number;
  publicKeys?: string[];
  address?: string;
  chain?: Chain;
  network?: Network;
}
export type RequestKeys = keyof RequestParams;
