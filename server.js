const path = require('path');
const { readdir } = require('fs/promises');
const express = require('express');
const app = express();

readdir(path.resolve(__dirname, 'pages'))
  .then(createRoutes)
  .catch(console.error);

// TODO: this handles only GET requests, how to handle POST? PATCH? PUT? DELETE?
// TODO: handle error when page is not found
function createRoutes(pages) {
  pages.forEach((page) => {
    const pageImport = getPage(page);

    const path = `/${page}`;
    const component = pageImport;
    const getProps = pageImport.getProps;

    app.get(path, async (req, res) => {
      const props = await getProps();
      res.send(component(props));
    })
  });
}

// TODO: handle error when nothing is exported from page -> should it be be
// handled as error?
function getPage(page) {
  return require(path.resolve(__dirname, 'pages', page));
}

app.listen(3000, 'localhost', function (error) {
  if (error) {
    // TODO: Add logger
    console.error('Server startup error', error);
  }
  console.log('Server is listening on http://localhost:3000');
});
