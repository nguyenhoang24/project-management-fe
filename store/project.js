import {CONSTANTS} from '@/utils/constant';
import {API_PROJECT} from "@/api/project";

const actions = {


    async apiGetProject({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiGetProject}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetProjectFilter({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiGetProjectFilter}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditProject({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiEditProject}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetProjectDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiGetProjectDetail}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetDetailById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiGetDetailById}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteReportFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiDeleteReportFile}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteOutlineFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiDeleteOutlineFile}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddOutlineFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiAddOutlineFile}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddProject({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiAddProject}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetTeacherById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiGetTeacherById}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddProjectDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiAddProjectDetail}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditProjectDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiEditProjectDetail}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteProjectDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiDeleteProjectDetail}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteFileDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiDeleteFileDetail}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddReportFileDetail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiAddReportFileDetail}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteProject({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_PROJECT.apiDeleteProject}`+`/${payload}`);

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

