
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The user fullName
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     forgetPassword:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           description: The user token
 *         newPassword:
 *           type: string
 *           description: The user new password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     feedback:
 *       type: object
 *       required:
 *         - userId
 *         - id
 *         - feedback
 *       properties:
 *         userId:
 *           type: string
 *           description: current user id
 *         id:
 *           type: string
 *           description: The user id which you want to give feedback
 *         feedback:
 *           type: string
 *           description: The feedback content
 */

// register user 

/**
 * @swagger
 * /neoscrum/register:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 */

// login user

/**
 * @swagger
 * /neoscrum/login:
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

// change password

/**
 * @swagger
 * /neoscrum/change-password:
 *   post:
 *     summary: login user
 *     tags: [forgetPassword]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgetPassword'
 *     responses:
 *       200:
 *         description: The user password changed
 *       500:
 *         description: Some server error
 */


// get user list

/**
 * @swagger
 * /neoscrum/getUser:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */


// feedback 

/**
 * @swagger
 * /neoscrum/feedback:
 *   post:
 *     summary: feedback 
 *     tags: [feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/feedback'
 *     responses:
 *       200:
 *         description: feedback save sucessfully..!!
 *       500:
 *         description: Some server error
 */