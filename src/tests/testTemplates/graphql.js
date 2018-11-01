module.exports = {
  generateTemplate: (params) => {
    return {
      [params[0]]: [
        'schema.gql',
        'resolver.js'
      ]
    }
  },
  path: 'testBasePath',
}