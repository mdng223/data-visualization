
export default{
    name: 'edit-position-form',
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
    },
    data: function() {
        return {
            currentEmail: '',
            currentRole: '',
            roles: '',
            rules: {
                password: [
                    { message:'One lowercase letter required', regex:/[a-z]+/, valid: false },
                    { message:"One uppercase letter required",  regex:/[A-Z]+/, valid: false },
                    { message:"8 characters minimum", regex:/.{8,}/, valid: false },
                    { message:"One number required", regex:/[0-9]+/, valid: false },
                    { message:"50 characters maximum", regex:/^.{0,50}$/, valid: true },
                ],
            },
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

        this.currentEmail = this.formData.email;
        this.currentRole = this.formData.roleName;
    },
    computed: {
        computeEmail() {
            return this.formData.email;
        },
    },
    watch: {
        computeEmail: function  (val) {
            this.success.email = null;
            if (!val) {
                this.errors.email = 'Email address is required';
                return;
            } else if (!this.validEmail(val)) {
                this.errors.email = 'Email address format not valid';
            } else if (!this.uniqueEmail(this.formData.email)) {
                this.errors.email = 'Email address already exists.';
            } else {
                this.errors.email = null;
                this.success.email = 'Valid email address!';
            }
        }
    },
    methods: {
        cancel: function() {
            this.$emit('cancel-to-position-page', true);
        },
        logger: function(logLevel, message) {
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
        },
        edit: function() {
            if (this.formData.email == this.currentEmail &&
                this.formData.roleName == this.currentRole) {
                this.showAlert('Email and Role are the same, nothing to update.');
            } else if (this.isBlank(this.formData.email)){
                this.showAlert('Cannot have a blank email');
            }  else if (!this.validEmail(this.formData.email)){
                this.showAlert('Email is not valid');
            } else if (!this.uniqueEmail(this.formData.email)) {
                this.showAlert('Email: ' + this.formData.email + ' already exists!');
            } else {
                let data = {};
                data.id = this.formData.id;
                data.email = this.formData.email;
                data.roleId = this.formData.roleId;
                axios({
                    method: 'Put',
                    url: 'api/Position/edit',
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
                    this.$emit('edit-to-position-page', true);
                  })
            }
        },
        getRoleId: function(roleName) {
            if (roleName == 'Administrator'){
                return 1;
            } else if (roleName == 'Manager') {
                return 2;
            } else if (this.formData.roleName == 'Position') {
                return 3;
            }
            return 0;
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        isBlank: function (str) {
            var re = /^\s*$/;
            return (re.test(str));
        },
        uniqueEmail: function (email) {
            var length = this.positions.length;
            for (var i = 0; i < length; i++) {
                if (email == this.positions[i].email &&
                    email != this.currentEmail) {
                    return false;
                }
            }
            return true;
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
        <input type="text" class="form-control form-control-sm" v-model="formData.positionName" />
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
        <button type="button" class="btn btn-danger" v-on:click="cancel">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="edit">Edit Position</button>
    </div>
    </form>
    `
  }