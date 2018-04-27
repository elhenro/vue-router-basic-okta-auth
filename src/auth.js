/* globals localStorage */
const OktaAuth = require('@okta/okta-auth-js')
const authClient = new OktaAuth({url: 'https://dev-500613.oktapreview.com', issuer: 'default'})

export default {
  login (email, pass, callBack) {
    callBack = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (callBack) callBack(true)
      this.onChange(true)
      return
    }
    return authClient.signIn({
      username: email,
      password: pass
    }).then(response => {
      if (response.status === 'SUCCESS') {
        localStorage.token = response.token
        if (callBack) callBack(true)
        this.onChange(true)
      }
    }).fail(err => {
      console.error(err.message)
      if (callBack) callBack(false)
      this.onChange(false)
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (callback) {
    delete localStorage.token
    if (callback) callback()
    this.onChange(false)
    return authClient.signOut()
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {
  }
}
