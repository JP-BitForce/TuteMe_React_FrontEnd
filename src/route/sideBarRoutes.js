const routes = [
    {
        name: "HOME",
        id: "HOME",
        children: [],
        acceptUserRole : "USER_STUDENT"
    },
    {
        name: "COURSES",
        id: "COURSES",
        acceptUserRole: "USER_STUDENT",
        children: [
          {
            name: "MY COURSES",
            id: "MY_COURSES",
          },
          {
            name: "ONLINE-COURSES",
            id: "ONLINE_COURSES",
          },
        ],
    },
    {
        name: "ONE-STEP",
        id: "ONE_STEP",
        acceptUserRole: "USER_STUDENT",
        children: [
          {
            name: "VIEW QAs",
            id: "VIEW_QAs",
          },
          {
            name: "NEW",
            id: "NEW",
          },
        ],
    },
    {
        name: "TRUSTED-TUTORS",
        id: "TRUSTED_TUTORS",
        children: [],
        acceptUserRole : "USER_STUDENT"
    },
    {
        name: "MY CHATS",
        id: "MY_CHATS",
        children: [],
        acceptUserRole : "USER_STUDENT"
    },
    {
        name: "MY PROFILE",
        id: "MY_PROFILE",
        children: [],
        acceptUserRole : "USER_STUDENT"
    },
]


export default routes;