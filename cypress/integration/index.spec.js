context ('login',   () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    describe('test of index', () =>{

        it('ref public marche', () => {
            cy.contains("public component").click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/")
                expect(location.port).to.eq("3000")
            })
        });


        it('text marche', () => {
            cy.contains("Entrez le nom associé à la carte").click();
            cy.contains("Entrez le numéro associé à la carte").click();
            cy.contains("Entrez la date de validité").click();
            cy.contains("Entrez le code de sécurité").click();
            cy.contains("il y a : 0 informations entrées").click();
        });


        it('form marche', () => {
            const nom = 'SG'
            const numero = '1234123412341234'
            const date = '09/22'
            const code = '222'
            cy.get("input#nomCarte")
                .type(nom);
            cy.get("input#numeroCarte")
                .type(numero);
            cy.get("input#dateCarte")
                .type(date);
            cy.get("input#codeSecuCarte")
                .type(code);
            cy.get('input#submit').click();
            cy.contains("il y a : 1 informations entrées").click();
            cy.contains("information bancaire n°0")
            cy.contains("nom : " + nom)
            cy.contains("numero : " + numero)
            cy.contains("date validité : " + date)
            cy.contains("code sécurité : " + code)
        });


    });

})