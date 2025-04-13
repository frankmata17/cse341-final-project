const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Initiate GitHub OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication.
 */
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /login/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: On successful authentication, redirects to the home page; on failure, redirects to /login-failure.
 */
router.get('/login/callback', passport.authenticate('github', {
  failureRedirect: '/login-failure',
  successRedirect: '/'
}));

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       500:
 *         description: An error occurred while logging out.
 */
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.status(200).json({ message: 'Successfully logged out.' });
  });
});

module.exports = router;
