const fs = require('fs');

const NAME = process.argv[2]; // component's NAME

function generateReactComponent() {
  const entry =
`import ${NAME} from './${NAME}';

export default ${NAME};
`;

  const jsx =
`import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import less from './${NAME}.less';

export default class ${NAME} extends Component {
  // constructor(props) {
  // super(props);
  // this.state = {};
  // }

  render() {
    return (
      <div className={less.${NAME}}>

      </div>
    );
  }
}
`;

  const less = `.${NAME} {}`;

  if (fs.existsSync(`dev/components/${NAME}`)) {
    console.log(`========== ${NAME} folder exist ==========`);
  } else {
    fs.mkdirSync(`dev/components/${NAME}`);
    fs.writeFileSync(`dev/components/${NAME}/index.js`, entry);
    fs.writeFileSync(`dev/components/${NAME}/${NAME}.jsx`, jsx);
    fs.writeFileSync(`dev/components/${NAME}/${NAME}.less`, less);
  }
}

if (fs.existsSync('dev/components')) {
  console.log('========== components folder exist ==========');
} else {
  fs.mkdirSync('dev/components');
}

generateReactComponent();
