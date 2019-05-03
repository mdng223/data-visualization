

export default{
    name: 'add-bank-form',
    components: {
        vuejsDatepicker
    },
    props: {
        banks: {
            type: Array,
            required: true
        },
        formData: {
            type: Object,
            required: true
        },
        errors: {
            type: Object,
            required: true
        },
        success: {
            type: Object,
            required: true
        },
        states: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            dismissSecs: 3,
            dismissCountDown: 0,
            alert: '',
            state: {
                date: new Date(2016, 9,  16)
            }
        }
    },
    mounted()  {
        axios.get('api/Role')
        .then((response) => {
          this.roles = response.data;
        })
        .catch(error => (this.logger('error', 'roles could not be fetched.')));
    },
    computed: {
        computebankName() {
            return this.formData.bankName;
        },
        computeSymbol() {
            return this.formData.symbol;
        },
    },
    watch: {
        computebankName: function (val) {
            let length = val.length;

            var valid = false;
            this.success.bankName = null;
            if (!val) {
                this.errors.bankName = 'bank name is required';
            } else if (length < 4) {
                this.errors.bankName = 'bank name has to be at least 4 characters long';
            } else if (length > 20) {
                this.errors.bankName = 'Your bank name is long af & cannot be more than 50 characters long';
            } else if ( !this.uniqueValue(val, this.getbankNames(this.banks.length), length) ){
                this.errors.bankName = 'bank name already exists';
            } else {
                this.errors.bankName = null;
                valid = true;
            }
            if (valid) {
                this.success.bankName = 'Valid bank name!';
            }
        },
        computeSymbol: function  (val) {
            this.success.symbol = null;
            let length = this.formData.symbol.length;
            let valid = false;
            var obj = {val: val, length: length};
            if (!val) {
                this.errors.symbol = 'symbol is required';
                return;
            } else if ( !this.uniqueValue(val) && !this.states.edit) {
                this.errors.symbol = 'symbol already exists';
            } else {
                this.errors.symbol = null;
                valid = true;
            }
            if (valid) {
                this.success.symbol = 'Valid symbol!';
            }
        },
        computeRole: function (val) {
            if (!val) {
                this.success.role = null;
                this.errors.role = 'Role is required';
            } else {
                this.errors.role = null;
                this.success.role = 'Role selected';
            }
        },

    },
    methods: {
        cancel: function() {
            this.$emit('cancel-to-bank-page', false);
        },
        logger: function(logLevel, message) {
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
        },
        add: function () {
            if (this.validateForms(this.errors, this.formData)) {
                let data = {};
                data.bankName = this.formData.bankName;
                data.symbol = this.formData.symbol;
                data.userid = 1;
                axios({
                    method: 'POST',
                    url: 'api/bank',
                    data: JSON.stringify(data),
                    headers:{'Content-Type': 'application/json; charset=utf-8'},
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
                  .then( () => {
                    this.$emit('add-to-bank-page', true);
                  })
            } else {
                this.showAlert('Forms are not valid!');
            }

        },
        clearErrors: function(errors) {
            errors.bankName = null;
            errors.password = null;
            errors.password2 = null;
            errors.symbol = null;
            errors.role = '';
        },
        clearForms: function(forms) {
            this.formData.id = '';
            this.formData.bankName = '';
            this.formData.symbol = '';
            this.formData.roleName = '';
            this.formData.password = '';
            this.formData.password2 = '';
        },
        isBlank: function (str) {
            var re = /^\s*$/;
            return (re.test(str));
        },
        uniqueValue: function (val) {
            for (const bank of this.banks) {
                if (val == bank.symbol){
                    return false;
                }
                return true;
              }
        },
        oneLowerCaseLetter: function (str) {
            var re = /[a-z]+/;
            return (re.test(str));
        },
        /* Makes sure there are no errors before making post request */
        validateForms: function(errors, formData) {
            for (const [key, value] of Object.entries(errors)) {
                if (value) { 
                    return false; 
                }
            }

            for (const [key, value] of Object.entries(formData)) {
                if (key != 'id' && !value) {
                    return false;
                }
            }
            return true;
        },
        getbankNames: function(length) {
            let bankNames = [];
            for (let i = 0; i < length; i++){ 
                bankNames.push(this.banks[i].bankName);
            }
            return bankNames;
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
        <form>
        
            <b-alert
                :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
            >
                <p>{{ alert }}</p>
                <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px" />
            </b-alert>

        <div class="form-group">
            <label>bank Name</label>
            <input type="text" class="form-control form-control-sm" placeholder="Enter name of your bank" v-model="formData.bankName" />
            <small class="form-text error">{{ errors.bankName }}</small>
            <small class="form-text success">{{ success.bankName }}</small>
        </div>

        <div class="form-group">
        <label>Symbol</label>
            <input type="text" class="form-control form-control-sm" v-model="formData.symbol" />
            <small class="form-text error">{{ errors.symbol }}</small>
            <small class="form-text success">{{ success.symbol }}</small>
        </div>

        <div class="form-group">
            <label>bank Type</label> 
                <select class="form-control" v-model="formData.bankType">
                    <option v-for="bank in banks">{{ bank.bankType }}</option>
                </select>
            <small class="form-text error">{{ errors.bank }}</small>
            <small class="form-text success">{{ success.bank }}</small>
        </div>

        <div class="form-group">
        <label>Interest Rate</label>
            <input type="text" class="form-control form-control-sm" v-model="formData.interest" />
            <small class="form-text error">{{ errors.interest }}</small>
            <small class="form-text success">{{ success.interest }}</small>
        </div>

        <div class="form-group">
        <label>bank Origin Date</label>
        <vuejs-datepicker :bootstrap-styling="true">
            <div :highlighted="state.highlighted" 
                 slot="beforeCalendarHeader" 
                 class="calender-header">
                Choose a Date
            </div>
        </vuejs-datepicker>
      </datepicker>
        <div class="form-group"></div>
            <button type="button" class="btn btn-danger"  v-on:click='cancel'>Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click='add'>Add bank</button>
        </div>
    </form>

    `
  }