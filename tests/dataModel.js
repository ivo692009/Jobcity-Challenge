//This is a class model to store a product to be purchased
//Whit this model we confirm that the product is the same as the one we are purchasing


class DataModel {
  constructor() {
    this.data = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Company',
      street: '123 Test St',
      city: 'Test City',
      zipCode: '12345',
      phoneNumber: '5551234567',
      order: '',
      product: 'Argus All-Weather Tank',
      price: '$22.00'
    };
  }

  //This method returns the data of the product
  getData() {
    return this.data;
  }
  //This method sets the order number
  setOrder(orderNumber) {
    this.data.order = orderNumber;
  }


}

export default DataModel;