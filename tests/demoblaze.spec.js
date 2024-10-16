// @ts-check

const { test, expect } = require('@playwright/test');
 
test('@Web Client App login', async ({ page}) => {
   //js file- Login js, DashboardPage
   const username = "rupali_maverick";
   const pass = "maverick123";
   const productName = "Nokia lumia 1520";
   const product_quantity = 2;
  
   //Load the Page
   await page.goto("https://www.demoblaze.com/");
  //click on Login Button and enter User name and password
   await page.locator("#login2").click();
   await page.locator('#loginusername').fill(username);
   await page.locator('#loginpassword').fill(pass);
  
   const login_button = page.locator('.btn-primary').nth(2);;
   await login_button.click();
   await page.waitForLoadState('networkidle');
   const title = await page.locator('#tbodyid').allTextContents();
   console.log(title);
   
   const product = page.locator('.card-block');
   const title1 = await page.locator('.card-block').allTextContents();
   const product_count = await product.count();
   console.log(product_count);
   console.log("Product page loaded");
  //find the product to be added in the cart and click on the same
   for(let i = 0; i < product_count; ++i)
   {
      if(await product.nth(i).locator('a.hrefch').textContent() ===productName)
      {
        console.log("click on Product");
        await product.nth(i).locator('.hrefch').click();
        break;
      }
      
   }
    //Load the product page and validate the correct the page has been loaded
      await page.waitForLoadState('networkidle');
      const product_title = await page.locator('#tbodyid .name').textContent();
    
      if (product_title === productName)
     {
        console.log(product_title);
        // Set up the dialog listener for the product addded to cart confirmation
        page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Product added.');
        await dialog.accept();  
        console.log("Product added to the cart");
      });
      //add yhe product to the cart as per given quantity
      for (let i = 0; i < product_quantity; i++) 
      {
          await page.locator('a.btn.btn-success.btn-lg').click();
          console.log("product added to cart as per quantity");
          await page.waitForTimeout(1000);
          await page.waitForLoadState('networkidle');          
      }
    }
    //GO to cart page and validate cart items correctly added
     const cartlink = await page.locator('#cartur');
     cartlink.click();
     await page.waitForLoadState('networkidle');
     await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
     await page.locator('#tbodyid').waitFor();
     
     const productRow = await page.locator(`#tbodyid td`).filter({
        hasText: productName
      });
      const cart_count = await productRow.count();
      console.log(cart_count);
      expect(product_quantity).toBe(cart_count);
      console.log("cart validated for the correct product added");
    }
  )