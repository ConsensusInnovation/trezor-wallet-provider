import HookedWalletSubprovider from './hooked-wallet';
import TrezorWallet from './TrezorWallet';

export default async function (
  networkId,
  pathOverride,
) {
  if(networkId == null) {
    networkId = 1; //default to mainnet network id
  }
  const trezor = new TrezorWallet(
    networkId,
    pathOverride,
  );

  return new HookedWalletSubprovider(trezor);
}
