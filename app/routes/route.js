const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config');
const fs = require('fs');

const etherscan_endpoint = config.etherscanEndpoint;
const apiKey = config.etherscanApiKey;

const getEtherscanUrl = () => {
  return etherscan_endpoint + '&apikey=' + apiKey;
}

router.get('/health', (req, res) => { 
  res.status(200).send({status: 200, message: 'success'})
})

router.get('/getAbi', async (req, res) => {
  const url = getEtherscanUrl() + '&address=' + req.query.address;

  try {
    const response = await axios.get(url)
    res.send({...response.data})
  } catch (error) {
    console.error(error);
    res.send({message: error});
  }
})

router.get('/getContractMetadata', async (req, res) => {
    try {
      const response = await axios.get(req.query.url);
      
      if (response.data && response.data.html) {
        const html = await axios.get(response.data.html);
        fs.writeFile('tmp/snake.html', html.data, (err) => {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      }
      res.send({...response.data})
    } catch (error) {
      console.error(error);
      res.send({message: error});
    }
})

module.exports = router;