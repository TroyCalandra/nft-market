const express = require('express');
const axios = require('axios');
const router = express.Router();

const etherscan_endpoint = 'https://api.etherscan.io/api?module=contract&action=getabi'
const apiKey = '';

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
      res.send({...response.data})
    } catch (error) {
      console.error(error);
      res.send({message: error});
    }
})

module.exports = router;