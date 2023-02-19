import mongoose from "mongoose";
import createServer from "../utils/server";
import { Skills } from "../models/skills.model";
import { Users } from "../models/user.model";
import supertest from "supertest";

const app = createServer()

beforeAll(async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_TEST_URL)
    await Skills.deleteMany({})

})
afterAll(async () => {
    await mongoose.connection.close()

})

describe("Test skills route", () => {
    let adminToken
    let skillID
    describe("Get skills", () => {
        it("Should return 404 if skills are empty", async () => {
            const res = await supertest(app).get('/skills')
            expect(res.status).toBe(404)
            expect(res.body.message).toContain("success")
        })
    })

    describe('Test validation', () => {
        it("Should return 400 if skillname is missing", async () => {
            const res = await supertest(app).post('/skills').send({
                skilldesc: "frontend javascript framework",
                skillphoto: "https://picsum.photos/100/100",
                skillbanner: "https://picsum.photos/100/100"
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if skilldesc is missing", async () => {
            const res = await supertest(app).post('/skills').send({
                skillphoto: "https://picsum.photos/100/100",
                skillbanner: "https://picsum.photos/100/100",
                skillname: "react"
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if skillphoto is missing", async () => {
            const res = await supertest(app).post('/skills').send({
                skillname: "react",
                skilldesc: "frontend javascript framework",
                skillbanner: "https://picsum.photos/100/100"
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if skillbanner is missing", async () => {
            const res = await supertest(app).post('/skills').send({
                skillname: "react",
                skilldesc: "frontend javascript framework",
                skillphoto: "https://picsum.photos/100/100"
            })
            expect(res.status).toBe(400)
        })
        it("Should return 400 if there is additional field not defined", async () => {
            const res = await supertest(app).post('/skills').send({
                skillname: "react",
                skilldesc: "frontend javascript framework",
                skillphoto: "https://picsum.photos/100/100",
                skillbanner: "https://picsum.photos/100/100",
                other: "not defined"
            })
            expect(res.status).toBe(400)
        })

    })

    describe("Test without token", () => {
        it("Should return 401 when token is not available", async () => {
            const res = await supertest(app).post('/skills').send({
                skillname: "react",
                skilldesc: "frontend javascript framework",
                skillphoto: "https://picsum.photos/100/100",
                skillbanner: "https://picsum.photos/100/100"
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
            // await Skills.deleteMany({})
        })
        it("Should return 201 when there is token and user is admin", async () => {
            const res = await supertest(app).post('/skills').set("Authorization", "Bearer " + adminToken)
                .send({
                    skillname: "react",
                    skilldesc: "frontend javascript framework",
                    skillphoto: "https://picsum.photos/100/100",
                    skillbanner: "https://picsum.photos/100/100"
                })
            expect(res.status).toBe(201)
            expect(res.body.message).toContain("success")
            skillID = res.body.data._id
        })
        it("should return 200 when skill is updated", async () => {
            const res = await supertest(app).patch(`/skills/${skillID}`).set("Authorization", "Bearer " + adminToken)
                .send({
                    skillname: "react patch test",
                    skilldesc: "frontend javascript framework test",
                    skillphoto: "https://picsum.photos/100/100",
                    skillbanner: "https://picsum.photos/100/100"
                })
            expect(res.status).toBe(200)
            expect(res.body.message).toContain("success")
        })
        ////////////
        describe("Get skills", () => {
            it("Should return 200 if there are skills", async () => {
                const res = await supertest(app).get('/skills')
                expect(res.status).toBe(200)
                expect(res.body.message).toContain("success")
            })
            it("should return 404 when a skill with not available", async () => {
                const res = await supertest(app).get(`/skills/63e7945da899ae003ff00c9d`)
                expect(res.status).toBe(404)
                expect(res.body.message).toContain("Not found")
            })
            it("should return 200 if there is `skill` with ID", async () => {
                const res = await supertest(app).get(`/skills/${skillID}`)
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
                const res = await supertest(app).post('/skills').set("Authorization", "Bearer " + token)
                    .send({
                        skillname: "react",
                        skilldesc: "frontend javascript framework",
                        skillphoto: "https://picsum.photos/100/100",
                        skillbanner: "https://picsum.photos/100/100"
                    })
                expect(res.status).toBe(403)
            })
            it("should return 403 when skill is updated by simple user/unauthenticated", async () => {
                const res = await supertest(app).patch(`/skills/${skillID}`).set("Authorization", "Bearer " + token)
                    .send({
                        skillname: "react patch test",
                        skilldesc: "frontend javascript framework test",
                        skillphoto: "https://picsum.photos/100/100",
                        skillbanner: "https://picsum.photos/100/100"
                    })
                expect(res.status).toBe(403)
            })
            it("should return 403 when skill is deleted by simple user/unauthenticated", async () => {
                const res = await supertest(app).delete(`/skills/${skillID}`).set("Authorization", "Bearer " + token)

                expect(res.status).toBe(403)
            })
        })

        // ?????
        ////////////
        it("should return 404 when a a deleted skill is not available", async () => {
            const res = await supertest(app).delete(`/skills/63e7945da899ae003ff00c9d`).set("Authorization", "Bearer " + adminToken)
            expect(res.status).toBe(404)
            expect(res.body.message).toContain("Skill not found")
        })

        it("Should return 200 when skill is deleted successfully", async () => {
            const res = await supertest(app).delete(`/skills/${skillID}`).set("Authorization", "Bearer " + adminToken)

            expect(res.status).toBe(200)
        })

    })


})

