export default {
    uniqueValue (value, list, length, ignoredValue) {
        for (let i = 0; i < length; i++) {
            console.log(value, list[i], ignoredValue);
            if (value === ignoredValue) {
                return true; /* edited value you wanna ignore */
            }
            if (value === list[i]){
                return false; /* not unique */
            }
        }
        return true; /* unique */
    },
}