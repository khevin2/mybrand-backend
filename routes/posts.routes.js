import express from "express";

import {
  addPost,
  deletePost,
  getOnePost,
  getPosts,
  updateByID,
} from "../controllers/post.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Post:
 *        type: object
 *        required:
 *          - title
 *          - intro
 *          - body
 *          - photo
 *          - tags
 *        properties:
 *          title:
 *              type: string
 *              description:  Title of a post(every post should have a title!)
 *          intro:
 *              type: string
 *              description: Introduction/ summary of a post
 *          body:
 *              type: string
 *              description: Body of a post(preferably written in MD)
 *          tags:
 *              type: array
 *              description: tags(keys) of a post
 *          photo:
 *              type: string
 *              description: Main photo of a blog
 *          likes:
 *            type: string
 *            description: Number of reaction(likes) on a single post
 *        example:
 *          title: Check out my new npm package
 *          intro: The recently project on GSM messages is out
 *          body: a really long description of my post. Hence post body..
 *          tags: ['npm', 'nodeJS', 'GSM']
 *          photo: 'https://picsum.photos/190/90s'
 *          likes: 123
 *
 */



/**
 * @swagger
 * /posts:
 *  get:
 *    summary: Get a list of all posts
 *    responses: 
 *      '200':
 *        description: List of all posts
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                Post:
 *                 type: object
 *                 required:
 *                   - title
 *                   - intro
 *                   - body
 *                   - photo
 *                   - tags
 *                 properties:
 *                   title:
 *                       type: string
 *                       description:  Title of a post(every post should have a title!)
 *                   intro:
 *                       type: string
 *                       description: Introduction/ summary of a post
 *                   body:
 *                       type: string
 *                       description: Body of a post(preferably written in MD)
 *                   'tags':
 *                       type: array
 *                       description: tags(keys) of a post
 *                   photo:
 *                       type: string
 *                       description: Main photo of a blog
 *                   likes:
 *                     type: string
 *                     description: Number of reaction(likes) on a single post
 *      '500': An error occured
 *      '400': Bad request
 *      
 */

router.get("/", getPosts);

/**
 * @swagger
 * /posts:
 *  post:
 *    summary: Add a new post
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      '201':
 *        description: Created new user
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 *      '500': Server could not process this request properly
 *      '400': Ensure all fields are well filed
 *
 */
router.post("/", addPost);


router.get("/:id", getOnePost);
router.delete("/:id", deletePost);
router.patch("/:id", updateByID);

export default router;
