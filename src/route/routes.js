import SignIn from '../screens/SignIn/SignIn'
import SignUp from '../screens/SignUp/SignUp'
import LandingPage from '../screens/LandingPage/LandingPage'
import ForgotPassword from '../screens/ForwardPassword/ForgotPassword'
import GettingStarted from '../screens/GettingStarted/GettingStarted'
import InterestCard from '../components/Card/MyInterestCard/EditInterestForm/EditInterestCard'

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
        name: "Interest-Card",
        path: "/interestCard",
        component: InterestCard,
        type: "",
        children: [],
      }
    ],

    sidebarNav : [
      {
        caption : "GENERAL",
        navs: [
          {
            name: "HOME",
            id: "HOME",
            children: [],
            acceptUserRole : "USER_STUDENT"
          },
          {
            name: "ONE-STEP",
            id: "ONE_STEP",
            acceptUserRole: "USER_STUDENT",
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
            name: "TRUSTED-TUTORS",
            id: "TRUSTED_TUTORS",
            children: [],
            acceptUserRole : "USER_STUDENT"
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
            acceptUserRole : "USER_STUDENT"
          },
          {
            name: "BLOG",
            id: "BLOG",
            children: [],
            acceptUserRole : "USER_STUDENT"
          },
          {
            name: "PAYMENTS",
            id: "PAYMENTS",
            children: [],
            acceptUserRole : "USER_STUDENT"
          },
        ]
      },//END OF MANAGEMENT
      {
        caption: "APP",
        navs: [
          {
            name: "CHAT",
            id: "MY_CHATS",
            children: [],
            acceptUserRole : "USER_STUDENT"
          },
          {
            name: "CALENDAR",
            id: "CALENDAR",
            children: [],
            acceptUserRole : "USER_STUDENT"
          },
        ]
      }
    ]
    
}

export default routes;
