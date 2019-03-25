import Home from './pages/homePage.js'
import UserPage from './pages/userPage.js'
import NotFound from './pages/notFound.js'
import PositionPage from './pages/positionPage.js'
import LoanPage from './pages/loanPage.js'
import DebugButton from './components/debugButton.js'


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Positions', name: 'Positions', component: PositionPage },
  { path: '/loans', name: 'Loans', component: LoanPage },
  { path: '/users', 
    name: 'Users', 
    components: { default: UserPage },
    props: {default: true}
  },
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
  debug: true,
  state: {
    user: false,
    loading: false,
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}


const app = new Vue({
  router,
  el: '#app',
  
  data: {
    users: '',
    debug: true,
    loading: store.state.loading,
    userState: store.state.user,
  },
  created () {
    console.log("created");
  },
  computed: {
    computeDebug() {
      return this.debug;
    }
  }, 
  watch: {
    '$route': 'determineRoute',
    computeDebug: function(val) {
      this.logger('info', 'Debug set to ' + this.debug);
    }
  },
  methods: {
    toggleDebug() {
      this.debug = !this.debug;
    },
    determineRoute() {

     switch (this.$route.name) {
      case "Home":
        break;
      case "Positions":
        this.userState = false;
        break;
      case "Users":
        this.fetchUsers();
        break;
      case "Foo":
        this.userState = false;
        break;
      case "Loans":
        this.userState = false;
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

