import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import Spinner from '../Spinner/Spinner';
import './ContractInput.css';

//Default Values
const contractAddress = '0x98da7c05c5320636b9b40ce36f704466b1c90b9f';
const tokenId = '1';


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

  const handleChange = (name, value) => {
    setFields({...fields, [name]: value})
  }

  const handleClick = async () => {
    const abi = await getAbi(fields['contract-address']);
    const contract = new window.web3.eth.Contract(abi, fields['contract-address']);
    const tokenURI = await contract.methods.tokenURI(fields['token-id']).call({from: '0x0000000000000000000000000000000000000000'});
    await getContractMetadata(tokenURI);
  }

  const getTokenURIOnLoad = async () => {
    await loadWeb3();
    const abi = await getAbi(contractAddress);
    const contract = new window.web3.eth.Contract(abi, contractAddress)
    const tokenURI = await contract.methods.tokenURI(tokenId).call({from: '0x0000000000000000000000000000000000000000'});
    await getContractMetadata(tokenURI);
  }

  useEffect(() => {
    getTokenURIOnLoad();
  }, []);

  return (
    <div className="card">
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
      <button onClick={() => window.open('http://localhost:3001/games/snake.html', '_blank')}>Play Now</button>
    </div>
  )

}

export default ContractInput;