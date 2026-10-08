const API_URL = 'https://reqres.in/api/pizza'

describe('Anasayfa', () => {
  it('ACIKTIM butonu sipariş formuna yönlendirir', () => {
    cy.visit('/')
    cy.get('[data-cy="order-cta"]').should('contain', 'ACIKTIM').click()
    cy.location('pathname').should('eq', '/siparis')
    cy.get('[data-cy="order-form"]').should('be.visible')
  })
})

describe('Sipariş formu', () => {
  beforeEach(() => {
    cy.visit('/siparis')
  })

  it('isim inputuna metin girilebilir', () => {
    cy.get('[data-cy="name-input"]').type('Sinem Bağlar').should('have.value', 'Sinem Bağlar')
  })

  it('isim 3 karakterden kısaysa hata mesajı gösterir', () => {
    cy.get('[data-cy="name-input"]').type('Si')
    cy.get('#isim-error').should('contain', 'en az 3 karakter')
    cy.get('[data-cy="name-input"]').type('n')
    cy.get('#isim-error').should('not.exist')
  })

  it('birden fazla malzeme seçilebilir', () => {
    cy.selectToppings(3)
    cy.get('[data-cy="topping"]:checked').should('have.length', 3)
    cy.get('#malzemeler-error').should('contain', 'En az 4')

    cy.selectToppings(5)
    cy.get('[data-cy="topping"]:checked').should('have.length', 5)
    cy.get('#malzemeler-error').should('not.exist')
  })

  it('en fazla 10 malzeme seçilebilir', () => {
    cy.selectToppings(10)
    cy.get('[data-cy="topping"]:checked').should('have.length', 10)
    cy.get('[data-cy="topping"]:not(:checked)').each(($topping) => {
      cy.wrap($topping).should('be.disabled')
    })
  })

  it('form eksikken sipariş butonu pasiftir', () => {
    cy.get('[data-cy="submit"]').should('be.disabled')
    cy.fillValidForm()
    cy.get('[data-cy="submit"]').should('be.enabled')
    cy.get('[data-cy="name-input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  })

  it('seçimlere ve adede göre fiyatı hesaplar', () => {
    cy.get('[data-cy="total"]').should('have.text', '85.50₺')
    cy.selectToppings(5)
    cy.get('[data-cy="extras-total"]').should('have.text', '25.00₺')
    cy.get('[data-cy="total"]').should('have.text', '110.50₺')

    cy.get('[data-cy="increase"]').click()
    cy.get('[data-cy="quantity"]').should('have.text', '2')
    cy.get('[data-cy="total"]').should('have.text', '221.00₺')

    cy.get('[data-cy="decrease"]').click().should('be.disabled')
  })

  it('formu gönderir ve onay sayfasına geçer', () => {
    cy.intercept('POST', API_URL, (req) => {
      req.reply({ statusCode: 201, body: { ...req.body, id: '123', createdAt: '2026-10-08T10:00:00.000Z' } })
    }).as('postOrder')

    cy.fillValidForm()
    cy.get('[data-cy="note-input"]').type('Kapıda zil çalmasın')
    cy.get('[data-cy="submit"]').click()

    cy.wait('@postOrder').then(({ request }) => {
      expect(request.headers).to.have.property('x-api-key')
      expect(request.body).to.include({ isim: 'Sinem Bağlar', boyut: 'M', hamur: 'İnce', ozel: 'Kapıda zil çalmasın' })
      expect(request.body.malzemeler).to.have.length(4)
    })
    cy.location('pathname').should('eq', '/onay')
    cy.get('[data-cy="success-title"]').should('contain', 'SİPARİŞ ALINDI')
    cy.get('[data-cy="order-meta"]').should('contain', '#123')
    cy.get('[data-cy="order-name"]').should('have.text', 'Sinem Bağlar')
    cy.get('[data-cy="order-size"]').should('have.text', 'M')
    cy.get('[data-cy="order-dough"]').should('have.text', 'İnce')
    cy.get('[data-cy="order-toppings"]').should('have.text', 'Pepperoni, Domates, Biber, Sosis')
    cy.get('[data-cy="order-extras"]').should('have.text', '20.00₺')
    cy.get('[data-cy="order-total"]').should('have.text', '105.50₺')
  })

  it('ağ hatasında kullanıcıya mesaj gösterir ve sayfada kalır', () => {
    cy.intercept('POST', API_URL, { forceNetworkError: true }).as('postOrder')

    cy.fillValidForm()
    cy.get('[data-cy="submit"]').click()

    cy.wait('@postOrder')
    cy.get('[data-cy="submit-error"]').should('contain', 'İnternete bağlanılamadı')
    cy.location('pathname').should('eq', '/siparis')
  })
})

describe('Sipariş onayı', () => {
  it('sipariş verilmeden açılınca forma yönlendiren mesaj gösterir', () => {
    cy.visit('/onay')
    cy.get('[data-cy="no-order"]').should('contain', 'HENÜZ SİPARİŞ YOK')
    cy.get('[data-cy="no-order"] a').click()
    cy.location('pathname').should('eq', '/siparis')
  })
})
