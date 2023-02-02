// import mongoose from "mongoose";
// import { Users } from "../models/user.model";
// import createServer from "../utils/server";
// import supertest from "supertest";

// const app = createServer()

// beforeAll(async () => {
//     process.env.JWT_TOKEN = '1820ea14208730190847a09bf32424a05c9e38bd8cd08550a159456a8758c3a7eabe5be9574878e27ab8a25eb13019063ca4190719a138a53fde7d1fd81d63cc'
//     mongoose.set('strictQuery', false);
//     await mongoose.connect(process.env.DATABASE_TEST_URL)


// })
// afterAll(async () => {
//     process.env.JWT_TOKEN = ''
//     await mongoose.disconnect()
//     await mongoose.connection.close()
// })

