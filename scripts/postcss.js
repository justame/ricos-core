let postcss = require('postcss')
let path = require('path');

postcss([]).process(css, { from, to }).then(result => {
  console.log(result.css)
})