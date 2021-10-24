import React from 'react';
import Button from '../Button/Button';
import './TokenCard.css';

const TokenCard = (props) => {
  const baseURL = window.location.href === "http://localhost:3000/" ? "http://localhost:3001/" : "/";

  return (
      <div key={props.token.id}>
        <div className="contract-image m-auto" style={{maxWidth: 200, background: 'black', minHeight: 200}}>
          <img className="rounded-xl" alt={props.token.name + ' Image'} src={props.token.image} />
        </div>
        <div className="text-left m-auto" style={{maxWidth: 200}}>
          <div className="text-2xl" style={{minHeight: 64}}>
            <h2>{props.token.name}</h2>
          </div>
          <div className="contract-description">
            <p>{props.token.description}</p>  
          </div>
          <Button content={"Buy Token"} onClick={() => props.purchaseToken(props.token.id)} />
          <div className="my-2">
            {props.token.html && 
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={() => window.open(baseURL + 'games/' + props.token.name + '.html', '_blank')}
              >
              Play Now
            </button>
            }
          </div>
          <div className="my-2">
            {false && props.token.html && 
            <a 
              href={'https://goerli.etherscan.io/token/' + props.token.contractAddress}
              target='__blank'>
              Etherscan
            </a>
            }
          </div>
        </div>
      </div>
    )
}
export default TokenCard;