import BankPage from './pages/bankPage.js'
import Home from './pages/homePage.js'
import LoanPage from './pages/loanPage.js'
import PositionPage from './pages/positionPage.js'
import MBTIPage from './pages/MBTIPage.js'
import MBTIStats from './pages/MBTIStats.js'
import NotFound from './pages/notFound.js'
import UserPage from './pages/userPage.js'

const routes = [
  { path: '*', name: '404', component: NotFound},
  { path: '/', name: 'Home', component: Home },
  { path: '/banks', name: 'Banks', component: BankPage },
  { path: '/loans', name: 'Loans', component: LoanPage },
  { path: '/mbti', name: 'MBTI', component: MBTIPage },
  { path: '/mbtistats', name: 'MBTIStats', component: MBTIStats},
  { path: '/positions', name: 'Positions', component: PositionPage },
  { path: '/users',
    name: 'Users', 
    components: { default: UserPage },
    props: {default: true}
  },
]

const router = new VueRouter({
  routes
})

var store = {
  state: {
    user: false,
    loading: false,
  },
  setMessageAction (newValue) {
    this.state.message = newValue
  },
  clearMessageAction () {
    this.state.message = ''
  }
}

const app = new Vue({
  router,
  el: '#app',
  components: {
    vuejsDatepicker
  },
  data: {
    loading: store.state.loading,
    users: '',
    userState: store.state.user,
  },
  watch: {
    '$route': 'determineRoute',
  },
  methods: {
    determineRoute() {
     switch (this.$route.name) {
      case "Home":
        break;
      case "Positions":
        this.userState = false;
        break;
      case "Loans":
        this.userState = false;
        break;
      case "Banks":
        this.fetchUsers();
        break;
      case "Users":
        this.fetchUsers();
        break;
      default:
        this.userState = false;
     }
     this.loading = false;
    },
    fetchUsers() {
      this.userState = true;
    },
  }
}).$mount('#app')