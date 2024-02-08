import * as bitcoin from 'bitcoinjs-lib';
import * as schnorr from 'bip-schnorr';
import { Taptree } from 'bitcoinjs-lib/src/types';
import { toXOnly } from 'bitcoinjs-lib/src/psbt/bip371';
import { Network } from 'bitcoinjs-lib';

export const generateMultisigAddress = async (leafPubkeys: string[], threshold: number, network: Network) => {
  if (leafPubkeys.length < 1) {
    throw new Error('Incorrect number of leaf public keys');
  }

  if (threshold > leafPubkeys.length || threshold <= 0) {
    throw new Error('Incorrect threshold');
  }

  let leafScriptAsm = `${toXOnly(Buffer.from(leafPubkeys[0], 'hex')).toString('hex')} OP_CHECKSIG`;
  if (leafPubkeys.length > 1) {
    leafPubkeys.slice(1).forEach(p => (leafScriptAsm += ` ${toXOnly(Buffer.from(p, 'hex')).toString('hex')} OP_CHECKSIGADD`));
    leafScriptAsm += ` OP_${threshold} OP_NUMEQUAL`;
  }

  const leafScript = bitcoin.script.fromASM(leafScriptAsm);
  const scriptTree: Taptree = {
    output: leafScript,
  };
  const redeem = {
    output: leafScript,
    redeemVersion: 192,
  };
  const muSig = schnorr.muSig;
  const convert = schnorr.convert;
  const pubKeyHash = muSig.computeEll(leafPubkeys.map(p => toXOnly(Buffer.from(p, 'hex'))));
  const pkCombined = muSig.pubKeyCombine(
    leafPubkeys.map(p => toXOnly(Buffer.from(p, 'hex'))),
    pubKeyHash,
  );
  const initialPubkey = convert.intToBuffer(pkCombined.affineX);
  const { output, address, witness } = bitcoin.payments.p2tr({
    internalPubkey: initialPubkey,
    scriptTree,
    redeem,
    network: network,
  });
  return { output, address, witness, internalPublicKey: initialPubkey, redeem };
};
