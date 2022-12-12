import { createStore } from 'redux';
import appReducer from './reducers/reducer';
const store = createStore(appReducer);
export default store;