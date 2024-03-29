/*--------------------------------------------------------------------------------
################################################################################
 * the test of page public component by cypress
################################################################################
------------------------------------------------------------------------------*/

context ('login',   () => {

    describe('test of index', () =>{

        // test of  the lien public component
        it('ref public marche', () => {
            cy.visit('http://localhost:3000')
            cy.contains("public component").click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/")
                expect(location.port).to.eq("3000")
            })
        });

        // test for the fixed texts
        it('text marche', () => {
            cy.contains("bienvenue sur le composant public").click();
            cy.contains("Entrez le nom associé à la carte").click();
            cy.contains("Entrez le numéro associé à la carte").click();
            cy.contains("Entrez la date de validité").click();
            cy.contains("Entrez le code de sécurité").click();
            cy.contains("vous avez entré 0 nouvelles entrées").click();
        });

        // test for input and button
        it('form marche1', () => {
            const nom = 'SG';
            const numero = '1234123412341234';
            const date = '09/22';
            const code = '222';
            cy.get("input#nomCarte")
                .type(nom);
            cy.get("input#numeroCarte")
                .type(numero);
            cy.get("input#dateCarte")
                .type(date);
            cy.get("input#codeSecuCarte")
                .type(code);
            cy.get('input#submit').click();
            cy.contains("vous avez entré 1 nouvelles entrées").click();
            //cy.contains("information bancaire n°0");
            cy.contains("nom : " + nom);
            cy.contains("numero : " + numero);
            cy.contains("date validité : " + date);
            cy.contains("code sécurité : " + code);
        });

        // test for input and button
        it('form marche2', () => {
            const nom = 'BNP';
            const numero = '1355246635775677';
            const date = '02/23';
            const code = '333';
            cy.get("input#nomCarte").clear()
                .type(nom);
            cy.get("input#numeroCarte").clear()
                .type(numero);
            cy.get("input#dateCarte").clear()
                .type(date);
            cy.get("input#codeSecuCarte").clear()
                .type(code);
            cy.get('input#submit').click();
            cy.contains("vous avez entré 2 nouvelles entrées").click();
            //cy.contains("information bancaire n°1");
            cy.contains("nom : " + nom);
            cy.contains("numero : " + numero);
            cy.contains("date validité : " + date);
            cy.contains("code sécurité : " + code);
        });

        // test for same input
        it('note repeat', () => {
            const nom = 'BNP';
            const numero = '1355246635775677';
            const date = '02/23';
            const code = '333';
            cy.get("input#nomCarte").clear()
                .type(nom);
            cy.get("input#numeroCarte").clear()
                .type(numero);
            cy.get("input#dateCarte").clear()
                .type(date);
            cy.get("input#codeSecuCarte").clear()
                .type(code);
            cy.get('input#submit').click();
            cy.contains("Une carte ayant le même numéro est déjà enregistré").click();

        });


    });

})