let validate = {
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
    validateForms: function(errors) {
        const entries = Object.entries(errors)
        for (var e in entries) {
            if (entries[e][1]) { return false; }
        }
        return true;
    }
}