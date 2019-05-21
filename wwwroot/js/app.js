import Home from './pages/homePage.js'
import UserPage from './pages/userPage.js'
import NotFound from './pages/notFound.js'
import PositionPage from './pages/positionPage.js'
import BankPage from './pages/bankPage.js'
import LoanPage from './pages/loanPage.js'
import MBTIPage from './pages/MBTIPage.js'


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Positions', name: 'Positions', component: PositionPage },
  { path: '/loans', name: 'Loans', component: LoanPage },
  { path: '/banks', name: 'Banks', component: BankPage },
  { path: '/users',
    name: 'Users', 
    components: { default: UserPage },
    props: {default: true}
  },
  { path: '/mbti', name: 'MBTI', component: MBTIPage },
  { path: '*', name: '404', component: NotFound}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.

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
    users: '',
    loading: store.state.loading,
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
      this.logger('info', 'fetchUsers()');
      this.userState = true;
      //userRequests.fetchUsers(this);
    },
    logger(logLevel, message) {
      var today = new Date();
      var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
    }
  }
}).$mount('#app')

// Now the app has started!

