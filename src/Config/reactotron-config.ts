import ReactotronLib from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

declare global {
  interface Console {
    tron: any;
  }
}
if (process.env.NODE_ENV === 'development') {
  const tron = ReactotronLib.configure()
    .use(reactotronRedux())
    .use(sagaPlugin({}))
    .connect();

  if (tron.clear) tron.clear();

  console.tron = tron;
}
