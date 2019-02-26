
import UserPage from './pages/userPage.js'
import DebugButton from './components/debugButton.js'


const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const a_404 = {template: '<div>404</div>'}
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', name: 'Foo', component: Foo },
  { path: '/bar', name: 'Bar', component: Bar },
  { path: '/user', 
    name: 'User', 
    components: { default: UserPage},
    props: {default: true}
  },
  { path: '*', name: '404', component: a_404}
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
      this.loading = true
     
     switch (this.$route.name) {
      case "User":
        this.fetchUsers();
        break;
      case "Foo":
        if (this.debug) { this.logger('info', 'foo()'); }
        this.userState = false;
        break;
      case "Bar":
        this.userState = false;
        if (this.debug) { this.logger('info', 'bar()'); }
        break;
      default:
        this.userState = false;
        if (this.debug) { this.logger('error', '404()'); }
     }
    },
    fetchUsers() {
      if (this.debug) {
        this.logger('info', 'fetchUsers()');
      }
      this.userState = true;
      userRequests.fetchUsers(this);
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

