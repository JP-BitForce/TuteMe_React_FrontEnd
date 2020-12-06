import SignIn from '../screens/SignIn/SignIn'
import SignUp from '../screens/SignUp/SignUp'
import LandingPage from '../screens/LandingPage/LandingPage'

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
      }
    ]
}

export default routes;
