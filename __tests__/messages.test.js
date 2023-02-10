import mongoose from "mongoose";
import createServer from "../utils/server";
import { Messages } from "../models/messages.model";
import supertest from "supertest";

const app = createServer()

beforeAll(async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_TEST_URL)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe("Test messages routes", () => {
    let token
    let messageID
    beforeAll(async () => {
        const res = await supertest(app).post('/login').send({
            email: "cyusa.kheven@outlook.com",
            password: "123456"
        })
        token = res.body.token
        await Messages.deleteMany({})
    })
    afterAll(() => {
        token = ''
        messageID = ''
    })
    describe("Create message", () => {
        it("Return 201 when message sent", async () => {
            const res = await supertest(app).post('/messages').set("authorization", "Bearer " + token).send({
                names: "cyusa messages",
                email: "email@mail.com",
                subject: "test subject",
                body: "body of message test"
            })
            messageID = res.body.data._id
            expect(res.status).toBe(201)
            expect(res.body.message).toContain("success")
        })
        it("return 400 when names are missing", async () => {
            const res = await supertest(app).post('/messages').set("authorization", "Bearer " + token).send({
                email: "email@mail.com",
                subject: "test subject",
                body: "body of message test"
            })
            expect(res.status).toBe(400)
        })
        it("return 400 when email is missing", async () => {
            const res = await supertest(app).post('/messages').set("authorization", "Bearer " + token).send({
                names: "cyusa messages",
                subject: "test subject",
                body: "body of message test"
            })
            expect(res.status).toBe(400)
        })
        it("return 400 when subject is missing", async () => {
            const res = await supertest(app).post('/messages').set("authorization", "Bearer " + token).send({
                names: "cyusa messages",
                email: "email@mail.com",
                body: "body of message test"
            })
            expect(res.status).toBe(400)
        })
        it("return 400 when body is missing", async () => {
            const res = await supertest(app).post('/messages').set("authorization", "Bearer " + token).send({
                names: "cyusa messages",
                email: "email@mail.com",
                subject: "test subject",
            })
            expect(res.status).toBe(400)
        })
    })
    describe("Get Messages", () => {
        it("Return 200 and all messages", async () => {
            const res = await supertest(app).get('/messages').set("authorization", "Bearer " + token)
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("success")
        })
        it("Return 401 when there is no token", async () => {
            const res = await supertest(app).get('/messages')
            expect(res.status).toBe(401)
        })
    })
    describe("Reply Messages", () => {
        it("Return 200 when message is replied", async () => {
            const res = await supertest(app).patch(`/messages/${messageID}`).set("authorization", "Bearer " + token)
                .send({
                    reply: "reply message"
                })
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("success")
        })
        it("Return 404 when messageID missing/incorrect", async () => {
            const res = await supertest(app).patch('/messages').set("authorization", "Bearer " + token)
                .send({})
            expect(res.status).toBe(404)
        })
        it("Return 400 when message is missing", async () => {
            const res = await supertest(app).patch(`/messages/${messageID}`).set("authorization", "Bearer " + token)
                .send({

                })
            expect(res.status).toBe(400)
        })
        it("Return 400 when message is empty", async () => {
            const res = await supertest(app).patch(`/messages/${messageID}`).set("authorization", "Bearer " + token)
                .send({
                    reply: ""
                })
            expect(res.status).toBe(400)
        })
        it("Return 401 when token is missing", async () => {
            const res = await supertest(app).patch(`/messages/${messageID}`)
                .send({
                    reply: "this 2nd reply"
                })
            expect(res.status).toBe(401)
        })
    })
    describe("delete message", () => {
        it("Return 404 when there is no message with provided id", async () => {
            const res = await supertest(app).delete(`/messages/63ca9a2dec648124f8c7e608`).set("authorization", "Bearer " + token)
            expect(res.status).toBe(404)
        })
        it("return 401 when there is no token", async () => {
            const res = await supertest(app).delete(`/messages/${messageID}`)
            expect(res.status).toBe(401)
        })
        it("return 200 when a message is deleted successfully", async () => {
            const res = await supertest(app).delete(`/messages/${messageID}`).set("authorization", "Bearer " + token)
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("success")
        })
    })

})