const user = {
  name: 'TESTINIMI',
  username: 'TESTITUNNUS',
  password: 'SALASANA'
}

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('WRONG')
      cy.get('#password').type('WRONG')
      cy.get('#login-button').click()

      cy.contains('Username or password incorrect.')
    })
  })

  describe('When logged in', function() {
    it('a blog can be created', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('TESTI TITLE')
      cy.get('#author').type('TESTAAJA')
      cy.get('#url').type('www')
      cy.get('#create_newblog').click()

      cy.contains('New blog added!')
      cy.contains('TESTI TITLE')
    })

    it('a blog can be liked', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('TESTI TITLE')
      cy.get('#author').type('TESTAAJA')
      cy.get('#url').type('www')
      cy.get('#create_newblog').click()

      cy.get('.viewbutton').click()
      cy.contains('Like').click()
      cy.get('.likescount').should('contain', '1')
    })

    it('a blog can be removed', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('TESTI TITLE')
      cy.get('#author').type('TESTAAJA')
      cy.get('#url').type('www')
      cy.get('#create_newblog').click()

      cy.get('.removebutton').click()
      cy.get('html').should('not.contain', 'TESTI TITLE')
    })

    it('blogs are sorted by likes', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('TESTI TITLE')
      cy.get('#author').type('TESTAAJA')
      cy.get('#url').type('www')
      cy.get('#create_newblog').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('2')
      cy.get('#author').type('2')
      cy.get('#url').type('www')
      cy.get('#create_newblog').click()

      cy.get('.viewbutton').eq(0).click()
      cy.get('.viewbutton').eq(1).click()
      cy.get('.viewbutton').eq(0).click()
      cy.contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('.viewbutton').eq(0).click()
      cy.get('.blog_content').eq(0).should('contain', '2')
    })
  })
})