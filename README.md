# Backend-for-React-Native-project
  ## Backend and API + Authentication.
  
  
  

   ### Goals:


    Describe the use of Node for server-side development
    Create a Node application
    Demonstrate the use of Node modules in developing a Node application
    Develop a simple REST API server using the Express framework
    
    Demonstrate an understanding of data persistence using a database
    Design persistent data storage based on MongoDB, a NoSQL database
    Develop schemas and models for data storage using Mongoose
    Combine the REST API and the data persistance layer for a full-fledged server implementation
    
    Demonstrate the need for user authentication
    Evaluate varioius alternative approaches for supporting user authentication
    Develop a comprehensive user authentication system using Passport
    Develop a secure server based on the HTTPS protocol
    

     REST API with express mongodb and Mongoose -done
     
     User login and authentication -done
     
     Basic Authentication -done
      
     Cookies, Express, Sessions and error handling. -done
     
     Mongoose Population -done
     
     HTTPS and Secure Communication -done      - Implemented Certificates -done
&nbsp;
&nbsp;
&nbsp;
&nbsp;

 # API description: 
 
    EXAMPLE api overview.

    GET , PUT , POST , DELETE implemented on the various routes where needed, authentication is done via authenticate.js

    http://localhost:3443/dishes/:dishId
    http://localhost:3443/promotions 
    http://localhost:3443/promotions/:promoId
    http://localhost:3443/leaders
    http://localhost:3443/leaders/:leaderId
    http://localhost:3443/leaders/:leaderId
    http://localhost:3443/favorites/
    http://localhost:3443/favorites/:dishId
    http://localhost:3443/uploads/
    http://localhost:3443/users/
    http://localhost:3443/users/signup
    http://localhost:3443/users/login
    http://localhost:3443/users/facebook/token
    http://localhost:3443/users/logout
    
    
# API usage guide 


# Make sure to check baseURLS in each project matches the exposed URL

    https://github.com/xAirx/Coursera-UniversityofHK-ReactNative/blob/master/ReactNative/confusion/shared/baseurl.js


    https://github.com/xAirx/Coursera-UniversityofHK-React/blob/master/confusion/src/shared/baseUrl.js
    
    
    --------- HOSTING --------
    
    https://medium.com/make-school/how-to-deploy-your-node-js-mongodb-app-to-the-web-using-heroku-63d4bccf2675 



# Starting Server & MongoDB 


	brew services list

	brew services stop mongodb-community 

	brew services start mongodb-community 



	########Mongo <-- access DB

	########Yarn start
	
	

	Commands: write help :D


	See active processes sudo lsof -iTCP -sTCP:LISTEN -n -P   


	sudo lsof -iTCP -sTCP:LISTEN | grep mongo

	show dbs
	use <db name>
	show collections
	choose your collection and type the following to see all contents of that collection:
	db.collectionName.find()


	> show dbs
	admin      0.000GB
	conFusion  0.000GB
	config     0.000GB
	local      0.000GB
	test       0.000GB

	> use conFusion
	switched to db conFusion

	> show collections
	dishes
	leaders
	promos
	users

	> db.leaders.find()
	{ "_id" : ObjectId("5dc03f889ec7ab72ab8070d7"), "featured" : true, "name" : "Alberto Somayya", "image" : "images/alberto.png", "designation" : "Executive Chef", "abbr" : "EC", "description" : "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!", "feedback" : [ { "_id" : ObjectId("5dc040b0e5b472733ca44b98"), "rating" : 3, "comment" : "Eat it, just eat it!", "author" : "Michael Jaikishan", "updatedAt" : ISODate("2019-11-04T15:16:00.435Z"), "createdAt" : ISODate("2019-11-04T15:16:00.435Z") } ], "createdAt" : ISODate("2019-11-04T15:11:04.315Z"), "updatedAt" : ISODate("2019-11-04T15:16:00.435Z"), "__v" : 0 }> 



 # User manual (for myself mainly)

	###Remove a user via mongo CLI 

		use conFusion server

		db.users.find()

		Example: db.users.remove({username :"  "}, {justOne:true})


	###using mongoDBCompass
		￼

![](https://imgur.com/6yjKsJp.png)

	
	
	###Register user 


		With CLI:

		Example: db.users.insert({“firstname: admin, “password”: “password”, “admin”: “false”})


		With Postman:

		https://localhost:3443/users/signup

![](https://imgur.com/IOLA55p.png)


	###Register admin 

		If we want to register an admin we have to do it either via CLI or via the mongoDB compass.


		 ###### Do not do it with CLI:

				// This makes the userdata appear as cleartext and not encrypted
				// hash and salt is automatically added by passportLocalMongooose.

				WORKS: db.users.insert({"username": "adminx", "password": "password", "admin": true})



		##### To register an user via postman 

				Via postman requires you to be logged in as admin

			
![](https://imgur.com/GTxXts2.png)
![](https://imgur.com/jodIRxv.png)

				Even if you pass admin as true via the postman call its not enabled.



		###### Via MongoDBCompass OR CLI ( Ensure only ADMINS can do it).


			To Update an existing user:

			db.users.update({“username”: “admin”}, {$set: {“admin”:true}})




		##### Login 
![](https://imgur.com/XmZFakp.png)
![](https://imgur.com/eKZ9R29.png)
		
		
		

		##### VerifyAdmin and VerifyUser is bugged. work in progress…


			
				Getting /users/ <— Admin protected route
				
![](https://imgur.com/c2yGeEE.png)



			
				POST /Dishes <- Admin protected
				
				
 ![](https://imgur.com/HhGN4CS)
				

		

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
     


## DevBranch  


	
### -----------------------HTTPS SECURE CONNECTION TO API------------------------ WORKS
	
				root/app.js
				
				// Secure traffic only
				app.all('*', (req, res, next) => {
				  if (req.secure) {
				    return next();
				  }
				  else {
				    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
				  }
				});
				
				
				wwww/bin
				
				/**
				 * Create HTTPS server.
				 */

				var options = {
				  key: fs.readFileSync(__dirname + '/private.key'),
				  cert: fs.readFileSync(__dirname + '/certificate.pem')
				};

				var secureServer = https.createServer(options, app);

				/**
				 * Listen on provided port, on all network interfaces.
				 */

				secureServer.listen(app.get('secPort'), () => {
				  console.log('Secure Server listening on port ', app.get('secPort'));
				});
				secureServer.on('error', onError);
				secureServer.on('listening', onListening);

				/**

	
	
### ------------------Mongoose Population------------------------- WORKS
	
			/models/user.js

			- express support for user registration and authentication -implemented



	
### ---------------CORS for express server---------------------------- WORKS.
		
			Check cors.js under routes under Devbranch -implemented


			Whitelisting our HTTPS proxy

			const whitelist = ['http://localhost:3000', 'https://localhost:3443'];


	 
### ----------------PASSPORT JWT, PROTECT ROUTES, ETC--------------------- WORKS
	 
			 -Adding PASSPORT.
			

			root/authenticate.js
				exports.facebookPassport = passport.use(new FacebookTokenStrategy({
					clientID: config.facebook.clientId,
					clientSecret: config.facebook.clientSecret
				}, (accessToken, refreshToken, profile, done) => {
					User.findOne({ facebookId: profile.id }, (err, user) => {
						if (err) {
							return done(err, false);
						}
						if (!err && user !== null) {
							return done(null, user);
						}
						else {
							user = new User({ username: profile.displayName });

			
			-Session and Cookies, and Filestore -implemented 


				 http://localhost:3000/users/  - check UsersRouter under Devbranch

				 root/authenticate.js

					const passport = require('passport');
					// Exports a strategy that we can use for our application.
					const LocalStrategy = require('passport-local').Strategy;
					const User = require('./models/user');
					const JwtStrategy = require('passport-jwt').Strategy;
					const ExtractJwt = require('passport-jwt').ExtractJwt;
					const jwt = require('jsonwebtoken');
					var FacebookTokenStrategy = require('passport-facebook-token');
					const config = require('./config');



### ---Added post functionality for Dishes and Leaders / comments and Feedback---- WORKS
	
			/routes/leaderRouter.js -implemented

			LeaderRouter.route('/')
			    .options(cors.cors, (req, res) => { res.sendStatus(200); })
			    .get(cors.cors, (req, res, next) => {
				Leaders.find({})
				    .then((leaders) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(leaders);
				    }, (err) => next(err))
				    .catch((err) => next(err));
			    })
			    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
				Leaders.create(req.body)
				    .then((leader) => {
					console.log('Leader Created ', leaders);
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(leaders);
				    }, (err) => next(err))
				    .catch((err) => next(err));
			    })
	


	      
###--------------------------Verify Admin and Verify User ---------------------------------- works

		  ####   Authentication based on being an admin or not. -implemented - works

		
		    // Check if user is logged in
		   
		   		exports.verifyUser = passport.authenticate('jwt', { session: false })  - works
		
		    //Check if a verified ordinary user also has Admin privileges.
		    
				exports.verifyAdmin = function (req, res, next) {
	


		Admin based management, being able to see a user list -implemented  - Works


		Admin allowed see and flag dishes as featured or not. -implemented  - Works

		
		Admin can see and flag leaders as featured for the frontpage  -implemented  - Works

		
TODO ------>	Admin allowed / able to upload files, such as images when creating new dishes. -implemented  - NOT TESTED

		
TODO ------>	Admin can  GET all the registered users' information  -implemented - NOT TESTED
 
			
			
			
			#####Example from routes/dishRouter.js

			.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
				...... 
				}
	
	
	
     
### -------------------- Backend for Users Panel    --------------------------------- Needs testing
     
   
		   
TODO ------>	   Favorite functionality for users -implemented  - NOT TESTED

		   
TODO ------>	   Comment and form support for the users to interact with the content. - NOT IMPLEMENTED MIRROR LEADERS ROUTE CODE

		   
TODO ------>	   Support for a user to manage their own comments, delete functionality. -implemented - NOT TESTED

		 
			##### Check routes / favoritesRouter.js

			      favoriteRouter.route('/')
				  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
				  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
				    Favorites.findOne({ user: req.user._id })
				      .populate('user')
				      .populate('dishes')
				      .then((favorites) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorites);
				      }, (err) => next(err))
				      .catch((err) => next(err));
				  })


&nbsp;
&nbsp;


### ---------------Fileuploading with multer---------------------------- Needs testing
		 
TODO ------>     http://localhost:3000/upload/ , Check UploadRouter under Devbranch  -implemented - Not tested


&nbsp;
  

# Devlog 
       
## Part 1 :

         * Created a Node module using Express router to support the routes for the products REST API. - done
         * Created a Node module using Express router to support the routes for the promotions REST API. -done 
         * Created a Node module using Express router to support the routes for the leaders REST API. -done 


           Objective 1 

        * The REST API supports GET, PUT, POST and DELETE operations on /products/:dishId end point. -done 


           Objective 2 

         * The new Node module, promoRouter is implemented and used to support the /promotions end point. -done 

         The REST API supports GET, PUT, POST and DELETE operations on /promotions and GET, PUT, POST and DELETE operations on /promotions/:promoId end points. -done 


           Objective 3 

         * The new Node module, leaderRouter is implemented and used to support the /leaders end point. -done 

         The REST API supports GET, PUT, POST and DELETE operations on /leadership and GET, PUT, POST and DELETE operations on /leaders/:leaderId end points. -done

## Part 2 :

        Architecture and REST API and endpoints. - done


           Objectives:

        * Designing the overall architecture of application, from the front-end to the back-end.  apportioned the responsibilities to the front-end and back-end.  - done

        * Design an appropriate REST API that should be supported by server-side. A good design would enable ease of implementation of both the front-end and the back-end and facilitate seamless communication.  - done

        * Decide on the database schemas and the structure of the data, depending upon the database technology to implement the persistence of server-side data  - done

        * Design the business logic to be implemented on the server-side to support the needs of the front-end.  - done

       * Implemented the Promotions schema and model - done

       * Implement a REST API to support the /promotions endpoint, and the /promotions/:promoId endpoint enabling the interaction with the MongoDB database  - done

       * Implemented the Leaders schema and model  - done

       * Implement a REST API to support the /leaders endpoint, and the /leaders/:leaderId endpoint enabling the interaction with the MongoDB database - done


       Task 1 - done
           * The Promotions schema and model correctly supports all the fields as per the example document given above - done
           * The label field is set to an empty string by default - done
           * The price schema is be supported with a new SchemaType called Currency. - done
           * The REST API endpoints /promotions and /promotions/:promoId are implemented to interact with the MongoDB database - done

       Task 2 - done
           * The Leaders schema and model correctly supports all the fields as per the example document given above. - done
           * The REST API endpoints /leaders and /leaders/:leaderId are implemented to interact with the MongoDB database - done


## Part 3 :

       User Authentication

       * Check if a verified ordinary user also has Admin privileges. -done
       * Allow any one to perform GET operations -done
       * Allow only an Admin to perform POST, PUT and DELETE operations -done
       * Allow an Admin to be able to GET all the registered users' information from the database -done
       * Allow a registered user to submit comments (already completed), update a submitted comment and delete a submitted comment. The user should be restricted to perform such operations only on his/her own comments. No user or even the Admin can edit or delete the comments submitted by other users. -done


        update all the routes in the REST API to ensure that only the Admins can perform POST, PUT and DELETE operations. Update the code for all the    routers to support this. These operations should be supported for the following end points:
       -done

       * POST, PUT and DELETE operations on /products and /products/:dishId -done
       * DELETE operation on /products/:dishId/comments -done
       * POST, PUT and DELETE operations on /promotions and /promotions/:promoId -done
       * POST, PUT and DELETE operations on /leaders and /leaders/:leaderId -done
    

## Part 4 :

   ## Backend as a service


        Make sure that when user is created with registration HASH the password in the mongodb. - PASSPORT(Mongoose) Handles   this. -done

        Admin allowed / able to perform POST, PUT and DELETE operations -done

        /Admin route will give redirect 403, if you are not logged in as admin  -done
        https://tylermcginnis.com/react-router-protected-routes-authentication/


    * Allowed users to select a dish as their favorite, and add it to the list of favorites that are saved on the server. -done
    
    * Allowed users to retrieve the list of their favorite products from the server -done
    
    * Delete one or all of their favorite products from their favorites list on the server. -done


      * When the user does a GET operation on '/favorites',   populate the user information and the products information before returning the favorites to the user. -done
    
    * When the user does a POST operation on '/favorites' by including [{"_id":"dish ObjectId"}, . . ., {"_id":"dish ObjectId"}] in the body of the message,   (a) create a favorite document if such a document corresponding to this user does not already exist in the system, (b) add the products specified in the body of the message to the list of favorite products for the user, if the products do not already exists in the list of favorites. -done
    
    * When the user performs a DELETE operation on '/favorites',  delete the list of favorites corresponding to the user, by deleting the favorite document corresponding to this user from the collection. -done
    
    * When the user performs a POST operation on '/favorites/:dishId', then   add the specified dish to the list of the user's list of favorite products, if the dish is not already in the list of favorite products. -done
    
    * When the user performs a DELETE operation on '/favorites/:dishId', then  remove the specified dish from the list of the user's list of favorite products. -done
    
    * A new favoriteSchema and Favorites model has been correctly implemented to take advantage of Mongoose Population support to track the users and the list of favorite products using their ObjectIds in the favoriteSchema and Favorites model. -done
    
    * The GET, POST and DELETE operations are well supported as per the specifications above -done
    
    * The app.js has been updated to support the new route. -done

