// import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { LOAD_ORDER } from 'containers/App/constants';
// import { orderLoaded, orderLoadingError } from 'containers/OrderPage/actions';

// //import request from 'utils/request';
// //import { makeSelectChmtoken } from 'containers/HomePage/selectors';

// export function* getOrder() {
//   const chmtoken = yield select(makeSelectChmtoken());
//   const businessName = yield select(makeselectBusinessname());
//   const requestURL = `http://192.168.1.105:3000/${businessName}/order/${chmtoken}`;

//   try {
//     const orders = yield call(request, requestURL);
//     yield put(orderLoaded(orders, chmtoken));
//   } catch (err) {
//     yield put(orderLoadingError(err));
//   }
// }

// export default function* orderPageSaga() {
//   yield takeLatest(LOAD_ORDER, getOrder);
// }