import {
	AUTHENTICATED,
	HIDE_AUTH_MESSAGE,
	SHOW_AUTH_MESSAGE,
	SHOW_LOADING,
	SIGNIN,
	SIGNIN_WITH_FACEBOOK,
	SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
	SIGNOUT,
	SIGNOUT_SUCCESS,
	SIGNUP,
	SIGNUP_SUCCESS
} from '../constants/Auth';

export const signIn = (user) => {
	return {
		type: SIGNIN,
		payload: user
	};
};

export const authenticated = (token) => {
	return {
		type: AUTHENTICATED,
		token
	};
};

export const signOut = () => {
	return {
		type: SIGNOUT
	};
};

export const signOutSuccess = () => {
	return {
		type: SIGNOUT_SUCCESS,
	};
};

export const signUp = (user) => {
	return {
		type: SIGNUP,
		payload: user
	};
};

export const signUpSuccess = (token) => {
	return {
		type: SIGNUP_SUCCESS,
		token
	};
};

export const signInWithGoogle = () => {
	return {
		type: SIGNIN_WITH_GOOGLE
	};
};

export const signInWithGoogleAuthenticated = (token) => {
	return {
		type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
		token
	};
};

export const signInWithFacebook = () => {
	return {
		type: SIGNIN_WITH_FACEBOOK
	};
};

export const signInWithFacebookAuthenticated = (token) => {
	return {
		type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
		token
	};
};

export const showAuthMessage = (message) => {
	return {
		type: SHOW_AUTH_MESSAGE,
		message
	};
};

export const hideAuthMessage = () => {
	return {
		type: HIDE_AUTH_MESSAGE,
	};
};

export const showLoading = () => {
	return {
		type: SHOW_LOADING,
	};
};
