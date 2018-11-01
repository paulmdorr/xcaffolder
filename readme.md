# xcaffolder

**_xcaffolder_** is a simple tool to create quick scaffolds that may include folders structure and files. The idea is allowing the user to define folders and files in a JavaScript template generator, without having to depend on more complex tools like Yeoman or similar generators.

## Installation

```bash
npm i -g xcaffolder
```

## The config file

In order to work properly, **_xcaffolder_** needs a really simple JSON config file called `.xcaffoldrc`. For now, it consists of just one key, pointing to the dir where the user stores the template generators.

## The template generator

This is just a JS module that exports two things:
  1) A function called generateTemplate, which receives params (sent by xcaffolder) and returns an object or an array containing the folder structure or files list, respectively.
  2) A const indicating the path in which these files and folders should be created.

A basic example, without any params:

```javascript
module.exports = {
  generateTemplate: () => {
    return [
      'schema.gql',
      'resolver.js'
    ]
  },
  path: 'example/path/',
}
```

A more complex example, with a base dir, which name is set through params:

```javascript
module.exports = {
  generateTemplate: (params) => {
    return {
      [params[0]]: [
        'schema.gql',
        'resolver.js'
      ]
    }
  },
  path: 'example/path/',
}
```

As you would expect, you may process the generator params any way you need, since it's just a JavaScript function, as long a you return an array or object that can be understood by **_xcaffolder_**.

## The arguments

For the time being, the only way of sending arguments to the template generator is from the command line, as a comma-separated list, so you can basically can just send strings and numbers. I made it like this because the idea is to send just a few arguments, like the base dir or maybe a couple filenames. If in future versions I see the need to send more arguments, I will have to rethink this.

You can send arguments like this:

```bash
xcaffolder baseDir,anotherDir,aFilename
```

## Running xcaffolder

Running xcaffolder is quite straightforward. All you need is the `.xcaffoldrc` config file, a folder with at least one template generator and you're ready to go!

You should run it from the folder containing the config file, otherwise **_xcaffolder_** wouldn't be able to find the templates generators folder.

Besides the arguments list that is passed to the generator, you may also add the "-d" option, which will make **_xcaffolder_** run in "dry mode", printing the structure that will be generated without actually creating it.

## Collaborating
------

Don't hesitate to contact me at [paulmdorr.me/contact](http://paulmdorr.me/contact) if you have suggestions or questions. Also, feel free to create a _new issue_ or make a _pull request_!