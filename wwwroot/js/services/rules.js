import Constants from './constants.js'
export default {
    user: {
        required:       value =>
                        !!value
                        || Constants.user.required,
        usernameLength: username =>
                        !!username
                        && username.length >= 4
                        && username.length <= 20
                        || Constants.user.usernameLength,
        passwordLength: password =>
                        !!password
                        && password.length >= 8
                        && password.length <= 50
                        || Constants.user.passwordLength,
        lowercase:      string => {
                        return pattern.test(Constants.patterns.lowercase)
                        || Constants.user.lowercase
                        },
        uppercase:      string =>
                        pattern.test(Constants.patterns.uppercase)
                        || Constants.user.uppercase
                        ,
        number:         string =>
                        pattern.test(Constants.patterns.number)
                        || Constants.user.number
                        ,
        email:          value =>
                        Constants.patterns.email.test(value)
                        || Constants.user.email
                        ,
    }
}