export default{
    name: 'debug-button',
    //props: ['user'],
    data() {
        return {
          myToggle: true,
          buttonValue: 'Debug On',
        }
      },
    computed: {
      btnVal() {
        return this.myToggle
      }
    },
    watch: {
      btnVal: function(val) {
          if (val) {
              this.buttonValue = 'Debug On';

          } else {
              this.buttonValue = 'Debug Off';
          }
          this.$emit('child-to-parent', this.myToggle);
      }
    },
    template: 
    `


            <b-button lg size='sm' :pressed.sync="myToggle" 
            variant="primary">{{ this.buttonValue }}</b-button>



    `
  }