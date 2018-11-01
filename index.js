#!/usr/bin/env node
const x = require('./src/xcaffolder')
const commander = require('commander')
const inquirer = require('inquirer')
const { green, yellow, red } = require('chalk')
const fs = require('fs')

const CONFIG_FILE = '.xcaffoldrc'

const { templatesPath } = x.getConfig(CONFIG_FILE)

commander
  .arguments('[params]', 'List of parameters comma-sepparated')
  .option('-d, --dry', 'Dry run')
  .action((params) => {
    try {
      inquirer.prompt([
        {
          type: 'list',
          name: 'fileName',
          message: 'Available templates:',
          choices: x.getTemplatesList(templatesPath),
        }
      ]).then(answers => {
        const {template, path} = x.getTemplate(
          templatesPath + '/' + answers.fileName, params.split(',')
        )
  
        commander.dry && console.log(
          green.bold('\nxcaffold will create the following folders and files:\n\n')
        )
  
        x.getStructure(template, path).forEach(({type, path}) => {
          commander.dry ? 
            console.log(yellow(path)) :
            type == x.DIRECTORY_TYPE ? fs.mkdirSync(path) : fs.writeFileSync(path, '')
        })
      }).catch(err => console.log(err))
    } catch (e) {
      if (e instanceof x.TemplatesFolderMissingError) {
        console.error(red.bold('\nTemplates folder missing. Maybe you have a typo in the config file?'))
      } else if (e instanceof x.EmptyTemplatesListError) {
        console.error(red.bold('\nTemplates folder is empty!'))
      } else {
        console.error(red.bold(e))
      }
    }
  })
  .parse(process.argv)