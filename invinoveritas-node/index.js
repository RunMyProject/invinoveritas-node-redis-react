// Author: Edoardo Sabatini
// @25/10/2020
// ************************ 
//
// Server Initializing...
//
const nodejsPort = 8081
const redisPort  = 6379
const myAPI = "/invinoveritas"
const redis = require('redis')
const async = require("async")
const lodash = require('lodash')
//
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
//
const client = redis.createClient({
    host: 'redis-server',
    port:  redisPort
})
//
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//

// createUniqueId
//
const { v4: uuidv4 } = require('uuid');

// getLastDate
//
var getLastDate = function() {

	// current date object
	//
	let date_ob = new Date()

	// current date
	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2)
	
	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
	
	// current year
	let year = date_ob.getFullYear()
	
	// current hours
	let hours = date_ob.getHours()
	
	// current minutes
	let minutes = date_ob.getMinutes()
	
	// current seconds
	let seconds = date_ob.getSeconds()
	
	// get date in YYYY-MM-DD HH:MM:SS format
	//
	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)
}

// build wines
//
const buildWines = function() {

	const wines = [
		{
			id: "1",
			name: "Chardonnay",
			desc: "Lorem ipsum",
			img: "wine_1.png"
		},  
		{
			id: "2",
			name: "Merlot",
			desc: "Dolor Sit",
			img: "wine_2.png"
		},
		{
			id: "3",
			name: "Pinot Noir",
			desc: "Modi tempora",
			img: "wine_3.png"
		},
		{
			id: "4",
			name: "Chenin Blanc",
			desc: "Magnam aliquam",
			img: "wine_4.png"
		},
		{
			id: "5",
			name: "Nebbiolo",
			desc: "Ipsum quia",
			img: "wine_5.png"
		},
		{
			id: "6",
			name: "Cabernet Franc",
			desc: "Numquam eius",
			img: "wine_6.png"
		}
	]

	const winesStr = JSON.stringify(wines)

	client.hset("wines", "wines", winesStr, redis.print)
	client.hgetall("wines", (err, results) => {
		if(results) {
			console.log({"wines": JSON.parse(results.wines)})
		} else {
			console.log(err)
		}
	})
}

// build users
//
const buildUsers = function() {

	const userBody = {
		"user": 
				{ 
					uuid: uuidv4(),
					"email" : "test@test",
					"password": "test"
				}
	}

	const userStr = JSON.stringify(userBody)
	const username = userBody.user.email
	client.hset(username, "user", userStr, redis.print)
	client.hgetall(username, (err1, results1) => {
		if(results1) {
		   const userData = {userData: {uuid: userBody.user.uuid, wines: [], lastUpdate: getLastDate()}}
		   const userDataStr = JSON.stringify(userData)
		   client.hset(userBody.user.uuid, "userData", userDataStr, redis.print)
		   client.hgetall(userBody.user.uuid, (err2, results2) => {
				if(results2) {
					console.log({"results":[JSON.parse(results1.user),JSON.parse(results2.userData)]})
		   		} else {
					console.log(err2)
				}
			})
		} else {
			console.log(err1)
		}
	})
}

// deleteAll
//
app.delete(myAPI + '/deleteAll', (req, res) => {
	client.flushdb( function (err, succeeded) {
		console.log(succeeded); // will be true if successfull
		if(succeeded) {
		   res.json({deleteAll: "OK"})
		} else {
		   res.send(err)
		}
	})
})

// getUser /:username
//
app.get(myAPI + '/getUser/:username', (req, res) => {
	client.hgetall(req.params.username, (err, results) => {
		if(results) {
		   let u = JSON.parse(results.user)
		   res.json({uuid:u.user.uuid})
		} else {
		   res.send(err)
		}
	})
})

// addUser
//
app.post(myAPI + '/addUser', jsonParser, (req, res) => {
	req.body.user.uuid = uuidv4()
	const userStr = JSON.stringify(req.body)
	const username = req.body.user.email
	client.hset(username, "user", userStr, redis.print)
	client.hgetall(username, (err1, results1) => {
		if(results1) {
		   const userData = {userData: {uuid: req.body.user.uuid, wines: [], lastUpdate: getLastDate()}}
		   const userDataStr = JSON.stringify(userData)
		   client.hset(req.body.user.uuid, "userData", userDataStr, redis.print)
		   client.hgetall(req.body.user.uuid, (err2, results2) => {
				if(results2) {
					res.json({"results":[JSON.parse(results1.user),JSON.parse(results2.userData)]})
		   		} else {
					res.send(err2)
				}
			})
		} else {
		   res.send(err1)
		}
	})
})

// login
//
app.post(myAPI + '/login', jsonParser, (req, res) => {
	const username  = req.body.user.email
	const pwd      = req.body.user.password
	client.hgetall(username, (err1, results1) => {
		if(results1) {
		   let u = JSON.parse(results1.user)
		   if(u.user.password!=pwd) {
			res.send(err1)
		   }
		   else {
					client.hgetall(u.user.uuid, (err2, results2) => {
						if(results2) {
							res.json({"results":[JSON.parse(results1.user),JSON.parse(results2.userData)]})
						} 
						else {
							res.send(err2)
						}
					}) 
		   }
		} else {
		   res.send(err1)
		}
	})
})

// addWine
//
app.post(myAPI + '/addWine', jsonParser, (req, res) => {
	const wine = JSON.stringify(req.body.wine)
	const idWine = req.body.idWine
	client.hset(idWine, "wine", wine, redis.print)
	client.hgetall(idWine, (err, results) => {
		if(results) {
		   res.send(results)
		} else {
		   res.send(err)
		}
	})
})

// wines
/*
app.get(myAPI + '/wines', function (req, res) {
    var wines = []
    client.keys('*', function (err, keys) {
        if (err) return console.log(err)
        if(keys) {

            async.map(keys, function(key, cb) {
            
            	client.hgetall(key, (err, results) => {

		       if (err) return cb(err)
		       if(results) {
			   res.json({wine:JSON.parse(results.wine)})
			   cb(null, key)
		       }
		       
                    /*
                    var wine = {}               
                    wine['wine']=key
                    wine['data']=value
                    cb(null, wine)

            	
			if(results) {
			   res.json({wine:JSON.parse(results.wine)})
			} else {
			   res.send(err)
			}
		       client.get(key, function (error, value) {
		       })			
		     */
/*		     
		})
            }, function (err, results) {
               if (err) return console.log(err)
               console.log(results)
               res.json({data:results})
            })
        }
    })
})
*/

buildWines();
buildUsers();

// /wines
//
app.get(myAPI + '/wines', (req, res) => {
	client.hgetall("wines", (err, results) => {
		if(results) {
			res.json({"wines": JSON.parse(results.wines)})
		} else {
			res.send(err)
		}
	})
})

// /wine/:id
//
app.get(myAPI + '/wine/:id', (req, res) => {
	client.hgetall("wines", (err, results) => {
		if(results) {
			const wines = JSON.parse(results.wines)
			const wine = lodash.filter(wines, {'name': req.params.id});
			res.json({"wine": wine[0]})
		} else {
			res.send(err)
		}
	})
})

// buy
//
app.post(myAPI + '/buy', jsonParser, (req, res) => {

	const body = JSON.stringify(req.body)
	const uuid = req.body.uuid
	const winesSelected = req.body.winesSelected

	client.hgetall(uuid, (err, results) => {
		if(results) {
			let obj = JSON.parse(results.userData)
			obj.userData.wines.push({
				orderTime: getLastDate(),
				winesSelected: winesSelected
			})
			const userDataStr = JSON.stringify(obj)
			client.hset(uuid, "userData", userDataStr, redis.print)
			client.hgetall(uuid, (err2, results2) => {
				if(results2) {
					res.json({"results":[JSON.parse(results2.userData)]})
				}
				else {
					res.send(err2)
				}
			})
		}
		else {
			res.send(err)
		}
	})
})

app.listen(nodejsPort, () => {
  console.log('Listening on port ' + nodejsPort + "!!");
})
