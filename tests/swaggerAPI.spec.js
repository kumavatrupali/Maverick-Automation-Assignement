const {test, expect, request} = require('@playwright/test');
const newPetDataPayload = {
    id: null,
    category: { id: 0, name: "Fresh" },
    name: "aaru1",
    photoUrls: ["string"],
    tags: [{ id: 0, name: "Hot" }],
    status: "available"
  };
const petId = 9223372036854095925;
const apiKey = 'special-key';

//Add New Pet to the store
test('Add new pet to store', async ({ request }) => {
 
    // POST request to add the new pet to the store
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        data: newPetDataPayload,  
        headers: {
          'Content-Type': 'application/json'
         // 'api_key': `Bearer ${apiKey}`
        }
    });
    //Validate the response of the POST request
    expect(response.ok()).toBeTruthy();  // Assert that the request was successful (status 2xx)
    const responseBody = await response.json();  // Parse the response body as JSON

    //Check that the response includes the correct pet data
    expect(responseBody.name).toBe(newPetDataPayload.name);  // Validate the pet's name
    expect(responseBody.status).toBe(newPetDataPayload.status);  // Validate the pet's status

    // Output the entire response body for debugging purposes
    console.log(responseBody);
});

//Find Pet BY ID
test('get pet by ID', async ({ request }) => {
 
        // Step 1: Send a GET request to find the pet by ID
        await new Promise(resolve => setTimeout(resolve, 2000));  // Wait 2 seconds
        const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`, {
          headers: {
            'Content-Type': 'application/json',
            'api_key': `Bearer ${apiKey}`
          }
        });
      
        //Validate the response
       //expect(response.ok()).toBeTruthy();  // Assert that the request was successful (status 2xx)
      
        const responseBody = await response.json();  // Parse the response body as JSON
        console.log(response);
        console.log(responseBody);
});