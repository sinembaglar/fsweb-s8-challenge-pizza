describe('Anasayfa', () => {
  it('ACIKTIM butonu sipariş formuna götürüyor', () => {
    cy.visit('/')
    cy.contains('ACIKTIM').click()
    cy.url().should('include', '/siparis')
  })

  it('kategori sekmesine tıklayınca o sekme aktif oluyor', () => {
    cy.visit('/')
    cy.contains('.category-tab', 'Pizza').should('have.attr', 'aria-pressed', 'true')
    cy.contains('.category-tab', 'Burger').click()
    cy.contains('.category-tab', 'Burger').should('have.attr', 'aria-pressed', 'true')
    cy.contains('.category-tab', 'Pizza').should('have.attr', 'aria-pressed', 'false')
  })

  it('3 ürün kartını listeliyor', () => {
    cy.visit('/')
    cy.get('.product-card').should('have.length', 3)
  })
})

describe('Sipariş formu', () => {
  beforeEach(() => {
    cy.visit('/siparis')
  })

  it('isim inputuna metin yazılabiliyor', () => {
    cy.get('#isim').type('Sinem').should('have.value', 'Sinem')
  })

  it('isim 3 karakterden kısaysa hata gösteriyor', () => {
    cy.get('#isim').type('ab')
    cy.contains('İsim en az 3 karakter olmalı.').should('be.visible')
    cy.get('#isim').type('c')
    cy.contains('İsim en az 3 karakter olmalı.').should('not.exist')
  })

  it('birden fazla malzeme seçilebiliyor', () => {
    cy.get('#pepperoni').check()
    cy.get('#sosis').check()
    cy.get('#misir').check()
    cy.get('#ananas').check()

    cy.get('input[name="malzemeler"]:checked').should('have.length', 4)
    cy.contains('dt', 'Seçimler').next().should('have.text', '20.00₺')
  })

  it('form eksikken SİPARİŞ VER butonu disabled', () => {
    cy.contains('button', 'SİPARİŞ VER').should('be.disabled')
  })

  it('formu gönderip onay sayfasına gidiyor', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', (req) => {
      req.reply({
        statusCode: 201,
        body: { ...req.body, id: '123', createdAt: '2026-10-16T12:00:00.000Z' },
      })
    }).as('siparisGonder')

    cy.get('#boyut-orta').check()
    cy.get('#hamur').select('İnce')
    cy.get('#pepperoni').check()
    cy.get('#sosis').check()
    cy.get('#misir').check()
    cy.get('#ananas').check()
    cy.get('#isim').type('Sinem')
    cy.get('#not').type('Kapıyı çalmayın')

    cy.contains('button', 'SİPARİŞ VER').should('be.enabled').click()

    cy.wait('@siparisGonder')
      .its('request.body')
      .should((body) => {
        expect(body.isim).to.equal('Sinem')
        expect(body.boyut).to.equal('Orta')
        expect(body.malzemeler).to.have.length(4)
      })

    cy.url().should('include', '/onay')
    cy.contains('SİPARİŞ ALINDI').should('be.visible')
  })

  it('onay sayfasında sipariş özetini gösteriyor', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', (req) => {
      req.reply({ statusCode: 201, body: { ...req.body, id: '123' } })
    })

    cy.get('#boyut-buyuk').check()
    cy.get('#hamur').select('Kalın')
    cy.get('#pepperoni').check()
    cy.get('#sosis').check()
    cy.get('#misir').check()
    cy.get('#ananas').check()
    cy.get('#isim').type('Sinem')
    cy.contains('button', 'SİPARİŞ VER').click()

    cy.contains('#123').should('be.visible')
    cy.contains('dd', 'Büyük').should('be.visible')
    cy.contains('dd', 'Pepperoni, Sosis, Mısır, Ananas').should('be.visible')
    cy.contains('dd', '105.50₺').should('be.visible')
  })

  it('ağ hatasında kullanıcıya mesaj gösteriyor', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', { forceNetworkError: true })

    cy.get('#boyut-orta').check()
    cy.get('#hamur').select('İnce')
    cy.get('#pepperoni').check()
    cy.get('#sosis').check()
    cy.get('#misir').check()
    cy.get('#ananas').check()
    cy.get('#isim').type('Sinem')
    cy.contains('button', 'SİPARİŞ VER').click()

    cy.contains('İnternete bağlanılamadı').should('be.visible')
    cy.url().should('include', '/siparis')
    cy.contains('button', 'SİPARİŞ VER').should('be.enabled')
  })
})
