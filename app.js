const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

const { addReward } = require('./controller/validation');

const cron = require('node-cron');

const app = express();

app.use(express.urlencoded({extended: true }));

app.use(bodyParser.json()); //JSON.parse(jsonString) to convert a JSON string into a JavaScript object.

const eventRouter = require("./routes/endpoints");

const cors = require('cors'); 

app.use(cors({
    origin: '*', // allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
  

app.use(express.json());

app.use("/api",eventRouter);


const port = 8000;

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error in runnig the server: ${port}`);
    }

    console.log(`Server is running on port: ${port}`);

});

cron.schedule('* * * * *', async () => {
    try {
      await addReward();
    } catch (error) {
      console.error('Error occurred during addReward:', error);
    }
  });
  