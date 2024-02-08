import * as bitcoin from 'bitcoinjs-lib';
import {networks} from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const networkModes = ['mainnet', 'testnet'] as const;
type NetworkModes = (typeof networkModes)[number];

export const bip32 = BIP32Factory(ecc);

export const generateWshMultisig = (network: NetworkModes, publicKeys: string[], threshold: number) => {
  // threshold can intentionally be 1 or equal to publicKeys.length, users will get a warning on the frontend when creating a multisig
  if (threshold > publicKeys.length || threshold <= 0) {
    throw new Error('Wrong threshold');
  }
  if (publicKeys.length === 0) {
    throw new Error('Empty parameter passed');
  }
  // 1 of 1 multisig is also possible, sometimes it is needed as an additional protection layer
  if (publicKeys.length < 1) {
    throw new Error('Invalid amount of public keys');
  }
  if (publicKeys.length > 16) {
    throw new Error('Maximum amount of public keys exceeded');
  }

  const networkObj = network === "mainnet" ? networks.bitcoin : networks.testnet;

  const p2ms = bitcoin.payments.p2ms({
    m: threshold,
    pubkeys: publicKeys
        .map(p => Buffer.from(p, "hex"))
        .sort((a, b) => a.compare(b)),
    network: networkObj
  });
  const p2wsh = bitcoin.payments.p2wsh({redeem: p2ms, network: networkObj});

  const output = p2wsh.output;
  const address = p2wsh.address;
  const redeem = p2wsh.redeem;

  if (!redeem?.output || !address || !output) {
    throw new Error('Multisig generation error');
  }

  const witness = redeem.output;

  return {
    witness,
    output,
    address
  }
}
