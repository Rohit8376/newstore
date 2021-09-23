const mongoose = require('mongoose')
const cors = require("cors");
const cookieparser = require("cookie-parser");
const express  = require('express') 
const app = express()


const swaggerUi=require('swagger-ui-express');
const swaggerJSDoc=require('swagger-jsdoc');

app.use('/profiles', express.static('profiles'))
app.use(express.json());

// app.use(cors()) 


app.use(
  cors({ 
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieparser());

//  const DB = "mongodb://localhost:27017/neosoftTask";
const DB="mongodb+srv://admin-priya:pihu3105@cluster0.7zxst.mongodb.net/crudneoscrum?retryWrites=true&w=majority"

// swagger api docs


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "NeoScrum application API DOcs",
			version: "1.0.0",
			description: "A simple Express Library API",
		},

		components: {
			securitySchemes: {
			  bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			  }
			}
		  },
		  security: [{
			bearerAuth: []
		  }]
		  ,

		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./swaggerUi.js"],
}; 

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "NeoStore application API DOcs",
// 			version: "1.0.0",
// 			description: "A simple Express Library API",
// 		},

// 		components: {
// 			securitySchemes: {
// 			  bearerAuth: {
// 				type: 'http',
// 				scheme: 'bearer',
// 				bearerFormat: 'JWT',
// 			  }
// 			}
// 		  },
// 		  security: [{
// 			bearerAuth: []
// 		  }]

// 		  ,
// 		servers: [
// 			{
// 				url: "http://localhost:4000",
// 			},
// 		],


// 	},
// 	apis: ["./swaggerUi.js"],
// }; 








const swaggerSpec = swaggerJSDoc(options);



app.use(require("./Routes/auth"));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
   console.log('connection successful');
}).catch((err)=>{
  console.log('failed to connect with the server')
})



app.listen(4000, ()=>{
    console.log("listening to port 4000")
})
