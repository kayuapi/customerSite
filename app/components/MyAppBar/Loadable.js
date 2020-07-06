/**
 *
 * Asynchronously loads the component for MyAppBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
