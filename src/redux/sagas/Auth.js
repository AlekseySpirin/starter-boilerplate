import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNIN_WITH_FACEBOOK,
	SIGNIN_WITH_GOOGLE,
	SIGNOUT,
	SIGNUP
} from '../constants/Auth';
import {
	authenticated,
	showAuthMessage,
	signInWithFacebookAuthenticated,
	signInWithGoogleAuthenticated,
	signOutSuccess,
	signUpSuccess
} from "../actions/Auth";

import FirebaseService from 'services/FirebaseService';

export function* signInWithFBEmail() {
	yield takeEvery(SIGNIN, function* ({payload}) {
		const {
			email,
			password
		} = payload;
		try {
			const user = yield call(FirebaseService.signInEmailRequest, email, password);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(authenticated(user.user.uid));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* signOut() {
	yield takeEvery(SIGNOUT, function* () {
		try {
			const signOutUser = yield call(FirebaseService.signOutRequest);
			if (signOutUser === undefined) {
				localStorage.removeItem(AUTH_TOKEN);
				yield put(signOutSuccess(signOutUser));
			} else {
				yield put(showAuthMessage(signOutUser.message));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* signUpWithFBEmail() {
	yield takeEvery(SIGNUP, function* ({payload}) {
			const {
				email,
				password
			} = payload;
			try {
				const user = yield call(FirebaseService.signUpEmailRequest, email, password);
				if (user.message) {
					yield put(showAuthMessage(user.message));
				} else {
					localStorage.setItem(AUTH_TOKEN, user.user.uid);
					yield put(signUpSuccess(user.user.uid));
				}
			} catch (error) {
				yield put(showAuthMessage(error));
			}
		}
	);
}

export function* signInWithFBGoogle() {
	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithGoogleAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFacebook() {
	yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
		try {
			const user = yield call(FirebaseService.signInFacebookRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithFacebookAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(signInWithFBEmail),
		fork(signOut),
		fork(signUpWithFBEmail),
		fork(signInWithFBGoogle),
		fork(signInWithFacebook)
	]);
}
