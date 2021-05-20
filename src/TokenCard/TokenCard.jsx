import React from 'react';
import './TokenCard.css';

const TokenCard = (props) => {

  return (
      <div className="test">
        <div className="contract-image">
          <img style={{borderRadius: '.875rem'}} src={props.token.image} />
        </div>
        <div style={{textAlign: 'left'}}>
          <div className="contract-name">
            <h2>{props.token.name}</h2>
          </div>
          <div className="contract-description">
            <p>{props.token.description}</p>  
          </div>
          <div className="my-2">
            {props.token.html && 
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={() => window.open('http://localhost:3001/games/' + props.token.name + '.html', '_blank')}
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