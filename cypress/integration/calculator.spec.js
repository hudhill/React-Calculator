describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  })

  it('should update the display of the running total', () => {
    cy.get('#number2').click();
    cy.get('#running-total').should('contain', '2')
  })

  it('should update the display with the result of the operation', () => {
    cy.get('#number2').click();
    cy.get('#operator-add').click();
    cy.get('#number3').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '5')
  })

  //this test fails. the application does not allow this operation
  it('should allow multiple operations to be chained together', () => {
    cy.get('#number2').click();
    cy.get('#operator-add').click();
    cy.get('#number3').click();
    cy.get('#operator-subtract').click();
    cy.get('#number1').click();
    cy.get('#operator-equals').click();
    cy.get('#running-total').should('contain', '4')
  })

  it('should display expected output for positive number', () => {
    cy.get('#number3').click();
    cy.get('.display').should('contain', '3');
  })

  it('should display expected output for negative number', () => {
    cy.get('#number3').click();
    cy.get('#operator-subtract').click();
    cy.get('#number6').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '-3');
  })

  it('should display expected output for decimal', () => {
    cy.get('#number3').click();
    cy.get('#decimal').click();
    cy.get('#number3').click();
    cy.get('.display').should('contain', '3.3');
  })

  it('should display expected output for very large numbers', () => {
    cy.get('#number9').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('#operator-multiply').click();
    cy.get('.display').should('contain', '3.043252722170454e+52')
  })

  it('should return Infinity when value is divided by zero', () => {
    cy.get('#number3').click();
    cy.get('#operator-divide').click();
    cy.get('#number0').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', 'Infinity')
  })

})