const x = require('../xcaffolder')
const path = require('path')

const DIR_BASE = path.resolve(__dirname)

const mockTemplateObject = {
  arrayTest: [
    'schema.gql',
    'resolver.js',
    {
      deeper: [
        'test'
      ]
    }
  ],
  objectTest: {
    deeper: [
      'test'
    ]
  }
}

describe('Module test', () => {
  test('gets config from JSON', () => {
    const { templatesPath } = x.getConfig(`${DIR_BASE}/.xcaffoldrc`)
    
    expect(templatesPath).toBe('testTemplates')
  })

  test('gets list of templates', () => {
    const templates = x.getTemplatesList(`${DIR_BASE}/testTemplates`)
    
    expect(Array.isArray(templates)).toEqual(true)
    expect(templates[0]).toBe('graphql')
  })

  test('throws error when templates folder missing', () => {
    expect(() => x.getTemplatesList(`${DIR_BASE}/testTemplate`)).toThrow(x.TemplatesFolderMissingError)
  })

  test('throws error when list of templates empty', () => {
    expect(() => x.getTemplatesList(`${DIR_BASE}/testTemplatesEmpty`)).toThrow(x.EmptyTemplatesListError)
  })

  test('gets template from file', () => {
    const { template, path } = x.getTemplate(`${DIR_BASE}/testTemplates/graphql.js`, ['test'])
    
    expect(Array.isArray(template.test)).toEqual(true)
    expect(template.test[0]).toBe('schema.gql')
    expect(template.test[1]).toBe('resolver.js')

    expect(path).toEqual('testBasePath')
  })

  test('gets files structure from object template from object', () => {
    const structure = x.getStructure(mockTemplateObject, `${DIR_BASE}/testCreation/`)
    
    expect(Array.isArray(structure)).toEqual(true)

    const dirs = structure.filter(elem => elem.type === x.DIRECTORY_TYPE)
    const files = structure.filter(elem => elem.type === x.FILE_TYPE)
    // Four dirs
    expect(dirs.length).toEqual(4)
    // Four files
    expect(files.length).toEqual(4)
  })

  test('gets files structure from array template from array', () => {
    const structure = x.getStructure(mockTemplateObject.arrayTest, `${DIR_BASE}/testCreation/`)
    
    expect(Array.isArray(structure)).toEqual(true)

    const dirs = structure.filter(elem => elem.type === x.DIRECTORY_TYPE)
    const files = structure.filter(elem => elem.type === x.FILE_TYPE)
    // One dir
    expect(dirs.length).toEqual(1)
    // Three files
    expect(files.length).toEqual(3)
  })
})