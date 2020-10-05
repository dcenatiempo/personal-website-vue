import Vue from 'vue';
/*******************************************************************************
 * I can't get automatic base component registration to work in jest,
 *   because it relies on webpack
 *   so we have to manually export/import all base components through
 *   <rootDir>/src/components/base/index.js
 * *****************************************************************************

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context(
  // The relative path of the components folder
  '~/components/base',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});
*******************************************************************************/

import * as BaseComponents from '../../components/base';

Object.keys(BaseComponents).forEach(key => {
  const componentName = key;
  const componentConfig = BaseComponents[key];

  Vue.component(componentName, componentConfig.default || componentConfig);
});
