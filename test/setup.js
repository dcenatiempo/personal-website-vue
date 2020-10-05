import { createLocalVue } from '@vue/test-utils';

import BaseComponents from '../src/plugins/BaseComponents';
import Viewport from '../src/plugins/Viewport';

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BaseComponents);
localVue.use(Viewport);
