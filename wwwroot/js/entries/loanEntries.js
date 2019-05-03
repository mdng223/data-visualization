export default{
    name: 'loan-entries',
    data: function() {
        return {
        }
    },
    mounted()  {
        axios.get('api/loanEntries')
        .then((response) => {
          this.loanEntries = response.data;
        })
        .catch(error => (console.log(error)));
    },
    template: 
    `
    <div>
      <h1>Loan Entries</h1>
    </div>
    `
  }