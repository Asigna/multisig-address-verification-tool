import { getAddressInfo } from "bitcoin-address-validation";
import * as bitcoinLib from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";
import { Buffer } from "buffer";

bitcoinLib.initEccLib(ecc);
export const validatePubKeyAndAddress = (
  publicKey: string,
  address: string,
  network: bitcoinLib.Network,
) => {
  try {
    const bufferPublicKey = Buffer.from(publicKey, "hex");
    const info = getAddressInfo(address);
    let validatedAddress: string | undefined = undefined;
    switch (info.type) {
      case "p2wpkh":
        validatedAddress = bitcoinLib.payments.p2wpkh({
          pubkey: bufferPublicKey,
          network,
        }).address;
        break;
      case "p2sh":
        validatedAddress = bitcoinLib.payments.p2sh({
          pubkey: bufferPublicKey,
          network,
          redeem: bitcoinLib.payments.p2wpkh({
            pubkey: bufferPublicKey,
            network,
          }),
        }).address;
        break;
      case "p2wsh":
        validatedAddress = bitcoinLib.payments.p2wsh({
          redeem: bitcoinLib.payments.p2wpkh({ pubkey: bufferPublicKey }),
        }).address;
        break;
      case "p2pkh":
        validatedAddress = bitcoinLib.payments.p2pkh({
          pubkey: bufferPublicKey,
          network,
        }).address;
        break;
      case "p2tr":
        validatedAddress = bitcoinLib.payments.p2tr({
          internalPubkey:
            bufferPublicKey.length === 32
              ? bufferPublicKey
              : bufferPublicKey.slice(1, 33),
          network,
        }).address;
        break;
      default: {
        throw new Error("Incorrect address type");
      }
    }
    if (address !== validatedAddress) {
      throw new Error("Incorrect address or public key");
    }

    return {
      address: validatedAddress,
      publicKey: publicKey,
      type: info.type,
      nework: info.network,
    };
  } catch (ex) {
    throw new Error("Ivalid address");
  }
};
