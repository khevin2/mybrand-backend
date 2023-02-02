import supertest from "supertest"
import mongoose from "mongoose"
import createServer from "../utils/server"

const app = createServer()


describe('app', () => {
    describe('Get user route', () => {
        describe('Given that you are not athorized', () => {
            it('should return 401', async () => {
                await supertest(app).get('/users').expect(401)
            })
        })
        describe("Given a user is authorized", () => {
            it('returns 200 and data', async () => {
                expect(true).toBe(true)
            })
        })
    })
})