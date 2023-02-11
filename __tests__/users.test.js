import mongoose from "mongoose";
import createServer from "../utils/server";
import { Users } from "../models/user.model";
import supertest from "supertest";

const app = createServer()

beforeAll(async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DATABASE_TEST_URL)
        .then(() => console.log('connected'))

})

afterAll(async () => {

    await mongoose.disconnect()
    await mongoose.connection.close()
})

describe('Create a user', () => {
    beforeAll(async () => {
        await Users.deleteMany({ userType: "user" })
    }, 20000)

    it('should sign up a user', async () => {
        const user = await supertest(app).post('/users').send({
            names: "cyusa kheven",
            phone: "0722982335",
            email: "cyusa.kheven@yahoo.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200"
        })
        expect(user.body.message).toContain("success")
        expect(user.status).toBe(201)

    })
    it('Should return 400 when a names is missing', async () => {
        const user = await supertest(app).post('/users').send({
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200"
        })
        expect(user.status).toBe(400)

    })
    it('Should return 400 when a Phone is missing', async () => {
        const user = await supertest(app).post('/users').send({
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200",
            names: "cyusa kheven"
        })
        expect(user.status).toBe(400)

    })
    it('Should return 400 when an Email is missing', async () => {
        const user = await supertest(app).post('/users').send({
            phone: "0783903252",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200",
            names: "cyusa kheven"
        })
        expect(user.status).toBe(400)

    })
    it('Should return 400 when a DOB is missing', async () => {
        const user = await supertest(app).post('/users').send({
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            password: '123456',
            photo: "https://picsum.photos/200/200",
            names: "cyusa kheven"
        })
        expect(user.status).toBe(400)

    })
    it('Should return 400 when a password is missing', async () => {
        const user = await supertest(app).post('/users').send({
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            photo: "https://picsum.photos/200/200",
            names: "cyusa kheven"
        })
        expect(user.status).toBe(400)

    })
    it('Should return 400 when a photo is missing', async () => {
        const user = await supertest(app).post('/users').send({
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            names: "cyusa kheven"
        })
        expect(user.status).toBe(400)

    })
    it('should return 400 if email is already registered', async () => {
        const user = await supertest(app).post('/users').send({
            names: "cyusa kheven",
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200"
        })
        // console.log(user)
        expect(user.body.message).toContain('Email already registered..')
    })
    it('should return 400 if phone is already registered', async () => {
        const user = await supertest(app).post('/users').send({
            names: "cyusa kheven",
            phone: "0783903252",
            email: "cyusa.kheven@outlook.com",
            dob: new Date('02-12-2000'),
            password: '123456',
            photo: "https://picsum.photos/200/200"
        })
        // console.log(user)
        expect(user.body.message).toContain('Email already registered..')
    })
})

describe('AUTHENTICATION & AUTHORIZATION', () => {
    describe('login test', () => {
        it('Return 400 if password is missing', async () => {
            const res = await supertest(app).post('/login').send({
                email: 'cyusa.kheven@toutlook.com',
            })
            expect(res.status).toBe(400)
        })
        it('Return 400 if email is missing', async () => {
            const res = await supertest(app).post('/login').send({
                password: '123456',
            })
            expect(res.status).toBe(400)
        })
        it('Return 400 if email or password is wrong', async () => {
            const res = await supertest(app).post('/login').send({
                email: 'cyusa.kheven@toutlook.com',
                password: '123457'
            })
            expect(res.status).toBe(400)
        })
        it('Return 200 when login is successfull', async () => {
            const res = await supertest(app).post('/login').send({
                email: 'cyusa.kheven@outlook.com',
                password: '123456'
            })
            // console.log(res.body)
            expect(res.status).toBe(200)
            expect(res.body.message).toContain('success')
        })
    })
    describe('Should get all user as authenticated user', () => {
        let token
        beforeAll(async () => {
            const res = await supertest(app).post('/login').send({
                email: "cyusa.kheven@outlook.com",
                password: "123456"
            })
            token = res.body.token
        })
        it('Return all users and 200', async () => {
            const res = await supertest(app).get('/users').set('Authorization', "Bearer " + token)
            expect(res.status).toBe(200)
            expect(res.body.message).toContain('success')
        })
    })
})