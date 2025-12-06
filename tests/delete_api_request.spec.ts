import { test, expect } from '@playwright/test';
import { testData } from'../test-data/api_request_testdata.ts';


test.use({
    baseURL: process.env.BASE_API_URL,
})

test("Create DELETE api request using Static Data file", async ({
  request,
}) => {
  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: testData.CreateBooking,
  });

  console.log('Create Booking POST API Response ')
  console.log(await postAPIResponse.json());
  const bookingId = await postAPIResponse.json();
  const bId = bookingId.bookingid;

  
  // validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  expect(postAPIResponse.statusText()).toBe("OK")
  expect(postAPIResponse.headers()['content-type']).toContain('application/json')

 const postAPIResponseBody = await postAPIResponse.json();
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

  /****************************************/
  //Concatenate the booking ID in the End point

  const endPoint = '/booking/'+bId
  
  //Get the created booking details and validate the values
  const getAPIResponse = await request.get(endPoint, {});
  const getAPIResponseBody = await getAPIResponse.json();

  // validate status code
  console.log('\nRetrieve Booking response using Get API request ')
  console.log(await getAPIResponse.json());
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);

 
  // validate status code
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
  expect(getAPIResponse.statusText()).toBe("OK")
  expect(getAPIResponse.headers()['content-type']).toContain('application/json')


  // validate api response json obj
  expect(getAPIResponseBody).toHaveProperty(
    "firstname",
   testData.GetBookingDetails.firstname
  );
  expect(getAPIResponseBody).toHaveProperty(
    "lastname",
    testData.GetBookingDetails.lastname
  );

  // validate api response nested json obj
  expect(getAPIResponseBody.bookingdates).toHaveProperty(
    "checkin",
    testData.GetBookingDetails.bookingdates.checkin
  );
  expect(getAPIResponseBody.bookingdates).toHaveProperty(
    "checkout",
    testData.GetBookingDetails.bookingdates.checkout
  );
  /****************************************/


  /****************************************/
  // generate token
  const tokenAPIResponse = await request.post("/auth", {
    data: testData.TokenRequest,
  });
  expect(tokenAPIResponse.ok()).toBeTruthy();
  expect(tokenAPIResponse.status()).toBe(200);

  console.log('Retrieve Token Booking response using POST API request ')
  console.log(await tokenAPIResponse.json());
  const tokenResponseBody = await tokenAPIResponse.json();
  const tokenNo = tokenResponseBody.token;


  // DELETE api request
    const deleteAPIResponse = await request.delete(endPoint, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${tokenNo}`,
    },
  });
  expect(deleteAPIResponse.status()).toBe(201);
  expect(deleteAPIResponse.statusText()).toBe("Created");

  //Validate whether the record is deleted successfully by trying to retrieve it
  const getAPIResponseafterDeleteAction =await request.get(endPoint,{})
  expect(getAPIResponseafterDeleteAction.status()).toBe(404)
  expect(getAPIResponseafterDeleteAction.statusText()).toBe("Not Found")

});

