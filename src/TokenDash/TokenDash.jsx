import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import TokenCards from '../TokenCards/TokenCards';
import Spinner from '../Spinner/Spinner';
import Button from '../Button/Button';
import { getAbi, getTokenMetadata } from '../utils/ContractHelpers';
import './TokenDash.css';

//Default Values
const arcadeAddress = '0x2952B7A89a567a89C49f3F0511Bc4946bEcA3FF1';
const salesAddress = '0xAC1C28F24d615Dd84be6B8c9647BDE25C22534e5';

const TokenDash = () => {
  const [userAddress, setUserAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const setMetaDataArrayOnLoad = async () => {
    await loadWeb3();
    const abi = await getAbi(arcadeAddress);
    const contract = new window.web3.eth.Contract(abi, arcadeAddress)
    let tokenMetadata = [];
    for(let i = 0; i < 5; i++) {
      const result = await getTokenMetadata(contract, i);
      tokenMetadata = [...tokenMetadata, {...result, id: i}];
    }
    setTokens(tokenMetadata);
  }

  useEffect(() => {
    setMetaDataArrayOnLoad();
  }, []);

  const connectToMetaMask = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setUserAddress(accounts[0])
  }

  const purchaseToken = async (tokenId) => {
    const abi = await getAbi(salesAddress);
    const contract = new window.web3.eth.Contract(abi, salesAddress);
    const data = await contract.methods.purchaseToken(tokenId).encodeABI()
    const params = [
      {
        from: userAddress,
        to: contract.options.address,
        gas: '0x76C0', // 30400
        gasPrice: '0x09184e72a000', // 10000000000000
        value: '0xc8',
        data: data,
      },
    ];
    try {
      await window.ethereum.request({method: 'eth_sendTransaction', params: params});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
        <div style={{margin: '1rem 2rem 2rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end'}}>
          <div style={{maxWidth: '30.75rem', height: '3.5rem'}}>
            <span style={{fontSize: '0.875rem', fontWeight: 500}}>
              {userAddress && 'Connected to ' + userAddress 
              || <Button className="bg-fuchsia-100 border-fuchsia-100 text-shell-100" content={"Connect to Wallet"} onClick={connectToMetaMask} />}
            </span>
          </div>
        </div>
        <TokenCards tokens={tokens} purchaseToken={purchaseToken} />
        {tokens < 1 && <Spinner />}
    </div>
  )

}

export default TokenDash;