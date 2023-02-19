import mongoose from "mongoose";
import createServer from "../utils/server";
import { Works } from "../models/works.model";
import { Users } from "../models/user.model";
import supertest from "supertest";

const app = createServer()

beforeAll(async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_TEST_URL)
    await Works.deleteMany({})

})
afterAll(async () => {
    await mongoose.connection.close()

})

describe("Test works route", () => {
    let adminToken
    let workID
    describe("Get works", () => {
        it("Should return 404 if works are empty", async () => {
            const res = await supertest(app).get('/works')
            expect(res.status).toBe(404)
            expect(res.body.message).toContain("success")
        })
    })

    describe('Test validation', () => {
        it("Should return 400 if workname is missing", async () => {
            const res = await supertest(app).post('/works').send({
                workdesc: "frontend javascript framework",
                workimg: "https://picsum.photos/100/100",
                link_to_project: "https://cyberleague.io",
                frameworks: ['flask', 'vuejs'],
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if workdesc is missing", async () => {
            const res = await supertest(app).post('/works').send({
                workimg: "https://picsum.photos/100/100",
                link_to_project: "https://cyberleague.io",
                workname: "react",
                frameworks: ['flask', 'vuejs'],
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if workimg is missing", async () => {
            const res = await supertest(app).post('/works').send({
                workname: "react",
                workdesc: "frontend javascript framework",
                link_to_project: "https://cyberleague.io",
                frameworks: ['flask', 'vuejs'],
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if link_to_project is missing", async () => {
            const res = await supertest(app).post('/works').send({
                workname: "react",
                workdesc: "frontend javascript framework",
                workimg: "https://picsum.photos/100/100",
                frameworks: ['flask', 'vuejs'],
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if frameworks is missing", async () => {
            const res = await supertest(app).post('/works').send({
                workname: "react",
                workdesc: "frontend javascript framework",
                workimg: "https://picsum.photos/100/100",
                link_to_project: "https://cyberleague.io"
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if there is additional field not defined", async () => {
            const res = await supertest(app).post('/works').send({
                workname: "react",
                workdesc: "frontend javascript framework",
                workimg: "https://picsum.photos/100/100",
                link_to_project: "https://cyberleague.io",
                frameworks: ['flask', 'vuejs'],
                other: "not defined"
            })
            expect(res.status).toBe(400)
        })

    })

    describe("Test without token", () => {
        it("Should return 401 when token is not available", async () => {
            const res = await supertest(app).post('/works').send({
                workname: "react",
                workdesc: "frontend javascript framework",
                workimg: "https://picsum.photos/100/100",
                link_to_project: "https://cyberleague.io",
                frameworks: ['flask', 'vuejs'],
            })
            expect(res.status).toBe(401)
        })
    })

    describe("Test with admin", () => {

        beforeAll(async () => {
            const res = await supertest(app).post('/login').send({
                email: "cyusa.kheven@outlook.com",
                password: "123456"
            })
            adminToken = res.body.token
        })
        afterAll(async () => {
            adminToken = ''
            // await works.deleteMany({})
        })
        it("Should return 201 when there is token and user is admin", async () => {
            const res = await supertest(app).post('/works').set("Authorization", "Bearer " + adminToken)
                .send({
                    workname: "react",
                    workdesc: "frontend javascript framework",
                    workimg: "https://picsum.photos/100/100",
                    link_to_project: "https://picsum.photos/100/100",
                    frameworks: ['flask', 'vuejs'],
                })
            expect(res.status).toBe(201)
            expect(res.body.message).toContain("success")
            workID = res.body.data._id
        })
        it("should return 200 when work is updated", async () => {
            const res = await supertest(app).patch(`/works/${workID}`).set("Authorization", "Bearer " + adminToken)
                .send({
                    workname: "react patch test",
                    workdesc: "frontend javascript framework test",
                    workimg: "https://picsum.photos/100/100",
                    link_to_project: "https://picsum.photos/100/100",
                    frameworks: ['flask', 'vuejs'],
                })
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("success")
        })
        ////////////
        describe("Get works", () => {
            it("Should return 200 if there are works", async () => {
                const res = await supertest(app).get('/works')
                expect(res.status).toBe(200)
                expect(res.body.message).toContain("success")
            })
            it("should return 404 when a work with not available", async () => {
                const res = await supertest(app).get(`/works/63e7945da899ae003ff00c9d`)
                expect(res.status).toBe(404)
                expect(res.body.message).toContain("Not found")
            })
            it("should return 200 if there is `work` with ID", async () => {
                const res = await supertest(app).get(`/works/${workID}`)
                expect(res.status).toBe(200)
                expect(res.body.message).toContain("success")
            })
        })
        // ?????
        describe("Test with simple user", () => {
            let user = {}
            let token
            beforeAll(async () => {
                user = await supertest(app).post('/users').send({
                    names: "cyusa kheven",
                    phone: "0722002335",
                    email: "cyusa.kheven@aol.com",
                    dob: new Date('02-12-2000'),
                    password: '123456',
                    photo: "https://picsum.photos/200/200"
                })
                if (user.status == 201) {
                    const res = await supertest(app).post('/login').send({
                        email: 'cyusa.kheven@aol.com',
                        password: '123456'
                    })
                    token = res.body.token
                }
            })
            afterAll(async () => {
                await Users.deleteMany({ userType: "user" })
            })
            // TESTS
            it("Should return 403 if the user is not an admin", async () => {
                const res = await supertest(app).post('/works').set("Authorization", "Bearer " + token)
                    .send({
                        workname: "react",
                        workdesc: "frontend javascript framework",
                        workimg: "https://picsum.photos/100/100",
                        link_to_project: "https://picsum.photos/100/100",
                        frameworks: ['flask', 'vuejs'],
                    })
                expect(res.status).toBe(403)
            })
            it("should return 403 when work is updated by simple user/unauthenticated", async () => {
                const res = await supertest(app).patch(`/works/${workID}`).set("Authorization", "Bearer " + token)
                    .send({
                        workname: "react patch test",
                        workdesc: "frontend javascript framework test",
                        workimg: "https://picsum.photos/100/100",
                        link_to_project: "https://picsum.photos/100/100",
                        frameworks: ['flask', 'vuejs'],
                    })
                expect(res.status).toBe(403)
            })
            it("should return 403 when work is deleted by simple user/unauthenticated", async () => {
                const res = await supertest(app).delete(`/works/${workID}`).set("Authorization", "Bearer " + token)

                expect(res.status).toBe(403)
            })
        })

        // ?????
        ////////////
        it("should return 404 when a a deleted work is not available", async () => {
            const res = await supertest(app).delete(`/works/63e7945da899ae003ff00c9d`).set("Authorization", "Bearer " + adminToken)
            expect(res.status).toBe(404)
            expect(res.body.message).toContain("Work not found")
        })

        it("Should return 200 when work is deleted successfully", async () => {
            const res = await supertest(app).delete(`/works/${workID}`).set("Authorization", "Bearer " + adminToken)

            expect(res.status).toBe(200)
        })

    })


})

