import SignIn from '../screens/SignIn/SignIn'
import SignUp from '../screens/SignUp/SignUp'
import LandingPage from '../screens/LandingPage/LandingPage'
import ForgotPassword from '../screens/ForwardPassword/ForgotPassword'
import GettingStarted from '../screens/GettingStarted/GettingStarted'
import PublicCourses from '../screens/LandingPage/PublicCourse'
import Staffs from '../screens/LandingPage/Staffs'
import Contact from '../screens/LandingPage/Contact'

const routes = {
    data: [
      {
        name: "SignIn",
        path: "/signIn",
        component: SignIn,
        type: "",
        children: [],
      },
      {
        name: "SignUp",
        path: "/signUp",
        component: SignUp,
        type: "",
        children: [],
      },
      {
        name: "Home",
        path: "/",
        component: LandingPage,
        type: "main",
        children: [],
      },
      {
        name: "ForgotPassword",
        path: "/forgotPassword",
        component: ForgotPassword,
        type: "",
        children: [],
      },
      {
        name: "Getting-Started",
        path: "/gettingStarted",
        component: GettingStarted,
        type: "",
        children: [],
      },
      {
        name: "Courses",
        path: "/PublicCourses",
        component: PublicCourses,
        type: "main",
        children: [],
      },
      {
        name: "Stafss",
        path: "/staffs",
        component: Staffs,
        type: "main",
        children: [],
      },
      {
        name: "Contact",
        path: "/contact",
        component: Contact,
        type: "main",
        children: [],
      },
    ],

    sidebarNav : [
      {
        caption : "GENERAL",
        navs: [
          {
            name: "HOME",
            id: "HOME",
            children: [],
            acceptUserRole : ["ROLE_STUDENT", "ROLE_TUTOR"]
          },
          {
            name: "ONE-STEP",
            id: "ONE_STEP",
            acceptUserRole: ["ROLE_STUDENT"],
            children: []
          }
        ]
      },//END OF GENERAL
      {
        caption: "PAGES",
        navs: [
          {
            name: "COURSES",
            id: "COURSES",
            acceptUserRole: ["ROLE_STUDENT"],
            children: [
              {
                name: "MY COURSES",
                id: "MY_COURSES",
              },
              {
                name: "ONLINE COURSES",
                id: "ONLINE_COURSES",
              },
            ],
          },
          {
            name: "TRUSTED TUTORS",
            id: "TRUSTED_TUTORS",
            children: [],
            acceptUserRole : ["ROLE_STUDENT"]
          },
          {
            name: "CREATE COURSE",
            id: "CREATE_COURSE",
            children: [],
            acceptUserRole : ["ROLE_TUTOR"]
          },
          {
            name: "LECTURE",
            id: "LECTURE",
            children: [],
            acceptUserRole : ["ROLE_TUTOR"]
          },
        ]
      },//END OF PAGES
      {
        caption: "MANAGEMENT",
        navs: [
          {
            name: "PROFILE",
            id: "MY_PROFILE",
            children: [],
            acceptUserRole : [ "ROLE_STUDENT"]
          },
          {
            name: "BLOG",
            id: "BLOG",
            children: [],
            acceptUserRole : ["ROLE_STUDENT", "ROLE_TUTOR"]
          },
          {
            name: "PAYMENTS",
            id: "PAYMENTS",
            children: [],
            acceptUserRole : ["ROLE_STUDENT", "ROLE_TUTOR"]
          },
          {
            name: "PROFILE",
            id: "TUTOR_PROFILE",
            children: [],
            acceptUserRole : ["ROLE_TUTOR"]
          }
        ]
      },//END OF MANAGEMENT
      {
        caption: "APP",
        navs: [
          {
            name: "CHAT",
            id: "MY_CHATS",
            children: [],
            acceptUserRole : ["ROLE_STUDENT"]
          },
          {
            name: "CALENDAR",
            id: "CALENDAR",
            children: [],
            acceptUserRole : ["ROLE_STUDENT", "ROLE_TUTOR"]
          },
        ]
      }
    ]
    
}

export default routes;
