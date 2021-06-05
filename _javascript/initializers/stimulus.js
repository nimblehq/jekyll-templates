import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

// Register all Stimulus controllers using Webpack's require.context
const application = Application.start();
const context = require.context('../controllers', true, /\.js$/);

application.load(definitionsFromContext(context));
