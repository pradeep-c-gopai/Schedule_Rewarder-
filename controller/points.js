var pool = require('../database');

module.exports.getPoints = async function(req, res) {
   try{
          pool.query(
            `select * from points order by total_points desc;`,[],
            (err, result) => {
              if (err) {
                throw err;
              }
              
              return res.status(200).send({ result });
            }
          );
      
   }catch(err){ 
       res.send({responseCode : 500 , err : err.message});
   }
  }


  module.exports.getPointsByWallet = async function(req, res) {
    try{
           pool.query(
             `select * from points where signer = ?;`,[req.body.signer],
             (err, result) => {
               if (err) {
                 throw err;
               }
               
               return res.status(200).send({ result });
             }
           );
       
    }catch(err){ 
        res.send({responseCode : 500 , err : err.message});
    }
   }