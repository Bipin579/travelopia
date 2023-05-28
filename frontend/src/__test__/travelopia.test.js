/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
///<reference types = "Cypress"/>
var name = "lala";
var email = "lala@gmail.com";
var destination = "India";
var travellers = 2;
var budget = 300
describe("travelopia testing", () => {

    it("submission-form-test", () => {

        cy.visit('http://localhost:3000');
        cy.get("#name").type(name);
        cy.get("#email").type(email);
        // cy.get('#destination').click();
        cy.get('#destination').select(destination)
        cy.get("#travellers").type(travellers);
        cy.get("#budget").type(budget);
        cy.get("#submit").click();
        cy.wait(20000); // waiting for server to respond

    });


    it("dashboard-test", () => {

        cy.visit("http://localhost:3000/dashboard");

        cy.get('tbody tr:nth-child(1) td:nth-child(2)').should("have.text", name);
        cy.get('tbody tr:nth-child(1) td:nth-child(3)').should("have.text", email);
        cy.get('tbody tr:nth-child(1) td:nth-child(4)').should("have.text", destination);
        cy.get('tbody tr:nth-child(1) td:nth-child(5)').should("have.text", travellers);
        cy.get('tbody tr:nth-child(1) td:nth-child(6)').should("have.text", "$ " + budget);

    })
})