import * as LitJsSdk from '@lit-protocol/lit-node-client';

const client = new LitJsSdk.LitNodeClient({});
const chain = "sepolia";

class Lit {
  private litNodeClient: any

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }
}

export default new Lit()

const encrypt = async (file: File, authorizedWalletAddress: string) => {
  const authSig = await LitJsSdk.checkAndSignAuthMessage({
    chain: chain,
  });
  // only allow the authorized wallet address to have access to the file contents
  const accessControlConditions = [
    {
      contractAddress: '0x02CcFA1f950CDBde440a035025677F4d170abebF',
      standardContractType: '',
      chain: chain,
      method: 'checkForDisput',
      parameters: [':contractUuid'],
      returnValueTest: {
        comparator: '=',
        value: "true",
      },
    },
  ];
  const ipfsCid = await LitJsSdk.encryptToIpfs({
    authSig,
    accessControlConditions,
    chain: chain,
    file,
    litNodeClient: client,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID || '',
    infuraSecretKey: process.env.NEXT_PUBLIC_INFURA_SECRET_KEY || '',
  });
  return ipfsCid;
};

const decrypt = async (ipfsCid: string) => {
  const authSig = await LitJsSdk.checkAndSignAuthMessage({
    chain: 'ethereum',
  });
  return await LitJsSdk.decryptFromIpfs({
    authSig,
    ipfsCid,
    litNodeClient: client,
  });
};