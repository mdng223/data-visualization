

export default{
    name: 'bank-table',
    data: function() {
        return {
            banks: '',
            dialog: false,
            title: '',
            dismissSecs: 3,
            dismissCountDown: 0,
            alert: '',
            states: {
                add: false,
                edit: false,
                table: true,
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
        axios.get('api/bank')
        .then((response) => {
          this.banks = response.data;
        })
        .catch(error => (console.log(error)));
    },
    computed: {
        computeAddState() {
            return this.states.add;
        },
        computeEditState() {
            return this.states.edit;
        },
        computeSubmitState() {
            return this.states.submit;
        },
        computeCancelState() {
            return this.states.cancel;
        }
    },
    watch: {

    },
    methods: {
        edit: function (bank) {
            this.states.edit = true;
            this.states.table = false;
            this.title = bank.bankName;

            this.formData.bankId = bank.bankId;
            this.formData.bankName = bank.bankName;
            this.formData.interestRate = bank.interestRate;
            this.formData.balance = bank.balance;
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
        remove: function(bank) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = bank.bankId;
                axios({
                    method: 'Put',
                    url: 'api/bank/hide',
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
                    axios.get('api/bank')
                    .then((response) => {
                      this.banks = response.data;
                    })
                    .catch(error => (console.log(error)))
                    .then( this.showAlert('bank deleted successfully!') );
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
        truncate(element, index) {
            return element.slice(0, index);
        }
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
                <b-button size='sm' variant="success" v-on:click="add">Add bank</b-button>
            </b-form-group>
  
            <table  class="table table-bordered">
            <tr>
                <th>bank Name</th>
                <th>Balance</th>
                <th>Interest</th>
                <th>History</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="(bank, index) in banks">
                <td> {{ bank.bankName }} </td>
                <td> $ {{ bank.balance }} </td>
                <td> {{ bank.interestRate * 100.0 }} % </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-primary btn-sm'>History</button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-warning btn-sm' v-on:click="edit(bank)"> Edit </button>
                    </div>
                </td>
                <td>
                    <div class="mx-auto" style="width: 50px;">
                        <button class='btn btn-danger btn-sm' v-on:click="remove(bank)"> Delete </button>
                    </div>
                </td> 
            </tr>
            </table>
            <pagination></pagination>


        </template>
        <template v-if="states.add">
            <add-bank-form
                v-bind:banks= 'banks'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-bind:states= 'states'
                v-on:cancel-to-bank-page="states.add = $event"
                v-on:add-to-bank-page="states.submit = $event"
            ></add-bank-form>
        </template>
        <template v-if="states.edit">
            <edit-bank-form
                v-bind:banks= 'banks'
                v-bind:formData= 'formData'
                v-bind:errors= 'errors'
                v-bind:success= 'success'
                v-on:cancel-to-bank-page="states.cancel = $event"
                v-on:edit-to-bank-page="states.submit = $event"
            ></edit-bank-form>
        </template>
        <template>
            <h4>TODO:</h4>
            <ol>
                <li>Create</li>
                <li>Update</li>
                <li>History</li>
                <li>Remove</li>
            </ol>
        </template>

    </div>
    `
  }