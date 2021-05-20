import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import TokenCards from '../TokenCards/TokenCards';
import Spinner from '../Spinner/Spinner';
import SearchBar from '../SearchBar/SearchBar';
import './ContractInput.css';

//Default Values
const contractAddress = '0x2952B7A89a567a89C49f3F0511Bc4946bEcA3FF1';
const defaultTokenId = '0';


const ContractInput = () => {
  const [fields, setFields] = useState({});
  const [tokens, setTokens] = useState([]);


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const getAbi = async (address) => {
    const response = await fetch('/api/getAbi?' + new URLSearchParams({
      address: address
    }));
    const json = await response.json();
    return JSON.parse(json.result)
  }

  const getContractMetadata = async (url) => {
    const response = await fetch('/api/getContractMetadata?' + new URLSearchParams({
      url: url
    }));
    const json = await response.json();
    return json;
  }

  const handleChange = (name, value) => {
    setFields({...fields, [name]: value})
  }

  const getTokenMetadata = async (contract, tokenId) => {
    const tokenURI = await contract.methods.tokenURI(tokenId).call({from: '0x0000000000000000000000000000000000000000'});
    return await getContractMetadata(tokenURI);
  }

  const handleClick = async () => {
    const abi = await getAbi(fields['contract-address']);
    const contract = new window.web3.eth.Contract(abi, fields['contract-address']);
    getTokenMetadata(contract, fields['token-id'])
  }

  const setMetaDataArrayOnLoad = async () => {
    await loadWeb3();
    const abi = await getAbi(contractAddress);
    const contract = new window.web3.eth.Contract(abi, contractAddress)
    let tokenMetadata = [];
    for(let i = 0; i < 3; i++) {
      const result = await getTokenMetadata(contract, i);
      tokenMetadata = [...tokenMetadata, result];
    }
    setTokens(tokenMetadata);
  }

  useEffect(() => {
    setMetaDataArrayOnLoad();
  }, []);

  return (
    <div className="card">
        {/* <SearchBar handleChange={handleChange} handleClick={handleClick}/> */}
        <TokenCards tokens={tokens} />
        {tokens < 1 && <Spinner />}
    </div>
  )

}

export default ContractInput;