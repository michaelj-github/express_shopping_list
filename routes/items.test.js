process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDB");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
  items.push(popsicle);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({ items: [popsicle] })
    })
})

describe("GET /items/:name", () => {
test("Get item by name", async () => {
    const res = await request(app).get(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ item: popsicle })
})
test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/bacon`);
    expect(res.statusCode).toBe(404)
})
})

describe("POST /items", () => {
test("Creating an item", async () => {
    const res = await request(app).post("/items").send({ name: "poptarts", price: 3.45 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "poptarts", price: 3.45 } });
})
test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
})
})

describe("/PATCH /items/:name", () => {
test("Updating the name of an item", async () => {
    const res = await request(app).patch(`/items/${popsicle.name}`).send({ name: "moonpie" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "moonpie", price: 1.45 } });
})
test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/items/bacon`).send({ name: "moonpie" });
    expect(res.statusCode).toBe(404);
})
})

describe("/DELETE /items/:name", () => {
test("Deleting a item", async () => {
    const res = await request(app).delete(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
})
test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/bacon`);
    expect(res.statusCode).toBe(404);
})
})  