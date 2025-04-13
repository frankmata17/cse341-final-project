const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { check } = require('express-validator');
const passport = require('passport');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful. Returns a success message and a JWT token if applicable.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Authenticate with GitHub OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication.
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects after authentication. On success, redirects to the home page; on failure, redirects to the login page.
 */
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login', // adjust as needed
  successRedirect: '/'       // adjust as needed
}));

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful.
 *       500:
 *         description: Error logging out.
 */
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.status(200).json({ message: 'Successfully logged out' });
  });
});

module.exports = router;
