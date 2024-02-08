import { addressFromPublicKeys, AddressHashMode, addressToString, AddressVersion, createStacksPublicKey } from '@stacks/transactions';

export enum StxChain {
  STX_TESTNET_CHAIN = 'stx:testnet',
  STX_MAINNET_CHAIN = 'stx:mainnet',
}

export class HttpException extends Error {
  public status: number;
  public message: any;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const generateMultiSigAddress = (publicKeys: string[], threshold: number, chain: StxChain) => {
  if (publicKeys.length < 1) {
    throw new Error('Incorrect number of public keys');
  }

  if (threshold > publicKeys.length || threshold <= 0) {
    throw new Error('Incorrect threshold');
  }
  let multisigNet = AddressVersion.TestnetMultiSig;
  switch (chain) {
    case StxChain.STX_MAINNET_CHAIN:
      multisigNet = AddressVersion.MainnetMultiSig;
      break;
    case StxChain.STX_TESTNET_CHAIN:
      multisigNet = AddressVersion.TestnetMultiSig;
      break;
    default:
      throw new HttpException(403, 'Incorrect chain');
  }
  const stacksPublicKeys = publicKeys.map(createStacksPublicKey);

  const signer = addressFromPublicKeys(multisigNet, AddressHashMode.SerializeP2SH, threshold, stacksPublicKeys);
  return addressToString(signer);
};
