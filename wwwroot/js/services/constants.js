export default Object.freeze({
    common: {
        editFailure:    'Could not edit ',
        editSuccess:    'Successfully edited ',
        required:       'This field is required',
    },
    mbti: {

    },
    position: {
        newPosition:    'New Position',
        editPosition:   'Edit Position',
        uniquePosition: 'Position name already exists',
        uniqueSymbol:   'Symbol already exists',
    },
    roles: {
        administrator:  'Administrator',
        manager:        'Manager',
        user:           'User',
    },
    patterns: {
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        lowercase:      /[a-z]+/,
        number:         /[0-9]+/,
        uppercase:      /[A-Z]+/,
    },
    user: {
        addFailure:     'Could not add ',
        addSuccess:     'Successfully added ',
        deleteUser:     'Are you sure you want to delete this user?',
        editUser:       'Edit User',
        email:          'Invalid e-mail',
        lowercase:      'One lowercase letter required',
        newUser:        'New User',
        number:         'One number required',
        passwordLength: 'Password must be between 8 and 50 characters long',
        passwordMatch:  'Passwords are not the same',
        required:       'This field is required',
        uniqueEmail:    'Email already exists',
        uniqueUsername: 'Username already exists',
        uppercase:      'One uppercase letter required',
        usernameLength: 'Username must be between 4 and 20 characters long',
    },
})