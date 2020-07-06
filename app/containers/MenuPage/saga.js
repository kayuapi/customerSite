// import { takeLatest, call, put, select, all } from 'redux-saga/effects';
// import { LOAD_MENU, SUBMIT_ORDER } from 'containers/App/constants';
// import {
//   menuLoaded,
//   menuLoadingError,
//   orderSubmitted,
//   orderSubmittingError,
// } from 'containers/MenuPage/actions';

// //import request from 'utils/request';
// //import { makeSelectChdmtoken } from 'containers/HomePage/selectors';

// export function* submitOrder() {
//   const chmtoken = yield select(makeSelectChmtoken());
//   const businessName = yield select(makeselectBusinessname());
//   const requestURL = `http://192.168.1.105:80/${businessName}/order/${chmtoken}`;

//   try {
//     const orders = yield call(request, requestURL);
//     yield put(orderSubmitted(orders));
//   } catch (err) {
//     yield put(orderSubmittingError(err));
//   }
// }

// export function* getMenu() {
//   const chmtoken = yield select(makeSelectChmtoken());
//   const businessName = yield select(makeselectBusinessname());
//   const requestURL = `http://192.168.1.105:80/${businessName}/menu`;

//   try {
//     const menu = yield call(request, requestURL);
//     yield put(menuLoaded(menu));
//   } catch (err) {
//     yield put(menuSubmittingError(err));
//   }
// }

// export default function* menuPageSaga() {
//   yield all([
//     takeLatest(LOAD_MENU, getMenu),
//     takeLatest(SUBMIT_ORDER, submitOrder),
//   ]);
// }
