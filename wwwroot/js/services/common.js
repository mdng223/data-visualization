export default {
    /**
     * Will clear all values in an object and set it to ''.
     * @param {object} obj 
     * @returns {number} 0
     */
    clearObject(obj) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = '';
            }
        }
        return 0
    },
    /**
     * Checks to see if an id exists in an array of objects.
     * @param {number} objectId 
     * @param {object} object 
     * @returns {boolean} outcome
     */
    doesIdExist(objectId, object) {
        for (var i in object) {
            if (object.id === objectId) {
                return true;
            }
        }
        return false;
    },
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