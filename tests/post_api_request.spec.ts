import { test, expect } from '@playwright/test';
import { testData } from'../test-data/api_request_testdata.ts';



test.use({
    baseURL: process.env.BASE_API_URL,
})


test("Create POST api request using Static Data file", async ({
  request,
}) => {
  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: testData.CreateBooking,
  });

  console.log('Create Booking POST API Response ')
  console.log(await postAPIResponse.json());

  const postAPIResponseBody = await postAPIResponse.json();
 
  // validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  expect(postAPIResponse.statusText()).toBe("OK")
  expect(postAPIResponse.headers()['content-type']).toContain('application/json')


  // validate api response json obj
  expect(postAPIResponseBody.booking).toHaveProperty(
    "firstname",
   testData.CreateBooking.firstname
  );
  expect(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    testData.CreateBooking.lastname
  );

  // validate api response nested json obj
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    testData.CreateBooking.bookingdates.checkin
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    testData.CreateBooking.bookingdates.checkout
  );
});
