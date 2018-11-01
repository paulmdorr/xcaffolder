const fs = require('fs')

const DIRECTORY_TYPE = 'dir'
const FILE_TYPE = 'file'

class EmptyTemplatesListError extends Error {}
class TemplatesFolderMissingError extends Error {}

module.exports = {
  DIRECTORY_TYPE,
  FILE_TYPE,
  getConfig(configFile) {
    return JSON.parse(fs.readFileSync(configFile))
  },
  getTemplatesList(templatesPath) {
    if (fs.existsSync(templatesPath)) {
      const templatesList = fs.readdirSync(templatesPath).map(
        file => file.replace('.js', '')
      )

      if (templatesList.length === 0) {
        throw new EmptyTemplatesListError()
      }

      return templatesList
    } else {
      throw new TemplatesFolderMissingError()
    }
  },
  getTemplate(fileName, params) {
    const { generateTemplate, path } = require(fileName)
    return {
      template: generateTemplate(params),
      path,
    }
  },
  getStructure(template, creationPath) {
    return Array.isArray(template)
      ? processArrays(template, creationPath)
      : processObjects(template, creationPath)
  },
  EmptyTemplatesListError,
  TemplatesFolderMissingError,
}

function processObjects(template, fullPath) {
  let files = []

  Object.keys(template).forEach(key => {
    files.push({
      type: DIRECTORY_TYPE,
      path: fullPath + key
    })

    files = Array.isArray(template[key])
      ? files.concat(processArrays(template[key], fullPath + key + '/'))
      : files.concat(processObjects(template[key], fullPath + key + '/'))
  })

  return files
}

function processArrays(template, fullPath) {
  let files = []

  template.forEach(elem => {
    if (typeof elem === 'string') {
      files.push({
        type: FILE_TYPE,
        path: fullPath + elem
      })
    } else {
      files = files.concat(processObjects(elem, fullPath))
    }
  })

  return files
}