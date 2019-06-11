export default Object.freeze({
    color: {
        red:            'red',
        success:        'success'
    },
    common: {
        addSuccess:     'Successfully added',
        contentTypeValue: 'application/json; charset=utf-8',
        deleteSuccess:  'Successfully deleted',
        editFailure:    'Could not edit ',
        editSuccess:    'Successfully edited ',
        required:       'This field is required',
        success:        'success',
    },
    mbti: {
        title:          'MBTI Statistics',
    },
    mbtiStats: {
        title:          'MBTI Stats'
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
    method: {
        post:           'POST',
        put:            'Put',
    },
    patterns: {
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        lowercase:      /[a-z]+/,
        number:         /[0-9]+/,
        uppercase:      /[A-Z]+/,
    },
    url: {      
        mbtiAdd:        'api/MBTI/add',
        mbtiGet:        'api/MBTI',
        mbtiGetGenders: 'api/MBTI/getGenders',
        mbtiGetNF:      'api/MBTI/getNF',
        mbtiGetNT:      'api/MBTI/getNT',
        mbtiGetSJ:      'api/MBTI/getSJ',
        mbtiGetSP:      'api/MBTI/getSP',
        mbtiGetTypes:   'api/MBTI/getMbtiTypes',
        mbtiHide:       'api/MBTI/hide',
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