const request = require('supertest');
const mongoose = require("mongoose");
const app = require("../app/app");
const databaseName = "test";
const JWT = require("jsonwebtoken");
const env = require("dotenv");
env.config();


const parseHeader = (headerString) => {

  const splitHeader = headerString.split(" ");
  let tokens = [];

  tokens.push(splitHeader[1]);
  tokens.push(splitHeader[3]);
  return tokens;
}


const BASE_URL = "/api/v1";
/**
 * Connect to database
 */
beforeAll(async () => {
  await mongoose.connect("mongodb+srv://neo:morpheus123@cluster0.uyvkmyh.mongodb.net/ISA?retryWrites=true&w=majority", { useNewUrlParser: true });
});

let accessToken = [];
let refreshToken = [];

/**
 * Test 1: Test that the /register endpoint creates a new user in the database with the correct hashed password
 */
describe('T1: Register User Test', function () {
  it('should register a user', async function () {
    const res = await request(app)
      .post(`${BASE_URL}/register`)
      .send({ username: 'testuser', password: 'testpassword', fname: "brad", lname: "masciotra" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User successfully registered');
  });
})


/**
 * Test 2: Test that the /login endpoint returns a JWT access token and refresh token for valid credentials
 */
describe("T2: Returns Token on Valid Login Credentials", () => {
  it("Login and return tokens in headers", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    let authTokens = res.get("authorization");
    const splitHeader = authTokens.split(" ");

    accessToken.push(splitHeader[1].trim()); // give the token
    refreshToken.push(splitHeader[3].trim());
    console.log()
    expect(res.status).toBe(200);

    expect(res.get("authorization")).toBeDefined();
  })
})

/**
 * Test 3: Test that the /login endpoint throws a PokemonAuthError for invalid credentials
 */
describe("T3: Throw PokemonAuthError for Invalid Login Credentials", () => {
  it("Invalid Login throws Error", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: 'invalid',
        password: 'invalid'
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid Login Credentials")
  })
})


/**
 * Test 4: Test that the /requestNewAccessToken endpoint returns a new JWT access token for a valid refresh token
 */

describe("T4: Test endpoint token refresh", () => {
  let authTokens = null
  it("Login and return tokens in headers", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    authTokens = res.get("authorization");
    const splitHeader = authTokens.split(" ");

    accessToken.push(splitHeader[1].trim()); // give the token
    refreshToken.push(splitHeader[3].trim());

    expect(res.status).toBe(200);

    expect(res.get("authorization")).toBeDefined();
  })


  it("Generates token on endpoint", async () => {

    //   let authTokens = `Bearer ${accessToken[0]} Refresh ${refreshToken[0]}`;
    const res = await request(app)
      .get(`${BASE_URL}/requestNewAccessToken`)
      .send({
        _username: "brad"
      })
      .set("authorization", authTokens)

    expect(res.status).toBe(201);
    expect(res.body.refreshToken).toBeDefined();
  })
})


/**
 * Test 5: Test that the /requestNewAccessToken endpoint throws a PokemonAuthError for an invalid or missing refresh token
 */

describe("T5: Test Invalid Refresh Token", () => {

  let options = { expiresIn: "10s" };
  let access = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);
  let refresh = JWT.sign({ username: "brad" }, "badsecret", options);
  let authTokens = `Bearer ${access} Refresh null`;

  it("Making Invalid Request", async () => {

    await new Promise((res, rej) => { setTimeout(res, 2000) })
    const res = await request(app)
      .get(`${BASE_URL}/requestNewAccessToken`)
      .set("authorization", authTokens)


    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid Tokens.");
  })
})


/**
 * Test 6: Test that the refresh token is added to the refreshTokens
 *         array on login and removed on logout
 */
describe("T6: Test Refresh Token is Added to Header", () => {
  it("Logging in", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    
    expect(res.get("authorization")).toBeDefined();
  })

  it("Logging Out", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/logout`);

    expect(res.get("authorization")).toBe("null");

    expect(res.status).toBe(200);

  })
})

/**
 * Test 7: - Test that the JWT access token can be decoded and contains the correct user data
 */
describe("T7: Test Access Token can decode user data", () => {

  let authToken;

  it("Logging in", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: 'testuser',
        password: 'testpassword'
      });


    let headerString = res.get("authorization");
    console.log(headerString);
    const splitHeader = headerString.split(" ");


    authToken = splitHeader[1];

  })

  it("Decoding token", async () => {

    const token = JWT.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    const { username } = token;

    expect(username).toBe("testuser");
  })
});

/**
 * Test 8: Test that a user can successfully register,
 *         login, and make a request with a JWT access token
 */
describe("T8: Register, Login and make a Request", () => {

  const username = "bradmasy1";
  const password = "comp4537";
  const fname = "brad";
  const lname = "masciotra";

  let accessToken = null;
  let refreshToken = null;
  let authorizationTokens = null;

  it("Register", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/register`)
      .send({
        username: username,
        password: password,
        fname: fname,
        lname: lname
      })

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User successfully registered");

  })

  it("Login", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: username,
        password: password
      })

    expect(res.status).toBe(200);
    expect(res.get("authorization")).toBeDefined();

    authorizationTokens = res.get("authorization");
  })

  it("Request", async () => {

    //let tokens = parseHeader(authorizationTokens);

    const res = await request(app)
      .get(`${BASE_URL}/pokemons`)
      .set("authorization", authorizationTokens)

    expect(res.status).toBe(200);

  })
})

/**
 * Test 9: Test that an unauthenticated user cannot access protected endpoints
 */

describe("T9: Restrain Unauthenticated User", () => {
  it("Make request without tokens", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/pokemons`)
      .set("authorization", null)

    expect(res.status).toBe(401);
  })

})

/**
 * Test 10: Test that an expired JWT access token
 *          cannot be used to access protected endpoints
 */
describe("T10: Expired JWT Test", () => {

  const options = { expiresIn: "0.1s" };
  const accessToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);

  let authTokens = `Bearer ${accessToken} Refresh${refreshToken}`;

  it("Try Invalid Token", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/pokemons`)
      .set("authorization", authTokens)


    expect(res.status).toBe(401);
  })
})

/**
 * Test 11: Test that a request with an invalid JWT access token throws a PokemonAuthError
 */
describe("T11: Test Request with expired JWT access Test", () => {

  const options = { expiresIn: "1s" };
  const accessToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);

  let authTokens = `Bearer ${accessToken} Refresh${refreshToken}`;

  it("wait", async () => {
    await new Promise((res, rej) => { setTimeout(res, 4000) })

  });

  it("Try Invalid Token", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/pokemons`)
      .set("authorization", authTokens)

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Unauthorized, no access token. Please login again");
  }, 10000)

}, 10000)

/**
 * Test 12: Test that a refresh token cannot be used to access protected endpoints
 */
describe("T12: Valid Refresh JWT Test", () => {

  const options = { expiresIn: "1hr" };

  const accessToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options);
  let authTokens = `Bearer ${accessToken} Refresh ${refreshToken}`;

  const count = 2;
  const limit = 10;

  it("Try valid Token", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/pokemons?count=${count}&limit=${limit}`)
      .set("authorization", authTokens);



    expect(res.status).toBe(200);

  })
})

/**
 * Test 13: Test that non-admin user cannot access admin protected routes
 */
describe("T13: Test that non-admin user cannot access admin protected routes", () => {

  const options = { expiresIn: "1hr" };
  let accessToken = null;
  let refreshToken = null;
  let authTokens = null;// = `Bearer ${accessToken} Refresh${refreshToken}`;

  const id = 2;

  it("login", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: "keannu",
        password: "1234"
      })

    expect(res.status).toBe(200);
    expect(res.get("authorization")).toBeDefined();


    let authTokens1 = res.get("authorization");
    const splitHeader = authTokens1.split(" ");

    accessToken = splitHeader[1];
    refreshToken = splitHeader[3];

    console.log(accessToken);
    console.log(refreshToken);

    authTokens = `Bearer ${accessToken} Refresh ${refreshToken}`;

  })


  it("Fail admin route", async () => {
    const id = 10000;
    const res = await request(app)
      .put(`${BASE_URL}/pokemon/${id}`)
      .set("authorization", authTokens)
      .send({

        id: 1030,
        name: {
          english: "bradamon"
        },
        base: {
          "HP": 45,
          "Attack": 49,
          "Defense": 49,
          "Sp. Attack": 65,
          "Sp. Defense": 65,
          "Speed": 45
        },
        type: ["psychic"]

      });

    expect(res.status).toBe(405);

  }, 10000)

}, 10000)


// /**
//  * Test 14: Test that after logging out, a user cannot access protected routes until the user re-login
//  */

describe("Test 14: Test that after logging out, a user cannot access protected routes until the user re-login", () => {
  it("login", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: "testuser",
        password: "testpassword"
      })

    expect(res.status).toBe(200);
    expect(res.get("authorization")).toBeDefined();
  })

  it("logout", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/logout`);

    expect(res.get("authorization")).toBe("null");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("successfully signed out")

  })


  it("access protected route", async () => {
    const id = 10000;
    const res = await request(app)
      .put(`${BASE_URL}/pokemon/${id}`)
      .send({
        base: "grass",
        name: "bulbasaur",
        id: id
      })
      .set("authorization", null);


    expect(res.status).toBe(401);
  })

  let accessToken = null;
  let refreshToken = null;
  authTokens = null;

  it("second login", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        username: "testuser",
        password: "testpassword"
      })

    expect(res.status).toBe(200);
    expect(res.get("authorization")).toBeDefined();


    authTokens = res.get("authorization");
    const splitHeader = authTokens.split(" ");


    accessToken = splitHeader[1];
    refreshToken = splitHeader[3];
  })

  it("second access protected route", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/pokemon`)
      .send({
        id: 1113,
        name: {
          english: "bradamononetwo"
        },
        base: {
          "HP": 45,
          "Attack": 49,
          "Defense": 49,
          "Sp. Attack": 65,
          "Sp. Defense": 65,
          "Speed": 45
        },
        type: ["psychic"]

      })
      .set("authorization", authTokens)


    expect(res.status).toBe(201);
    expect(res.body.msg).toBe("Added Successfully")
  })
})


/**
 * Test 15 Edge 1: Invalid payloads for register and login endpoints
 */

describe("Test 15 Edge 1: Invalid payloads for register and login endpoints", () => {
  it("invalid login payload", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send({
        invalid: "invalid",
        invalid_two: "invalid"
      })

    expect(res.status).toBe(406);
    expect(res.body.message).toBe("Illegal Arguments.")

  })


  it("invalid register payload", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/register`)
      .send({
        invalid: "invalid",
        invalid_two: "invalid"
      })

    expect(res.status).toBe(406);
    expect(res.body.error).toBe("Incorrect Payload.")

  })
})


/**
 * Test 15 Edge 2: Invalid token secrets or expiration times
 */
describe("Test 15 Edge 2: Invalid token secrets or expiration times", () => {

  const options = { expiresIn: "1hr" };

  const accessToken = JWT.sign({ username: "jo" }, "incorrectSecret", options);
  const refreshToken = JWT.sign({ username: "jo" }, "incorrectSecret", options);
  let authTokens = `Bearer ${accessToken} Refresh${refreshToken}`;

  const count = 2;
  const limit = 10;

  it("Invalid Secret", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/pokemons?count=${count}&limit=${limit}`)
      .set("authorization", authTokens);

    expect(res.status).toBe(401);

  })

  const options2 = { expiresIn: "1s" };
  const accessToken2 = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options2);
  const refreshToken2 = JWT.sign({ username: "brad" }, process.env.ACCESS_TOKEN_SECRET, options2);
  let authTokens2 = `Bearer ${accessToken2} Refresh ${refreshToken2}`;

  it("Expiration time", async () => {

    await new Promise((res, rej) => { setTimeout(res, 2000) })

    const res = await request(app)
      .get(`${BASE_URL}/pokemons?count=2&after=10`)
      .set("authorization", authTokens2);

    expect(res.status).toBe(403)
  })
})


/**
 * Test 16 Edge 3: Duplicate or missing documents in the database
 */

describe("Test 16 Edge 3: Duplicate or missing documents in the database", () => {

  const options = { expiresIn: "1hr" };
  const accessToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  let authTokens = `Bearer ${accessToken} Refresh ${refreshToken}`;


  it("duplicating already existing data", async () => {
    const res = await request(app)
      .post(`${BASE_URL}/pokemon`)
      .set("authorization", authTokens)
      .send({
        "id": 1100,
        "name": {
          "english": "test",
          "japanese": "test",
          "chinese": "test",
          "french": "test"
        },
        "base": {
          "HP": 50,
          "Attack": 20,
          "Defense": 55,
          "Speed": 30,
          "Speed Attack": 25,
          "Speed Defense": 25
        },

        "type": [
          "Bug"
        ]

      })

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("error creating pokemon");
  })

})

/**
 * Test 17 Edge 4: Unhandled database errors
 */
describe("Test 17 Edge 4: Unhandled database errors", () => {
  it("disconnect", async () => {

    await mongoose.disconnect();

  })

  const options = { expiresIn: "1hr" };

  const accessToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  let authTokens = `Bearer ${accessToken} Refresh${refreshToken}`;


  const count = 2;
  const limit = 10;

  it("Database errors", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/pokemons?count=${count}&limit=${limit}`)
      .set("authorization", authTokens);


    expect(res.status).toBe(401);
  })
})


/**
 * Test 18 Edge 5: Invalid HTTP requests or responses
 */
describe("Test 18 Edge 5: Invalid HTTP requests or responses", () => {
  const options = { expiresIn: "1hr" };

  const accessToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  const refreshToken = JWT.sign({ username: "jo" }, process.env.ACCESS_TOKEN_SECRET, options);
  let authTokens = `Bearer ${accessToken} Refresh${refreshToken}`;

  it("invalid request endpoint", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/invalid`)
      .set("authorization", authTokens);


    expect(res.status).toBe(408);
  })

})



