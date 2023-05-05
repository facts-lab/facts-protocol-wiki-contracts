import { WarpFactory } from "warp-contracts";
import { DeployPlugin, ArweaveSigner } from "warp-contracts-plugin-deploy";

import fs from "fs";

async function deploy(folder) {
  const jwk = JSON.parse(
    fs.readFileSync(process.env["PATH_TO_WALLET"]).toString()
  );
  const warp = WarpFactory.forMainnet().use(new DeployPlugin());
  const contractSrc = fs.readFileSync(`${folder}/index.js`, "utf8");
  const stateFromFile = JSON.parse(
    fs.readFileSync(`${folder}/initial-state.json`, "utf8")
  );
  const initialState = {
    ...stateFromFile,
  };

  const deploy = await warp.deploy({
    wallet: new ArweaveSigner(jwk),
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });
  console.log(`contractTxId ${deploy.contractTxId}`);

}
deploy(process.argv[2]).catch(console.log);