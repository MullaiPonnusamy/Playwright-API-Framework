import { test, expect} from '@playwright/test';

      let apiURL ="https://api.practicesoftwaretesting.com";
 
test.describe("Api Challenge", () => {

    //Test a GET request and validate the response
    test("GET /products/{id}", async ({ request }) => {
   // const apiURL ="https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(apiURL + "/products");

    expect(getProductResponse.status()).toBe(200);
    const responseBody = await getProductResponse.json();
         
    expect(responseBody.data.length).toBe(9);
    expect(responseBody.per_page).toBe(9);

    });

    //Test unauthorized user credentials and receive 401 unauthorized response
    test("Unauthorized Login POST /users/login", async({ request }) => {
    //const apiURL ="https://api.practicesoftwaretesting.com";  

    const response = await request.post(apiURL + "/users/login", {
        data: {
            email: "customer1@practicesoftwaretesting.com",
            password:"welcome01"
        },
    });

    expect (response.status()).toBe(401);
    });

    //Test a successful user login and receive 200 Success Response
    test("Successful POST /users/login", async({ request }) => {
   // const apiURL ="https://api.practicesoftwaretesting.com";  

    const response = await request.post(apiURL + "/users/login", {
        data: {
            email: "test@samplecustomer.com",
            password:"softPlaytesting@01"
        },
    });

    expect (response.status()).toBe(200);
    });
    
}); 