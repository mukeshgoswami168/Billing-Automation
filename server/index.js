const express = require('express');
const cors = require('cors');
const axios = require('axios');
const genertaeHTML = require('./invoice.js');
require("dotenv").config();
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.post('/generate-invoice', async (req, res) => {
    console.log(req.body.email)
    let html = genertaeHTML(req.body.invoiceData.plan,req.body.invoiceData.date,req.body.invoiceData.amount,req.body.name)
    if (!req.body) {
        return res.status(400).send('Invalid request data');
      }
    axios.post(process.env.ZAP_URL,{email: req.body.email, subject: `Regarding Invoice Details for your ${req.body.invoiceData.plan} Plan`, body: html}, {
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((response) => {
        res.status(200).send('Invoice sent successfully');
      })
      .catch((error) => {
        console.error('Error sending data to Zapier:', error);
        res.status(500).send('Internal server error');
      });
  }
  );
app.get('/usageAndBilling', (req, res) => {
    const jsonData = require('./data.json');
    res.json(jsonData);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
