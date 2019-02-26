export default{
    name: 'edit-user-form',
    props: {
        title: {
            type: String,
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
    methods: {
        cancel: function() {
            this.$emit('edit-to-user-page', false);
            if(this.debug) { this.logger('info', 'cancel button clicked.'); }
        },
        logger: function(logLevel, message) {
            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            console.log( dateTime + ' :: ' + logLevel + ' :: ' + message );
        },
    },
    template: `
    <form>
        <h3 class='text-center'>{{ title }} </h3>
        <small class="form-text error">{{ errors.username }}</small>
        <small class="form-text success">{{ success.username }}</small>

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
        <button type="button" class="btn btn-danger" v-on:click="cancel">Cancel</button>
        <button type="button" class="btn btn-primary" >Edit User</button>
    </div>
    </form>
    `
  }