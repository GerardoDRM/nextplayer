/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'ProfileController.showHomePage',
  'GET /signup/player': {view: 'signupPlayer'},
  'GET /signup/coach': {view: 'signupCoach'},
  'GET /signup/organization': {view: 'signupOrganization'},
  'POST /signup': 'UserController.signup',
  'GET /login': {view: 'login'},
  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',
  'POST /contact': 'ContactController.contact',
  'GET /contact' : {view: 'contact'},
  /***************************************************************************
  *                                                                          *
  * User routes (Players and Coaches)...                                     *
  *                                                                          *
  ***************************************************************************/
  'GET /user/basicinfo': 'UserController.getUserBasic',
  'PUT /user/basicinfo': 'UserController.basicinfo',
  'GET /user/sport': 'UserController.getUserSport',
  'PUT /user/sport': 'UserController.sport',
  'GET /user/exclusive': 'UserController.getUserClub',
  'PUT /user/exclusive': 'UserController.club',
  'GET /user/exclusive': 'UserController.getUserClub',
  'PUT /user/exclusive': 'UserController.club',
  'GET /user/membership': 'UserController.getUserStripe',
  'PUT /user/membership': 'UserController.membership',
  'DELETE /user/membership': 'UserController.deleteCard',
  'POST /user/gallery/photos': 'UserController.uploadImage',
  'DELETE /user/gallery/photos': 'UserController.removePhoto',
  'POST /user/gallery/videos': 'UserController.uploadVideo',
  'DELETE /user/gallery/videos': 'UserController.removeVideo',
  'GET /user/gallery': 'UserController.getUserGallery',
  'GET /user/complete_profile': 'UserController.getUserProfile',
  'GET /forgot': {view: 'forgot'},
  'POST /forgot': 'UserController.forgot',
  'GET /reset/:token': 'UserController.getReset',
  'POST /reset/:token': 'UserController.reset',
  'GET /verify': 'UserController.verify',
  /***************************************************************************
  *                                                                          *
  * User routes (Players and Coaches)...                                     *
  *                                                                          *
  ***************************************************************************/
  'GET /profile/:id': 'ProfileController.showProfile',
  'GET /user/home': 'ProfileController.showInnerHome',
  /***************************************************************************
  *                                                                          *
  * Team or University routes ...                                            *
  *                                                                          *
  ***************************************************************************/
  'GET /user/org/achivements': 'UserController.getAchivements',
  'PUT /user/org/achivements': 'UserController.achivements',
  'GET /search': {view: 'search'},
  'GET /blog' : 'BlogController.blog',
  'GET /blogs/:month/:year': 'BlogController.getPostByDate',
  'GET /blog/comments/:id': 'BlogController.getPostComments',
  'PUT /blog/comments/:id': 'BlogController.addComment',
  'GET /notices': 'NoticeController.getAll',
  'GET /organizations/all': 'UserController.getTeams',
  'GET /contact' : {view: 'contact'},
  'GET /combines' : {view: 'combines'}


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
