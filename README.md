# Medium to markdown
[![npm](https://img.shields.io/npm/v/medium-to-markdown.svg)](https://npmjs.com/package/medium-to-markdown) [![npm](https://img.shields.io/npm/l/medium-to-markdown.svg)]()

This module lets you take a medium post and convert it to markdown.

### Command Line Usage

**Setup:**

1. Install npm if not already installed
2. Clone the repo
3. run `npm install` inside the repo

**Outputting to command line:**

`npm run convert https://medium.com/@almenon214/keeping-yourself-motivated-as-a-coder-a16a6fcf49c7`

Replace the link with the article you want to convert.

**Outputting to file:**

`npm run convert https://medium.com/@almenon214/keeping-yourself-motivated-as-a-coder-a16a6fcf49c7 > exampleOutput.md`

Replace the link with the article you want to convert.

### What does the output look like?

See `examples/exampleOutput.md` for an example of what https://medium.com/@almenon214/keeping-yourself-motivated-as-a-coder-a16a6fcf49c7 looks like when converted to markdown.

### API Usage

Currently, the module supports getting the markdown from a medium post by URL.

```javascript
const mediumToMarkdown = require('medium-to-markdown');

mediumToMarkdown.convertFromUrl('<medium post url>')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});
```
