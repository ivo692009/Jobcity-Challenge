//Import the DataModel class and the esential for the playwright tests

import { test, expect } from '@playwright/test';
import DataModel from './dataModel.js';

//Create a new instance of the DataModel class
const dataModel = new DataModel(); 
const userData = dataModel.getData(); 

//The tests suits must be 1 by 1 for the natural flow of the test
//First we need to make a purchase and save the order number
//Then we can search the order by email and zip code
//Finally we can test the error messages


test('buying the product and save the order number', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://magento.softwaretestingboard.com/');

  // Select a product and add it to the cart
  await expect(page.getByRole('link', { name: 'Argus All-Weather Tank' }).first()).toBeVisible();
  await page.locator('li').filter({ hasText: 'Argus All-Weather Tank As low' }).getByLabel('M').click();
  await page.locator('li').filter({ hasText: 'Argus All-Weather Tank As low' }).getByLabel('Gray').click();

  //Add the product to the cart
  await page.locator('li').filter({ hasText: 'Argus All-Weather Tank As low' }).getByRole('button').click();

  //Assertion to see if the product was added to the cart
  await expect(page.getByText('You added Argus All-Weather')).toBeVisible();

  // proceed to the shipping cart
  await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

  // Fill the checkout information

  //Email
  await page.getByRole('textbox', { name: 'Email Address * Email Address' }).fill(userData.email);
  //First name
  await page.getByLabel('First Name').fill(userData.firstName);
  //Last name
  await page.getByLabel('Last Name').fill(userData.lastName);
  //Company
  await page.getByLabel('Company').fill(userData.company);
  //Street Address
  await page.getByLabel('Street Address: Line 1').fill(userData.street);
  //city
  await page.getByLabel('City').fill(userData.city);
  //Option of state
  await page.locator('select[name="region_id"]').selectOption('12');
  //Zip/Postal Code
  await page.getByLabel('Zip/Postal Code').fill(userData.zipCode);
  //Phone Number
  await page.getByLabel('Phone Number').fill(userData.phoneNumber);
  //Check the fixed shipping method
  await page.getByLabel('Fixed').check();
  //Click on the next button
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(3000);

  // Confirm the order
  await expect(page.getByText('Payment Method', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.waitForTimeout(3000);
  // Confirm the order after the payment
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

  //extrat the order number to use it in the next test
  const orderText = await page.getByText('000', { exact: false }).textContent();
  dataModel.setOrder(orderText); // Guarda el número de orden en el modelo

});

test('Search order by email', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://magento.softwaretestingboard.com/sales/guest/form/');
  // Fill the form with the order number
  await page.getByLabel('Order ID').fill(userData.order);
  // Fill the form with the last name
  await page.getByLabel('Billing Last Name').fill(userData.lastName);
  // Select the option to search by email
  await page.getByLabel('Email', { exact: true }).fill(userData.email);
  await page.waitForTimeout(3000);
  // Click on the continue button
  await page.getByRole('button', { name: 'Continue' }).click();
  //Wait for the page to load
  await page.waitForTimeout(5000);
  //Assertion to see if the order is pending and visible
  await expect(page.getByText('Pending')).toBeVisible();
  await expect(page.locator('li').filter({ hasText: /^Order Information$/ }).getByRole('strong')).toBeVisible();
  //Assertion to see if the product we purchase is visible
  await expect(page.getByText(userData.product)).toBeVisible();


});

test('Search order by Zip/Postal Code', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://magento.softwaretestingboard.com/sales/guest/form/');
  // Fill the form with the order number
  await page.getByLabel('Order ID').fill(userData.order);
  // Fill the form with the last name
  await page.getByLabel('Billing Last Name').fill(userData.lastName);
  // Select the option to search by zip code
  await page.getByLabel('Find Order By').selectOption('zip');
  // Fill the form with the zip code
  await page.getByLabel('Billing ZIP Code').fill(userData.zipCode);
  await page.waitForTimeout(3000);
  // Click on the continue button
  await page.getByRole('button', { name: 'Continue' }).click();
  //Wait for the page to load
  await page.waitForTimeout(5000);
  //Assertion to see if the order is pending and visible
  await expect(page.getByText('Pending')).toBeVisible();
  await expect(page.locator('li').filter({ hasText: /^Order Information$/ }).getByRole('strong')).toBeVisible();
 
  //Assertion to see if the product we purchase is visible
  await expect(page.getByText(userData.product)).toBeVisible();


});

test('Send form with invalid data', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://magento.softwaretestingboard.com/sales/guest/form/');
  // Fill the form with the order number
  await page.getByLabel('Order ID').fill('Aaa111');
  // Fill the form with the last name
  await page.getByLabel('Billing Last Name').fill('XAPA123!');
  // Select the option to search by zip code
  await page.getByLabel('Find Order By').selectOption('zip');
  // Fill the form with the zip code
  await page.getByLabel('Billing ZIP Code').fill('ABC123!!');
  await page.waitForTimeout(1000);
  // Click on the continue button
  await page.getByRole('button', { name: 'Continue' }).click();
  //Wait for the page to load
  await page.waitForTimeout(1000);
  //Assertion to see if the error message is visible
  await expect(page.getByText('You entered incorrect data.')).toBeVisible();

  //Fill the form with incorrect data an email
  await page.getByLabel('Order ID').fill('Aaa111');
  await page.getByLabel('Billing Last Name').fill('XAPA123!');
  await page.getByLabel('Email', { exact: true }).fill('noemail@available.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(2000);

  //Assertion to see if the error message is visible
  await expect(page.getByText('You entered incorrect data.')).toBeVisible();


});

test('Send form without information', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://magento.softwaretestingboard.com/sales/guest/form/');
  
  // // Select the option to search by zip code
  await page.getByLabel('Find Order By').selectOption('zip');
  await page.getByLabel('Billing ZIP Code').clear();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Continue' }).click();
  //Wait for the page to load
  await page.waitForTimeout(2000);
  //Assertion for missing fields
  await expect(page.locator('#oar-order-id-error')).toBeVisible();
  await expect(page.locator('#oar-billing-lastname-error')).toBeVisible();
  await expect(page.locator('#oar_zip-error')).toBeVisible();
  //Reload and clear all data

  //Assertion for empty email
  // Select the option to search by email
  await page.reload();
  await page.getByLabel('Email', { exact: true }).clear();
  await page.getByRole('button', { name: 'Continue' }).click();
  //Wait for the page to load
  await page.waitForTimeout(2000);
  //Missing order data
  await expect(page.locator('#oar-order-id-error')).toBeVisible();
  //Missing email data
  await expect(page.locator('#oar_email-error')).toBeVisible();
  //Missing last name data
  await expect(page.locator('#oar-billing-lastname-error')).toBeVisible();

});