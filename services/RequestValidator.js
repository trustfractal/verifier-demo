import { utils as ethersUtils } from "ethers";
import { DIDContract, AttestedClaim } from "@trustfractal/sdk";

import { getEnv } from "../utils";

const ALLOWED_LEVELS = [
  "basic+liveness",
  "liveness+plus",
  "liveness+plus+wallet",
];

const ALLOWED_ATTESTERS = ["0xa372CA5A906f7FAD480C49bBc73453672d4d375d"];

const ETHEREUM_RPC_URL = getEnv("ETHEREUM_RPC_URL");
const ETHEREUM_NETWORK = getEnv("ETHEREUM_NETWORK");

const perform = async (request, signedNonce) => {
  const contract = new DIDContract(ETHEREUM_NETWORK, {
    providerUrl: ETHEREUM_RPC_URL,
  });

  const { signer, nonce, signature } = signedNonce;

  const attestedClaim = new AttestedClaim(request.credential);

  // validate if it's from trusted attester
  if (!ALLOWED_LEVELS.includes(request.level)) return false;

  // validate if it's from trusted attester
  if (!ALLOWED_ATTESTERS.includes(attestedClaim.attesterAddress)) return false;

  // validate signature
  if (
    !(
      ethersUtils.verifyMessage(nonce, signature).toLocaleLowerCase() === signer
    )
  ) {
    return false;
  }

  // validate integrity
  if (!attestedClaim.verifyIntegrity()) return false;

  // validate network
  if (!(await attestedClaim.verifyNetwork(contract))) return false;

  return true;
};

export default { perform };
