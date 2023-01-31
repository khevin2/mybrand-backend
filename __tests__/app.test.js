import supertest from "supertest"
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
                await supertest(app).get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lcyI6IkN5dXNhIEtoZXZlbiIsImlkIjoiNjNjZDYyMzcyY2MzZGJlYTQxZjcyM2EzIiwiZW1haWwiOiJjeXVzYS5raGV2ZW5Ab3V0bG9vay5jb20iLCJpYXQiOjE2NzUxNTQwNDd9.xZXai3saWrUzoTqQGbgpP9tErNBWvSgnXKdexpoTO84')
                    .expect(200)
            })
        })
    })
})