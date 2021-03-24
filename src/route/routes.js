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
    ]
}

export default routes;
