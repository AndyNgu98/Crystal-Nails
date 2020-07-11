var express                     = require('express');
var router                      = express.Router();
var axios                       = require('axios');
var config                      = require('../config');
var mysql                       = require('mysql');
var pool                        = mysql.createPool(config.keys.db);

router.post('/', function(req, res, next) {

    // let sqlQueryUser            =   `INSERT INTO users SET ?`;
    // let sqlQueryMessage         =   `INSERT INTO messages SET ?`;
    let sqlQueryUserLookUp      =   `SELECT * FROM users WHERE email = ?`;
    const sqlInsert = table => `INSERT INTO ${table} SET ?` 


    //person data
    const person = {
        name: req.body.data.name,
        phone: req.body.data.phone,
        message: req.body.data.message,
        email: req.body.data.email

    }

    // const test = (config) => {
    //     console.log(config.message)
    //     console.log(config.email)
    // }

    // code fragment
    var data = {
        service_id: config.keys.emailjs.serviceId,
        template_id: config.keys.emailjs.templateId,
        user_id: config.keys.emailjs.userId,
        template_params: {
            email: person.email,
            message_html: person.message,
            from_name: person.name,
            phone: person.phone
        }
    };


    //SEND EMAIL
    function sendEmail(url, config) {
        axios.post(url, config)
        .then( response => {
            console.log(response.status);
        })
        .catch( err => {
            console.log(err);
        });
        
        res.end()
    }

    //connect to database
    pool.getConnection( (err, connection) => {

        //user check if already exist
        connection.query(sqlQueryUserLookUp, person.email, (err, result) => {
            if(err) return console.error(err.message);

            //IF user doesnt exist 
            if(result.length === 0) {

                //create user
                const user = { name: person.name, email: person.email, number: person.phone }
                connection.query(sqlInsert(`users`), user, (err, result) => { 
                    if(err) {
                        console.log(err);
                    } else { 

                        //then create message
                        const message = { id: result.insertId, email: person.email, message: person.message }
                        connection.query(sqlInsert(`messages`), message, (err, result ) => {
                            if(err) return console.error(err.message);
                            console.log(result)
                        })
                        sendEmail('https://api.emailjs.com/api/v1.0/email/send', data);
                    } 
                }); 
            } else { 
                
                // if user exists insert only message
                // create message
                const message = { id: result[0].id, email: result[0].email, message: person.message }
                connection.query(sqlInsert(`messages`), message, (err, result ) => {
                    if(err) return console.error(err.message);
                    console.log(result)

                    sendEmail('https://api.emailjs.com/api/v1.0/email/send', data);
                })
            }
        });
        connection.release();
    });

    console.log(req.body)
    
res.status(200).send("succes")
});








// router.post('/', function(req, res, next) {

//     let sqlQueryUser            =   `INSERT INTO users SET ?`;
//     let sqlQueryUserLookUp      =   `SELECT * FROM users WHERE email = ?`;
//     let sqlQueryMessage         =   `INSERT INTO messages SET ?`;

//     const person = {
//         name: req.body.data.name,
//         phone: req.body.data.phone,
//         message: req.body.data.message,
//         email: req.body.data.email

//     }

//     // code fragment
//     var data = {
//         service_id: config.keys.emailjs.serviceId,
//         template_id: config.keys.emailjs.templateId,
//         user_id: config.keys.emailjs.userId,
//         template_params: {
//             email: person.email,
//             message_html: person.message,
//             from_name: person.name,
//             phone: person.phone
//         }
//     };

//     //connect to database
//     pool.getConnection( (err, connection) => {

//         //user check if already exist
//         connection.query(sqlQueryUserLookUp, person.email, (err, result) => {

//             if(err) return console.error(err.message);

//             //IF user doesnt exist 
//             if(result.length === 0) {

//                 //create user
//                 const user = {
//                     name: person.name,
//                     email: person.email,
//                     number: person.phone
//                 }
//                 connection.query(sqlQueryUser, user, (err, result) => { 
//                     if(err) {
//                         console.log(err);
//                     } else { 
//                         const message = {
//                             id: result.insertId,
//                             email: person.email,
//                             message: person.message
//                         }

//                         //create message
//                         connection.query(sqlQueryMessage, message, (err, result ) => {
//                             if(err) return console.error(err.message);
//                             console.log(result)
//                         })

//                         //send email
//                         axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
//                             .then( response => {
//                                 console.log(response.status);
//                             })
//                             .catch( err => {
//                                 console.log(err);
//                             });
                            
//                             res.end()
//                     } 
//                 }); 
//             } else { // if user exists insert only message
//                 const message = {
//                     id: result[0].id,
//                     email: result[0].email,
//                     message: person.message
//                 }

//                 // create message
//                 connection.query(sqlQueryMessage, message, (err, result ) => {
//                     if(err) return console.error(err.message);
//                     console.log(result)

//                     //send email
//                     axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
//                     .then( response => {
//                         console.log(response.status);
//                     })
//                     .catch( err => {
//                         console.log(err);
//                     });
                    
//                     res.end()
//                 })
//             }
//         });
//         connection.release();
//     });

//     console.log(req.body)
    
// res.status(200).send("succes")
// });

module.exports = router;