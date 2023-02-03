import mongoose from "mongoose";
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
    afterAll(() => {
        token = ''
        postID = ''
    })
    describe('CRUD on posts', () => {
        describe("Create a post", () => {
            // beforeAll(async () => {
            //     const res = await supertest(app).post('/posts').set("authorization", "Bearer " + token).send({
            //         title: "All test title static",
            //         body: "TEST BODY: a very long body to simulate a real blogpost and very longer then longest",
            //         intro: "TEST INTRO: this is intro of a blogpost",
            //         tags: ["TEST TAGS", "node", "javascript"],
            //         photo: "https://picsum.photos/200/110?TEST_PHOTO=1"
            //     })
            //     console.log(res.body, "res BODY")
            //     // console.log(token)
            //     postID = res.body.data._id
            // })
            it("Return 201 when post created..", async () => {
                const res = await supertest(app).post('/posts').set('authorization', "Bearer " + token).send({
                    title: "title of post",
                    body: "a very long body to simulate a real blogpost and very longer then longest",
                    intro: "this is intro of a blogpost",
                    tags: ["node", "javascript"],
                    photo: "https://picsum.photos/200/110"
                })
                expect(res.status).toBe(201)
                postID = res.body.data._id
                console.log(res.body.message)
                expect(res.body.message).toContain('success')
            })

            it("Return 201 when post is updated", async () => {
                const res = await supertest(app).patch(`/posts/${postID}`).set('authorization', "Bearer " + token).send({
                    title: "UPDATED title",
                })
                // console.log(res.body, "\n", postID)
                expect(res.body.message).toContain("success")
                expect(res.status).toBe(200)
            })
            it("Return status 200 and all posts", async () => {
                const res = await supertest(app).get('/posts')
                expect(res.status).toBe(200)
                expect(res.body.message).toContain('success')
            })
            it("Return 200 when post is deleted", async () => {
                const res = await supertest(app).delete(`/posts/${postID}`).set('authorization', "Bearer " + token)
                expect(res.body.message).toContain('success')
                expect(res.status).toBe(200)
            })
        })

    })
    describe("Delete post", () => {
        beforeAll(async () => {
            await Post.deleteMany({})
        })
        it('Return 401 if there is no token provided', async () => {
            const res = await supertest(app).delete(`/posts/${postID}`)
            console.log(token)
            expect(res.status).toBe(401)
        })
    })
})