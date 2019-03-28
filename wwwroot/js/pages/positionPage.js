import AddPositionForm from '../components/addPositionForm.js'
import Pagination from '../components/pagination.js'


Vue.component('addPositionForm', AddPositionForm);
Vue.component('pagination', Pagination);


export default{
    name: 'position-table',
    data: function() {
        return {
            positions: '',
            title: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            alert: '',
            states: {
                add: false,
                edit: false,
                table: true,
                debug: true,
                submit: false,
                cancel: false,
            },
            formData: {
            },
            errors: {
            },
            success: {
            }, 
        }
    },
    mounted()  {
        axios.get('api/Position')
        .then((response) => {
          this.positions = response.data;
        })
        .catch(error => (console.log(error)));
    },
    computed: {
        computeAddState() {
            return this.states.add;
        },
        computeSubmitState() {
            return this.states.submit;
        },
        computeCancelState() {
            return this.states.cancel;
        }
    },
    watch: {
        computeSubmitState: function(val) {
            if (val == true) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.submit = false;
                this.states.add = false;
                this.states.edit = false;
                axios.get('api/Position')
                .then((response) => {
                  this.positions = response.data;
                })
                .catch(error => (console.log(error)))
                .then( this.showAlert('Position added successfully!') );
            }
        },
        computeAddState: function(val) {
            if(val == false) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.add = false;
            }
        },
        computeCancelState: function(val) {
            console.log(val)
            if(val == true) {
                this.clearForms(this.formData);
                this.clearErrors(this.errors);
                this.clearSuccess(this.success);
                this.states.table = true;
                this.states.add = false;
                this.states.edit = false;
                this.states.cancel = false;
            }
        }
    },
    methods: {
        edit: function (position) {
           
        },
        add: function () {
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.clearSuccess(this.success);
            this.states.add = true;
            this.states.table = false;
        },
        clearErrors: function(errors) {

        },
        clearForms: function(forms) {

        },
        clearSuccess: function(success) {

        },
        remove: function(position) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = position.positionId;
                axios({
                    method: 'Put',
                    url: 'api/Position/hide',
                    data: data,
                    headers:{'Content-Type': 'application/json; charset=utf-8'},
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
                  .then( () => {
                    axios.get('api/Position')
                    .then((response) => {
                      this.positions = response.data;
                    })
                    .catch(error => (console.log(error)))
                    .then( this.showAlert('Position deleted successfully!') );
                  });
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert(alert) {
            window.scrollTo(0, 0);
            this.alert = alert;
            this.dismissCountDown = this.dismissSecs;
        },

    },
    template: `
    <div>

        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            <p>{{ alert }}</p>
            <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px" />
        </b-alert>
        <template v-if="states.table">
            <b-form-group>
                <b-button size='sm' variant="success" v-on:click="add">Add Position</b-button>
            </b-form-group>
  
            <table  class="table table-bordered">
            <tr>
                <th>Position Name</th>
                <th>Symbol</th>
                <th>username</th>
                <th>History</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="(position, index) in positions">
                <td> {{ position.positionName }} </td>
                <td> {{ position.symbol }} </td>
                <td> {{ position.username }} </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-primary btn-sm'>History</button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-warning btn-sm' v-on:click="edit(position)"> Edit </button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-danger btn-sm' v-on:click="remove(position)"> Delete </button>
                    </div>
                </td> 
            </tr>
            </table>
            <pagination></pagination>
        </template>
        <template v-if="states.add">
            <add-position-form
                v-bind:positions= 'positions'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-bind:states= 'states'
                v-on:cancel-to-position-page="states.add = $event"
                v-on:add-to-position-page="states.submit = $event"
            ></add-position-form>
        </template>
        <template v-if="states.edit">
            <edit-position-form
                v-bind:positions= 'positions'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-on:cancel-to-position-page="states.cancel = $event"
                v-on:edit-to-position-page="states.submit = $event"
            ></edit-position-form>
        </template>
    </div>
    `
  }