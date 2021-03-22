import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import Spinner from '../Spinner/Spinner';
import defaultAbi from '../abis/NiftyBuilderInstance.json';
import './ContractInput.css';
const contractAddress = '0x8825dd9237a3a3d4f768a826bccfa161d36fbedf';

const ContractInput = () => {
  const [json, setJson] = useState({});
  const [fields, setFields] = useState({});


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
    setJson(json);
  }

  useEffect(() => {
    async function getTokenURI() {
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const abi = await getAbi(contractAddress) || defaultAbi.abi;
      const contract = new web3.eth.Contract(abi, contractAddress)
      const totalSupply = await contract.methods.totalSupply().call({from: '0x0000000000000000000000000000000000000000'});
      const tokenURI = await contract.methods.tokenURI('30500010038').call({from: '0x0000000000000000000000000000000000000000'});
      await getContractMetadata(tokenURI);
    }
    getTokenURI();
  }, []);

  const handleChange = (name, value) => {
    setFields({...fields, [name]: value})
  }

  const handleClick = async () => {
    const contractAddress = fields['contract-address'];
    const tokenId = fields['token-id'];
    const web3 = window.web3;
    const abi = await getAbi(contractAddress) || defaultAbi.abi;
    const contract = new web3.eth.Contract(abi, contractAddress);
    const tokenURI = await contract.methods.tokenURI(tokenId).call({from: '0x0000000000000000000000000000000000000000'});
    await getContractMetadata(tokenURI);
  }

  return (
    <div className="card">
    {console.log(json)}
      <div className="search-container flex flex-wrap flex-col sm:flex-nowrap justify-center">
        <div>
          <InputBox 
            name={"contract-address"} 
            placeholder={'0x8825dd9237a3a3d4f768a826bccfa161d36fbedf'} 
            onChange={handleChange} 
          />
          <InputBox 
            name={"token-id"} 
            placeholder={'30500010038'} 
            onChange={handleChange} 
          />
        </div>
        <Button 
          content={'Search'} 
          onClick={handleClick} 
        />
      </div>
      <div className="contract-metadata">
        {!json.image && <Spinner />}
        <div className="contract-image">
          <img src={json.image} />
        </div>
        <div className="contract-data">
          <div className="contract-name">
            <h2>{json.name}</h2>
          </div>
          <div className="contract-description">
            <p>{json.description}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ContractInput;