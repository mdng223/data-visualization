export default{
    name: 'add-position-form',
    props: {
        positions: {
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
        computePositionName() {
            return this.formData.positionName;
        },
        computeSymbol() {
            return this.formData.symbol;
        },
    },
    watch: {
        computePositionName: function (val) {
            let length = val.length;

            var valid = false;
            this.success.positionName = null;
            if (!val) {
                this.errors.positionName = 'Position name is required';
            } else if (length < 4) {
                this.errors.positionName = 'Position name has to be at least 4 characters long';
            } else if (length > 20) {
                this.errors.positionName = 'Your position name is long af & cannot be more than 50 characters long';
            } else if ( !this.uniqueValue(val, this.getPositionNames(this.positions.length), length) ){
                this.errors.positionName = 'Position name already exists';
            } else {
                this.errors.positionName = null;
                valid = true;
            }
            if (valid) {
                this.success.positionName = 'Valid position name!';
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
        }
    },
    methods: {
        cancel: function() {
            this.$emit('cancel-to-position-page', false);
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
                data.positionName = this.formData.positionName;
                data.symbol = this.formData.symbol;
                data.userid = 1;
                axios({
                    method: 'POST',
                    url: 'api/Position',
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
                    this.$emit('add-to-position-page', true);
                  })
            } else {
                this.showAlert('Forms are not valid!');
            }

        },
        clearErrors: function(errors) {
            errors.positionName = null;
            errors.password = null;
            errors.password2 = null;
            errors.symbol = null;
            errors.role = '';
        },
        clearForms: function(forms) {
            this.formData.id = '';
            this.formData.positionName = '';
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
            for (const position of this.positions) {
                if (val == position.symbol){
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
        getPositionNames: function(length) {
            let positionNames = [];
            for (let i = 0; i < length; i++){ 
                positionNames.push(this.positions[i].positionName);
            }
            return positionNames;
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert(alert) {
            window.scrollTo(0, 0);
            this.alert = alert;
            this.dismissCountDown = this.dismissSecs;
        }
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
            <label>Position Name</label>
            <input type="text" class="form-control form-control-sm" placeholder="Enter name of your position" v-model="formData.positionName" />
            <small class="form-text error">{{ errors.positionName }}</small>
            <small class="form-text success">{{ success.positionName }}</small>
        </div>
        <div class="form-group">
            <label>Symbol</label>
            <input type="text" class="form-control form-control-sm" v-model="formData.symbol" />
                <small class="form-text error">{{ errors.symbol }}</small>
                <small class="form-text success">{{ success.symbol }}</small>
        </div>

        <div class="form-group"></div>
            <button type="button" class="btn btn-danger"  v-on:click='cancel'>Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click='add'>Add Position</button>
        </div>
    </form>

    `
  }