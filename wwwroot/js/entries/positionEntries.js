export default{
    name: 'position-entries',
    data: function() {
        return {
        }
    },
    mounted()  {
        axios.get('api/positionEntries')
        .then((response) => {
          this.positionEntries = response.data;
        })
        .catch(error => (console.log(error)));
    },
    template: 
    `
    <div>
      <h1>Position Entries</h1>
    </div>
    `
  }