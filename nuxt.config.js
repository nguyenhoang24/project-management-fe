export default {
    loading: "~/components/Loading.vue",
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    ssr: false,
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: "server",
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {
                hid: "description",
                name: "description",
                content: "Responsive Bootstrap 5 Admin Dashboard"
            }
        ],
        link: [{rel: "icon", type: "image/x-icon", href: "favicon.ico"}]
    },
    router: {
        // linkExactActiveClass: 'active'
        base: '/'
        // routeNameSplitter: '/',
        // linkExactActiveClass: 'active'
    },
    /*
     ** Global CSS
     */
    css: ["~/assets/scss/app.scss"],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/fakeauth.js',
        "~/plugins/fireauth.js",
        '~/plugins/i18n.js',
        "~/plugins/simplebar.js",
        "~/plugins/vue-click-outside.js",
        "~/plugins/vue-apexcharts.js",
        "~/plugins/vuelidate.js",
        "~/plugins/vue-slidebar.js",
        "~/plugins/vue-lightbox.js",
        "~/plugins/vue-chartist.js",
        "~/plugins/vue-mask.js",
        "~/plugins/vue-googlemap.js",
        "~/plugins/axios.js",
        "~/plugins/vue-drawflow.js",
        "~/plugins/excelExport.js",
        "~/plugins/globalFunctionCommon.js",
        "~/plugins/vue-notification.js",
        "~/plugins/vue-tree.js",
        '~/plugins/websocket.js',
        '~/plugins/vue-chat-scroll.js'
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/moment',
        ['@nuxtjs/dotenv', {filename: `.env${process.env.NODE_ENV === 'production' ? '.' + process.env.NODE_ENV : ''}`}]
    ],

    moment: {
        defaultLocale: 'vi',
        locales: ['vi']
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        // Doc: https://bootstrap-vue.js.org
        "bootstrap-vue/nuxt",
        // Doc: https://github.com/nuxt/content
        "@nuxt/content",
    ],
    // axios: {
    //     baseURL: process.env.VUE_APP_API_BASE
    // },
    /*
     ** Content module configuration
     ** See https://content.nuxtjs.org/configuration
     */
    content: {},
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        transpile: ['drawflow', '@stomp/stompjs']
        // publicPath:'ads'
    },
    server: {
        // host: '192.168.10.62' // default: localhost
    },
    // env: {
    //     auth: process.env.VUE_APP_DEFAULT_AUTH,
    //     api_base_url: process.env.VUE_APP_API_BASE,
    //     apikey: process.env.VUE_APP_APIKEY,
    //     authdomain: process.env.VUE_APP_AUTHDOMAIN,
    //     databaseurl: process.env.VUE_APP_DATABASEURL,
    //     projectid: process.env.VUE_APP_PROJECTId,
    //     storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    //     message: process.env.VUE_APP_MESSAGINGSENDERID,
    //     appid: process.env.VUE_APP_APPId,
    //     measurement: process.env.VUE_APP_MEASUREMENTID
    // }
    loadingIndicator: false
};

/*
 ** yarn install
 ** yarn upgrade remark-footnotes@^2.0.0
 ** npx browserslist@latest --update-db
*/
