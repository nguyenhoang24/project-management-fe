// import { API_ASSIGNMENT_MANAGE} from "@/api/teacher";
import {CONSTANTS} from '../../utils/constant';
import {API_ASSIGNMENT_MANAGE} from "../../api/assign/assignment";

const actions = {

    async apiAddAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiAddAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiImportAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiImportAssignment}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiGetAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiGetStudent}` + `/${payload.sessionId}` + `/${payload.teacherId}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetAssignmentClass({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiGetAssignmentClass}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiChangeAssignmentStatus({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiChangeAssignmentStatus}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiEditAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiDeleteAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiSearchAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiSearchAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiCheckActiveAssignment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiCheckActiveAssignment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckAssignmentUpdate({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiCheckAssignmentUpdate}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetBySession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ASSIGNMENT_MANAGE.apiGetBySession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
};

const state = () => ({});
const getters = {};
const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

