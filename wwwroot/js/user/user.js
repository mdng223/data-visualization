var vm = new Vue({
    el: '#app',
    data: {
        users: '',
        title: '',
        roles: '',
        formData: {
            id: '',
            username: '',
            email: '',
            roleName: '',
            password: '',
            password2: '',
        },
        states: {
            add: false,
            edit: false,
            table: true,
        },
        errors: {
            username: null,
            password: '',
            password2: null,
            email: null,
            role: null,
        },
        success: {
            username: null,
            email: null,
            password: null,
            password2: null,
        },
        rules: {
            username: [

            ],
            password: [
                { message:'One lowercase letter required', regex:/[a-z]+/, valid: false },
                { message:"One uppercase letter required",  regex:/[A-Z]+/, valid: false },
                { message:"8 characters minimum", regex:/.{8,}/, valid: false },
                { message:"One number required", regex:/[0-9]+/, valid: false },
                { message:"50 characters maximum", regex:/^.{0,50}$/, valid: true },
            ],
        },
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
            if (this.states.edit) {
                this.errors.username = '';
                return;
            }
            this.success.username = null;
            let length = this.getUserLength(),
                valid = false;

            if (!val) {
                this.errors.username = 'Username is required';
            } else if (val.length < 4) {
                this.errors.username = 'Username has to be at least 4 characters long';
            } else if (val.length > 20) {
                this.errors.username = 'Your username is long af & cannot be more than 20 characters long';
            } else if ( !validate.uniqueValue(val, this.getUsernames(length), length) ){
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
            } else if (!validate.validEmail(val)) {
                this.errors.email = 'Email address format not valid';
            } else if ( !validate.uniqueValue(val, this.getEmails(length), length) 
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
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.states.add = false;
            this.states.edit = false;
            this.states.table = true;
        },
        add: function() {
            this.clearForms(this.formData);
            this.clearErrors(this.errors);
            this.states.add = true;
            this.states.edit = false;
            this.states.table = false;
        },
        submit: function() {
            if(!(this.states.add) && !(this.states.edit)){
                console.log("Error: Both add and edit states should not be false!");
                return;
            }
            if(this.states.add && !this.states.edit){
                if (validate.validateForms(this.errors)) {
                    let data = {};
                    data.username = this.formData.username;
                    data.password = this.formData.password;
                    data.email = this.formData.email;
                    data.roleName = this.formData.roleName;
                    data.roleId = this.getRoleId(this.formData.roleName);
                    requests.addUser(this, data);
                } else {
                    alert('Forms are not valid!');
                }
            } else if (this.states.edit) {
                let data = {};
                data.id = this.formData.id;
                data.email = this.formData.email;
                data.roleId = this.formData.roleId;
                requests.editUser(this, data);
            } else {
                console.log("Something funky happened");
            }
        },
        edit: function (user) {
          //  this.formData = {};
            this.states.add = true;
            this.states.edit = true;
            this.states.table = false;
            this.title = user.username;

            this.formData.id = user.id;
            this.formData.email = user.email;
            this.formData.roleName = user.roleName;
            this.formData.roleId = this.getRoleId(this.formData.roleName);


        },
        remove: function(user) {
            var confirm = window.confirm("Are you sure?");
            if (confirm) {
                let data = {};
                data.id = user.id;
                requests.deleteUser(this, data);
            }
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
        validateForms: function(errors) {
            const entries = Object.entries(errors)
            for (var e in entries) {
                if (entries[e][1]) { return false; }
            }
            return true;
        }
    },
    created () {
        requests.fetchUsers(this);
        requests.fetchRoles(this);
    },
});



