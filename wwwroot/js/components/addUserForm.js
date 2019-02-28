export default{
    name: 'add-user-form',
    props: {
        users: {
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
        debug: {
            type: Boolean,
            default: true,
        }
    },
    data: function() {
        return {
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
        }
    },
    mounted()  {
        axios.get('api/Role')
        .then((response) => {
          this.roles = response.data;
          if(this.debug) { this.logger('info', 'roles fetched.' + this.roles); }
        })
        .catch(error => (this.logger('error', 'roles could not be fetched.')));
    },
    computed: {
        computeUsername() {
            return this.formData.username;
        },
        computePassword() {
            return this.formData.password;
        },
        computePassword2() {
            return this.formData.password2;
        },
        computeEmail() {
            return this.formData.email;
        },
        computeRole() {
            return this.formData.roleName;
        },
    },
    watch: {
        computeUsername: function (val) {
            if (this.debug) { this.logger('info', 'username =\t' + val);}
            let length = val.length, valid = false;
            if (!val) {
                this.errors.username = 'Username is required';
            } else if (length < 4) {
                this.errors.username = 'Username has to be at least 4 characters long';
            } else if (length > 20) {
                this.errors.username = 'Your username is long af & cannot be more than 20 characters long';
            } else if ( !this.uniqueValue(val, this.getUsernames(this.users.length), length) ){
                console.log('gets here');
                this.errors.username = 'Username already exists';
            } else {
                this.errors.username = null;
                valid = true;
            }
            if (valid) {
                this.success.username = 'Valid username!';
            }
        },
        computePassword: function (val) {
            if (this.debug) {this.logger('info', 'computePassword:\t' + val);}
            if (!val) {
                this.errors.password = '- Password is required';
                this.rules.password.forEach( function(element) {
                    element.valid = false;
                });
                return;
            } else {
                this.errors.password = null;
            }
            this.rules.password.forEach( function(element) {
                if (element.regex.test(val) && val){
                        element.valid = true;
                } else {
                    element.valid = false;
                }
            });
            if (val == this.formData.password2) {
                this.errors.password2 = '';
                this.success.password2 = 'Passwords match!';
            } else {
                this.success.password2 = null;
            }
        },
        computePassword2: function (val) {
            if (!val) {
                this.errors.password2 = null;
                return;
            } else if (val == this.formData.password) {
                this.errors.password2 = null;
                this.success.password2 = 'Passwords match!';
            } else {
                this.errors.password2 = 'Passwords do not match';
                this.success.password2 = null;
            } 
        },
        computeEmail: function  (val) {
            this.success.email = null;
            let length = this.getUserLength();
            let valid = false;
            if (!val) {
                this.errors.email = 'Email address is required';
                return;
            } else if (!this.validEmail(val)) {
                this.errors.email = 'Email address format not valid';
            } else if ( !this.uniqueValue(val, this.getEmails(length), length) 
                        && !this.states.edit) {
                this.errors.email = 'Email address already exists';
            } else {
                this.errors.email = null;
                valid = true;
            }
            if (valid) {
                this.success.email = 'Valid email address!';
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
            this.$emit('cancel-to-user-page', false);
            if(this.debug) { this.logger('info', 'add cancel button clicked.'); }
        },
        logger: function(logLevel, message) {
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
        },
        add: function () {
            if (this.debug) { this.logger('info', 'Add user button clicked.'); }
            if (this.validateForms(this.errors, this.formData)) {
                let data = {};
                data.username = this.formData.username;
                data.password = this.formData.password;
                data.email = this.formData.email;
                data.roleName = this.formData.roleName;
                data.roleId = this.getRoleId(this.formData.roleName);
                console.log(data);
                axios({
                    method: 'POST',
                    url: 'api/User',
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
                    this.$emit('add-to-user-page', true);
                  })
            } else {
                if (this.debug) { this.logger('warning', 'Errors were found.'); }
                alert('Forms are not valid!');
            }

        },
        clearErrors: function(errors) {
            errors.username = null;
            errors.password = null;
            errors.password2 = null;
            errors.email = null;
            errors.role = '';
        },
        clearForms: function(forms) {
            this.formData.id = '';
            this.formData.username = '';
            this.formData.email = '';
            this.formData.roleName = '';
            this.formData.password = '';
            this.formData.password2 = '';
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        isBlank: function (str) {
            var re = /^\s*$/;
            return (re.test(str));
        },
        uniqueValue: function (val, list, length) {
            for (let i = 0; i < length; i++) {
                if (val == list[i]){
                    return false; /* not unique */
                }
            }
            return true; /* unique */
        },
        oneLowerCaseLetter: function (str) {
            var re = /[a-z]+/;
            return (re.test(str));
        },
        /* Makes sure there are no errors before making post request */
        validateForms: function(errors, formData) {
            for (const [key, value] of Object.entries(errors)) {
                if (value) { 
                    if (this.debug) { this.logger('error', 'error.'+key+' has errors.'); }
                    return false; 
                }
            }

            for (const [key, value] of Object.entries(formData)) {
                if (key != 'id' && !value) {
                    if (this.debug) { this.logger('error', 'formData.'+key+' is empty.'); }
                    return false;
                }
                
            }
            return true;
        },
        getUserLength: function() { /* gets length so this is only computed once */
            return this.users.length
        },
        getUsernames: function(length) {
            let usernames = [];
            for (let i = 0; i < length; i++){ 
                usernames.push(this.users[i].username);
            }
            return usernames;
        },
        getEmails: function(length) {
            let emails = [];
            for (let i = 0; i < length; i++) {
                emails.push(this.users[i].email);
            }
            return emails;
        },
        getRoleId: function(roleName) {
            if (roleName == 'Administrator'){
                return 1;
            } else if (roleName == 'Manager') {
                return 2;
            } else if (this.formData.roleName == 'User') {
                return 3;
            }
            return 0;
        }, 
    },
    template: `
    <form>
        <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control form-control-sm" placeholder="Enter your username" v-model="formData.username" />
            <small class="form-text error">{{ errors.username }}</small>
            <small class="form-text success">{{ success.username }}</small>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control form-control-sm" placeholder="Enter your password" v-model="formData.password" />
            <dl>
                <small><dt>Requirements</dt></small>
                <small><dd class='text-danger' v-for='rule in rules.password'>
                    <template v-if='!rule.valid'>
                        - {{ rule.message }} 
                    </template>
                </dd></small>
                <small><dd class='text-danger'>{{ errors.password }} </dd></small>
            </dl> 
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control form-control-sm" placeholder="Enter your password" v-model="formData.password2" />
            <small class="form-text error">{{ errors.password2 }}</small>
            <small class="form-text success">{{ success.password2 }}</small>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control form-control-sm" placeholder="Example: fuck@you.com" v-model="formData.email" />
                <small class="form-text error">{{ errors.email }}</small>
                <small class="form-text success">{{ success.email }}</small>
        </div>

        <div class="form-group">
            <label>Role</label> 
            
                <select class="form-control" v-model="formData.roleName">
                    <option v-for="role in roles">{{ role.roleName }}</option>
                </select>
            <small class="form-text error">{{ errors.role }}</small>
            <small class="form-text success">{{ success.role }}</small>
        </div>

        <div class="form-group"></div>
            <button type="button" class="btn btn-danger"  v-on:click='cancel'>Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click='add'>Add User</button>
        </div>
    </form>

    `
  }