// user schema
/**
 * @swagger
 * components:
 *    schemas:
 *      users:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - profileImage
 *        properties:
 *          name:
 *            type: string
 *            description: The user fullName
 *          email:
 *            type: string
 *            description: The user email
 *          profileImage:
 *            type: string
 *            format: binary
 */

// login schema
 /**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 */
 
 //fead back schema
/**
 * @swagger
 * components:
 *   schemas:
 *     feadback:
 *       type: object
 *       required:
 *         - email
 *         - feadback
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: provide token
 *         email:
 *           type: string
 *           description: enter email
 *         feadback:
 *           type: string
 *           description: The feedback content
 */

// get reciever schema
 /**
 * @swagger
 * components:
 *   schemas:
 *     getreciever:
 *       type: object
 *       required:
 *         - token 
 *       properties:
 *         token:
 *           type: string
 *           description: provide the token of logged in user to get list of all reciever
 */

  





 // register user 

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       401:
 *         description: Some server error
 */
 
// login user

/**
 * @swagger
 * /DeveloperSignin:
 *   post:
 *     summary: login user
 *     tags: [login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: The user successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 */

// add feadback

/**
 * @swagger
 * /addFeadback:
 *   post:
 *     summary: feedback 
 *     tags: [feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/feadback'
 *     responses:
 *       200:
 *         description: feedback save sucessfully..!!
 *       401:
 *         description: Some server error
 */
  
// get user list

/**
 * @swagger
 * /GetAllRecievers:
 *   post:
 *     summary: Returns the list of all users
 *     tags: [getreciever]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/getreciever'
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/'
 *       401:
 *         description: Some server error
 */

 