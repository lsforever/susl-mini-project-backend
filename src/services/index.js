const PostService = require( "../services/PostService" );
const PostServiceInstance = new PostService();

module.exports = { createCord };

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function createCord ( req, res ) {
  try {
    // We only pass the body object, never the req object
    const createdCord = await PostServiceInstance.create( req.body );
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}