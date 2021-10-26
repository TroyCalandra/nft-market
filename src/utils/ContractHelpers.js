export const getAbi = async (address) => {
  const response = await fetch('/api/getAbi?' + new URLSearchParams({
    address: address
  }));
  const json = await response.json();
  return JSON.parse(json.result)
}

export const getContractMetadata = async (url, tokenId) => {
  const response = await fetch('/api/getContractMetadata?' + new URLSearchParams({
    url: url,
    tokenId: tokenId
  }));
  return await response.json();
}

export const getTokenMetadata = async (contract, tokenId) => {
  const tokenURI = await contract.methods.tokenURI(tokenId).call({from: '0x0000000000000000000000000000000000000000'});
  return await getContractMetadata(tokenURI, tokenId);
}