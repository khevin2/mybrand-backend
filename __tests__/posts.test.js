import mongoose, { mongo } from "mongoose";
import createServer from "../utils/server";
import { Post } from "../models/post.model";
import supertest from "supertest";

const app = createServer()

beforeAll(async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_TEST_URL)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('Test authenticated routes', () => {
    let token
    let postID
    beforeAll(async () => {
        const res = await supertest(app).post('/login').send({
            email: "cyusa.kheven@outlook.com",
            password: "123456"
        })
        token = res.body.token
        await Post.deleteMany({})
    })
    beforeAll(async () => {
        const res = await supertest(app).post('/posts').set("authorization", "Bearer " + token).send({
            title: "All test title static",
            body: "TEST BODY: a very long body to simulate a real blogpost and very longer then longest",
            intro: "TEST INTRO: this is intro of a blogpost",
            tags: ['TEST TAGS', 'node', 'javascript'],
            photo: "https://picsum.photos/200/110?TEST_PHOTO=1"
        })
        console.log(res.body, "res BODY")
        console.log(token)
        postID = res.body.data._id
    })
    describe('CRUD on posts', () => {
        describe("Create a post", () => {
            it("Return 201 when post created..", async () => {
                const res = await supertest(app).post('/posts').set('authorization', "Bearer " + token).send({
                    title: "title of post",
                    boby: "a very long body to simulate a real blogpost and very longer then longest",
                    intro: "this is intro of a blogpost",
                    tags: ['node', 'javascript'],
                    photo: "https://picsum.photos/200/110"
                })
                // expect(res.status).toBe(201)
                console.log(res.data)
                expect(res.body.message).toContain('success')
            })
        })
        describe("Delete post", () => {
            it('Return 404 if post does not exist', () => {
                const res = supertest(app).delete(`/posts/${postID}`)
            })
        })
    })
})