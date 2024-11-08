export const menuItems = [
    {
        id: 1,
        label: "Dashboard",
        icon: "uil-home-alt",
        link: "/",
        role: "ROLE_ADMIN"
    },
    {
        id: 19,
        label: "Danh mục quản lý",
        icon: "uil-list-ul",
        role: "ROLE_ADMIN",
        subItems: [
            {
                id: 2,
                label: "Danh sách giảng viên",
                link: "/admin/teacher",
                role: "ROLE_ADMIN",
                parentId: 19
            },
            {
                id: 3,
                label: "Danh sách sinh viên",
                link: "/admin/student",
                role: "ROLE_ADMIN",
                parentId: 19
            },
            {
                id: 21,
                label: "Danh sách đồ án",
                link: "/admin/project",
                role: "ROLE_ADMIN",
                parentId: 19
            },
            {
                id: 22,
                label: "Danh sách chủ đề",
                link: "/admin/topic",
                role: "ROLE_ADMIN",
                parentId: 19
            },
        ]
    },
    /*{
        id: 2,
        label: "Danh sách giáo viên",
        icon: "uil-list-ul",
        link: "/admin/teacher",
        role: "ROLE_ADMIN"
    },
    {
        id: 3,
        label: "Danh sách sinh viên",
        icon: "uil-list-ul",
        link: "/admin/student",
        role: "ROLE_ADMIN"
    },*/
    {
        id: 4,
        icon: "uil-browser",
        label: "Phân công hướng dẫn",
        link: "/assign/session",
        role: "ROLE_ADMIN"
    },
    {
        id: 5,
        label: "Lịch",
        icon: "uil-calendar-alt",
        link: "/calendar",
        role: "ROLE_TEACHER"
    },
    {
        id: 6,
        label: "Danh sách sinh viên",
        icon: "uil-list-ul",
        link: "/teacher/manage-student",
        role: "ROLE_TEACHER"
    },
    {
        id: 7,
        label: "Danh sách đồ án",
        icon: "uil-list-ul",
        link: "/teacher/project-manage",
        role: "ROLE_TEACHER"
    },
    {
        id: 8,
        label: "Lịch",
        icon: "uil-calendar-alt",
        link: "/calendar",
        role: "ROLE_STUDENT"
    },
    {
        id: 9,
        label: "Danh sách đồ án",
        icon: "uil-list-ul",
        link: "/student/project-manage",
        role: "ROLE_STUDENT"
    },
    {
        id: 12,
        label: "Cuộc trò chuyện",
        icon: "uil-comments",
        link: "/chat",
        role: "ROLE_ADMIN"
    },
    {
        id: 10,
        label: "Cài đặt chung",
        icon: "uil-setting",
        role: "ROLE_ADMIN",
        subItems: [
            {
                id: 11,
                label: "Danh sách người dùng",
                link: "/user/groupuser",
                role: "ROLE_ADMIN",
                parentId: 10
            },
            {
                id: 12,
                label: "Danh sách quyền",
                link: "/user/permission",
                role: "ROLE_ADMIN",
                parentId: 10
            },
        ]
    },
    {
        id: 17,
        label: "Cuộc trò chuyện",
        icon: "uil-comments",
        link: "/chat",
        role: "ROLE_TEACHER"
    },
    {
        id: 13,
        label: "Cài đặt chung",
        icon: "uil-setting",
        role: "ROLE_TEACHER",
        subItems: [
            {
                id: 14,
                label: "Thông tin cá nhân",
                link: "/profile",
                role: "ROLE_ADMIN",
                parentId: 13
            },
            {
                id: 15,
                label: "Đổi mật khẩu",
                link: "/user/change-password",
                role: "ROLE_ADMIN",
                parentId: 13
            },
        ]
    },
    {
        id: 17,
        label: "Cuộc trò chuyện",
        icon: "uil-comments",
        link: "/chat",
        role: "ROLE_STUDENT"
    },
    {
        id: 16,
        label: "Cài đặt chung",
        icon: "uil-setting",
        role: "ROLE_STUDENT",
        subItems: [
            {
                id: 17,
                label: "Thông tin cá nhân",
                link: "/profile",
                role: "ROLE_ADMIN",
                parentId: 16
            },
            {
                id: 18,
                label: "Đổi mật khẩu",
                link: "/user/change-password",
                role: "ROLE_ADMIN",
                parentId: 16
            },
        ]
    },


    // {
    //     id: 13,
    //     label: "Quản lý người dùng",
    //     icon: "uil-user-circle",
    //     subItems: [
    //         {
    //             id: 14,
    //             label: "Danh sách nhóm quyền",
    //             link: "/user/permission",
    //             parentId: 13
    //         },
    //         {
    //             id: 22,
    //             label: "Danh sách nhóm người dùng",
    //             link: "/user/groupuser",
    //             parentId: 13
    //         },
    //         {
    //             id: 15,
    //             label: "Danh sách tài khoản",
    //             link: "/user/management",
    //             parentId: 13
    //         },
    //         {
    //             id: 16,
    //             label: "Lịch sử người dùng",
    //             link: "/user/history",
    //             parentId: 13
    //         }
    //     ]
    // },

    // {
    //   id: 25,
    //   label: "menuitems.pages.text",
    //   isTitle: true
    // },
    // {
    //   id: 26,
    //   label: "menuitems.authentication.text",
    //   icon: "uil-user-circle",
    //   subItems: [
    //     {
    //       id: 27,
    //       label: "menuitems.authentication.list.login",
    //       link: "/auth/login-1",
    //       parentId: 26
    //     },
    //     {
    //       id: 28,
    //       label: "menuitems.authentication.list.register",
    //       link: "/auth/register-1",
    //       parentId: 26
    //     },
    //     {
    //       id: 29,
    //       label: "menuitems.authentication.list.recoverpwd",
    //       link: "/auth/recoverpwd",
    //       parentId: 26
    //     },
    //     {
    //       id: 30,
    //       label: "menuitems.authentication.list.lockscreen",
    //       link: "/auth/lock-screen",
    //       parentId: 26
    //     }
    //   ]
    // },
    // {
    //   id: 31,
    //   label: "menuitems.utility.text",
    //   icon: "uil-file-alt",
    //   subItems: [
    //     {
    //       id: 32,
    //       label: "menuitems.utility.list.starter",
    //       link: "/utility/starter",
    //       parentId: 31
    //     },
    //     {
    //       id: 33,
    //       label: "menuitems.utility.list.maintenance",
    //       link: "/utility/maintenance",
    //       parentId: 31
    //     },
    //     {
    //       id: 35,
    //       label: "menuitems.utility.list.comingsoon",
    //       link: "/utility/comingsoon",
    //       parentId: 31
    //     },
    //     {
    //       id: 36,
    //       label: "menuitems.utility.list.timeline",
    //       link: "/utility/timeline",
    //       parentId: 31
    //     },
    //     {
    //       id: 37,
    //       label: "menuitems.utility.list.faqs",
    //       link: "/utility/faqs",
    //       parentId: 31
    //     },
    //     {
    //       id: 38,
    //       label: "menuitems.utility.list.pricing",
    //       link: "/utility/pricing",
    //       parentId: 31
    //     },
    //     {
    //       id: 39,
    //       label: "menuitems.utility.list.error404",
    //       link: "/utility/404",
    //       parentId: 31
    //     },
    //     {
    //       id: 40,
    //       label: "menuitems.utility.list.error500",
    //       link: "/utility/500",
    //       parentId: 31
    //     }
    //   ]
    // }
    // {
    //   id: 41,
    //   label: "menuitems.components.text",
    //   isTitle: true
    // },
    // {
    //   id: 42,
    //   label: "menuitems.uielements.text",
    //   icon: "uil-flask",
    //   subItems: [
    //     {
    //       id: 43,
    //       label: "menuitems.uielements.list.alerts",
    //       link: "/ui/alerts",
    //       parentId: 42
    //     },
    //     {
    //       id: 44,
    //       label: "menuitems.uielements.list.buttons",
    //       link: "/ui/buttons",
    //       parentId: 42
    //     },
    //     {
    //       id: 45,
    //       label: "menuitems.uielements.list.cards",
    //       link: "/ui/cards",
    //       parentId: 42
    //     },
    //     {
    //       id: 46,
    //       label: "menuitems.uielements.list.carousel",
    //       link: "/ui/carousel",
    //       parentId: 42
    //     },
    //     {
    //       id: 47,
    //       label: "menuitems.uielements.list.dropdowns",
    //       link: "/ui/dropdown",
    //       parentId: 42
    //     },
    //     {
    //       id: 48,
    //       label: "menuitems.uielements.list.grid",
    //       link: "/ui/grid",
    //       parentId: 42
    //     },
    //     {
    //       id: 49,
    //       label: "menuitems.uielements.list.images",
    //       link: "/ui/images",
    //       parentId: 42
    //     },
    //     {
    //       id: 50,
    //       label: "menuitems.uielements.list.lightbox",
    //       link: "/ui/lightbox",
    //       parentId: 42
    //     },
    //     {
    //       id: 51,
    //       label: "menuitems.uielements.list.modals",
    //       link: "/ui/modals",
    //       parentId: 42
    //     },
    //     {
    //       id: 52,
    //       label: "menuitems.uielements.list.rangeslider",
    //       link: "/ui/rangeslider",
    //       parentId: 42
    //     },
    //     {
    //       id: 53,
    //       label: "menuitems.uielements.list.progressbar",
    //       link: "/ui/progressbar",
    //       parentId: 42
    //     },
    //     {
    //       id: 53,
    //       label: "menuitems.uielements.list.placeholder",
    //       link: "/ui/placeholder",
    //       parentId: 42
    //     },
    //     {
    //       id: 54,
    //       label: "menuitems.uielements.list.sweetalert",
    //       link: "/ui/sweet-alert",
    //       parentId: 42
    //     },
    //     {
    //       id: 55,
    //       label: "menuitems.uielements.list.tabs",
    //       link: "/ui/tabs-accordions",
    //       parentId: 42
    //     },
    //     {
    //       id: 56,
    //       label: "menuitems.uielements.list.typography",
    //       link: "/ui/typography",
    //       parentId: 42
    //     },
    //     {
    //       id: 57,
    //       label: "menuitems.uielements.list.video",
    //       link: "/ui/video",
    //       parentId: 42
    //     },
    //     {
    //       id: 58,
    //       label: "menuitems.uielements.list.general",
    //       link: "/ui/general",
    //       parentId: 42
    //     },
    //     {
    //       id: 59,
    //       label: "menuitems.uielements.list.colors",
    //       link: "/ui/colors",
    //       parentId: 42
    //     },
    //     {
    //       id: 60,
    //       label: "menuitems.uielements.list.rating",
    //       link: "/ui/rating",
    //       parentId: 42
    //     }
    //   ]
    // },
    // {
    //   id: 62,
    //   label: "menuitems.forms.text",
    //   icon: "uil-shutter-alt",
    //   badge: {
    //     variant: "danger",
    //     text: 'menuitems.forms.badge'
    //   },
    //   subItems: [
    //     {
    //       id: 63,
    //       label: "menuitems.forms.list.elements",
    //       link: "/form/elements",
    //       parentId: 62
    //     },
    //     {
    //       id: 64,
    //       label: "menuitems.forms.list.validation",
    //       link: "/form/validation",
    //       parentId: 62
    //     },
    //     {
    //       id: 65,
    //       label: "menuitems.forms.list.advanced",
    //       link: "/form/advanced",
    //       parentId: 62
    //     },
    //     {
    //       id: 66,
    //       label: "menuitems.forms.list.editor",
    //       link: "/form/editor",
    //       parentId: 62
    //     },
    //     {
    //       id: 67,
    //       label: "menuitems.forms.list.fileupload",
    //       link: "/form/upload",
    //       parentId: 62
    //     },
    //     {
    //       id: 68,
    //       label: "menuitems.forms.list.repeater",
    //       link: "/form/repeater",
    //       parentId: 62
    //     },
    //     {
    //       id: 69,
    //       label: "menuitems.forms.list.wizard",
    //       link: "/form/wizard",
    //       parentId: 62
    //     },
    //     {
    //       id: 70,
    //       label: "menuitems.forms.list.mask",
    //       link: "/form/mask",
    //       parentId: 62
    //     }
    //   ]
    // },
    // {
    //   id: 74,
    //   icon: "uil-chart",
    //   label: "menuitems.charts.text",
    //   subItems: [
    //     {
    //       id: 75,
    //       label: "menuitems.charts.list.apex",
    //       link: "/charts/apex",
    //       parentId: 74
    //     },
    //     {
    //       id: 76,
    //       label: "menuitems.charts.list.chartjs",
    //       link: "/charts/chartjs",
    //       parentId: 74
    //     },
    //     {
    //       id: 77,
    //       label: "menuitems.charts.list.chartist",
    //       link: "/charts/chartist",
    //       parentId: 74
    //     },
    //     {
    //       id: 78,
    //       label: "menuitems.charts.list.echart",
    //       link: "/charts/echart",
    //       parentId: 74
    //     }
    //   ]
    // },
    // {
    //   id: 79,
    //   label: "menuitems.icons.text",
    //   icon: "uil-streering",
    //   subItems: [
    //     {
    //       id: 80,
    //       label: "menuitems.icons.list.unicons",
    //       link: "/icons/unicons",
    //       parentId: 79
    //     },
    //     {
    //       id: 81,
    //       label: "menuitems.icons.list.boxicons",
    //       link: "/icons/boxicons",
    //       parentId: 79
    //     },
    //     {
    //       id: 82,
    //       label: "menuitems.icons.list.materialdesign",
    //       link: "/icons/materialdesign",
    //       parentId: 79
    //     },
    //     {
    //       id: 83,
    //       label: "menuitems.icons.list.dripicons",
    //       link: "/icons/dripicons",
    //       parentId: 79
    //     },
    //     {
    //       id: 84,
    //       label: "menuitems.icons.list.fontawesome",
    //       link: "/icons/fontawesome",
    //       parentId: 79
    //     }
    //   ]
    // },
    // {
    //   id: 85,
    //   label: "menuitems.maps.text",
    //   icon: "uil-location-point",
    //   subItems: [
    //     {
    //       id: 86,
    //       label: "menuitems.maps.list.googlemap",
    //       link: "/maps/google",
    //       parentId: 85
    //     },
    //     {
    //       id: 87,
    //       label: "menuitems.maps.list.leafletmap",
    //       link: "/maps/leaflet",
    //       parentId: 85
    //     },
    //   ]
    // },
    // {
    //   id: 88,
    //   label: "menuitems.multilevel.text",
    //   icon: "uil-share-alt",
    //   subItems: [
    //     {
    //       id: 89,
    //       label: "menuitems.multilevel.list.level1.1",
    //       link: "javascript: void(0);",
    //       parentId: 88
    //     },
    //     {
    //       id: 90,
    //       label: "menuitems.multilevel.list.level1.2",
    //       parentId: 88,
    //       subItems: [
    //         {
    //           id: 91,
    //           label: "menuitems.multilevel.list.level1.level2.1",
    //           link: "javascript: void(0);",
    //           parentId: 88
    //         },
    //         {
    //           id: 92,
    //           label: "menuitems.multilevel.list.level1.level2.2",
    //           link: "/level2.2",
    //           parentId: 88
    //         }
    //       ]
    //     }
    //   ]
    // }
];

