import {API_AUTHEN} from '../api/authen';
import {CONSTANTS} from '../utils/constant';
import {
    getAccessToken,
    getFirebaseToken,
    getLoginType,
    getUserInfo,
    removeAccessToken,
    removeLoginType,
    removeRefreshToken,
    removeSsVideo5,
    removeUserInfo,
    setAccessToken,
    setDeviceUsingWifi,
    setFirebaseToken,
    setLoginCsrfState,
    setLoginType,
    setRefreshToken,
    setSsVideo5,
    setUserInfo
} from '../utils/cookieAuthen';

const AUTHEN_ADD_USER_INFO = 'AUTHEN_ADD_USER_INFO';
const AUTHEN_REMOVE_USER_INFO = 'AUTHEN_REMOVE_USER_INFO';

// export const state = () => ({
//     currentUser: sessionStorage.getItem('authUser'),
// });

/*export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
}*/

const actions = {
    async apiRegister({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_AUTHEN.apiRegister}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiSendOTP({commit, state}, payload) {
        try {
            let {data} = await this.$axios.get(`${API_AUTHEN.apiSendOTP}`, {
                params: payload
            });

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiLogin({commit, state}, payload) {
        try {
            let uri_build = `${API_AUTHEN.apiLogin}`;
            if (getLoginType() === 'google') {
                uri_build = `${API_AUTHEN.apiGoogleLogin}`;
            } else if (getLoginType() === 'facebook') {
                uri_build = `${API_AUTHEN.apiFacebookLogin}`;
            } else if (getLoginType() === 'tiktok') {
                uri_build = `${API_AUTHEN.apiTiktokLogin}`;
            }

            if (payload === 'VIETTEL') {
                payload = {
                    username: '',
                    password: '',
                    loginType: 1
                };
            }

            let {data} = await this.$axios.post(uri_build, payload);

            if (data !== null) {
                setAccessToken(data.accessToken, data.expired);
                setRefreshToken(data.refreshToken);
                if (data.authorities.length > 0) {
                    setUserInfo({role: data.authorities[0].authority, userId: data.userId, username: data.username, studentId: data.studentId, teacherId: data.teacherId, session: data.sessionId});
                }
                setSsVideo5(0);

                if (payload === 'VIETTEL') {
                    setDeviceUsingWifi(1);
                } else {
                    setDeviceUsingWifi(0);
                }

                commit(AUTHEN_ADD_USER_INFO, data.userInfo);
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiLogout({commit}) {
        try {
            // await this.$axios.post(`${API_AUTHEN.apiLogout}`);
        } catch (error) {
            console.log(error);
        }

        removeAccessToken();
        removeRefreshToken();
        removeUserInfo();
        removeSsVideo5();
        removeLoginType();

        commit(AUTHEN_REMOVE_USER_INFO);

        return 'OK';
    },
    async apiForgotPassword({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_AUTHEN.apiForgotPassword}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiFirebaseInsertToken({commit, state}, payload) {
        try {
            if (!getFirebaseToken()) {
                console.info('apiFirebaseInsertToken: ', payload);

                let payloadFinal = {
                    phone: '',
                    token: payload
                };
                let {data} = await this.$axios.post(`${API_AUTHEN.apiFirebaseInsertToken}`, payloadFinal);

                if (data.code === CONSTANTS.SUCCESS) {
                    setFirebaseToken(1);
                }
            }
        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    }
};
// export const getters = {
//     // Whether the user is currently logged in.
//     loggedIn(state) {
//         return !!state.currentUser
//     },
// }

/*export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().loginUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return Promise.resolve(user)
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-unused-vars
            getFirebaseBackend().logout().then((response) => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    },

    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    // register the user
    // eslint-disable-next-line no-unused-vars
    resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().forgetPassword(email).then((response) => {
            const message = response.data
            return message
        });
    },

    // Validates the current user'manage-project.vue token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        const user = getFirebaseBackend().getAuthenticatedUser();
        commit('SET_CURRENT_USER', user)
        return user;
    },
}*/

// ===
// Private helpers
// ===

function saveState(key, state) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(state))
    }
}


const state = () => ({
    userInfo: {}
});
const getters = {
    userInfo: state => {
        let objUserInfo = {};
        if (Object.keys(state.userInfo).length > 0) {
            objUserInfo = state.userInfo;
        } else {
            const accessToken = getAccessToken();
            if (accessToken) {
                if (getUserInfo()) {
                    objUserInfo = JSON.parse(getUserInfo());
                }
            }
        }

        return objUserInfo;
    }
};
const mutations = {
    [AUTHEN_ADD_USER_INFO](state, payload) {
        state.userInfo = payload;
    },
    [AUTHEN_REMOVE_USER_INFO](state) {
        state.userInfo = {};
    },
    UPDATE_USER_INFO_LOGIN(state, payload) {
        state.userInfo[payload.key] = payload.value;
        setUserInfo(state.userInfo);
    },
    ACTION_LOGIN_TYPE(state, payload) {
        setLoginType(payload);
    },
    ACTION_LOGIN_CSRF_STATE(state, payload) {
        setLoginCsrfState(payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
