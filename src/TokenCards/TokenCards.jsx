import React from 'react';
import TokenCard from '../TokenCard/TokenCard';
import './TokenCards.css';

const TokenCards = (props) => {

    return (
      <div className="contract-metadata">
        {props.tokens.map((token) => <TokenCard key={token.id} token={token} purchaseToken={props.purchaseToken} />)}
      </div>
    )
}
export default TokenCards;