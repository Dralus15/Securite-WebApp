context ('login',   () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });

    describe('test secure', () =>{
        it(' href secure marche', () => {
            cy.contains("secured component").click();
            cy.location().should((location) =>{
                expect(location.port).to.eq("8080")
            })
        });

        it(' page login', () => {
            cy.contains("secured component").click();
            cy.get("div#kc-header-wrapper").contains("demo");
            cy.get("h1#kc-page-title").contains("Sign in to your account");
            cy.contains("Username or email");
            cy.contains("Password");

            cy.location().should((location) =>{
                expect(location.port).to.eq("8080")
            });

            const  username = 'demo';
            const psw = "WaLtAi@Anf652$D";
            cy.get("input#username").type(username);
            cy.get("input#password").type(psw);
            cy.get('input#kc-login').click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/secured");
                expect(location.port).to.eq("3000")
            });
        });

        it(' page secured', () => {
            cy.contains("secured component").click();
            cy.location().should((location) =>{
                expect(location.port).to.eq("8080")
            });
            const  username = 'demo';
            const psw = "WaLtAi@Anf652$D";
            cy.get("input#username").type(username);
            cy.get("input#password").type(psw);
            cy.get('input#kc-login').click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/secured");
                expect(location.port).to.eq("3000")
            });
            cy.contains("This is a Keycloak-secured component of your application. You shouldn't be able to see this unless you've authenticated with Keycloak.");
            cy.get("button").click();
            cy.contains("réactualiser les données").click();

            cy.contains("nom : SG").click();
            cy.contains("numero carte : 1234123412341234").click();
            cy.contains("date validité : 09/22").click();
            cy.contains("code sécurité : 222");

            cy.contains("nom : BNP").click();
            cy.contains("numero carte : 1355246635775677").click();
            cy.contains("date validité : 02/23").click();
            cy.contains("code sécurité : 333").click();
        });

        it(' ref ', () => {
            cy.contains("secured component").click();
            cy.location().should((location) =>{
                expect(location.port).to.eq("8080")
            });
            const  username = 'demo';
            const psw = "WaLtAi@Anf652$D";
            cy.get("input#username").type(username);
            cy.get("input#password").type(psw);
            cy.get('input#kc-login').click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/secured");
                expect(location.port).to.eq("3000")
            });
            cy.contains("public component").click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/")
                expect(location.port).to.eq("3000")
            })

            cy.contains("secured component").click();
            cy.location().should((location) =>{
                expect(location.href).to.eq("http://localhost:3000/secured");
                expect(location.port).to.eq("3000")
            });
        });

    });

})