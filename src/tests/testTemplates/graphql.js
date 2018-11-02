module.exports = {
  generateTemplate: ([ baseDir ]) => {
    return {
      [baseDir]: [
        'schema.gql',
        'resolver.js'
      ]
    }
  },
  path: 'testBasePath',
}