/*************************************
 * SETUP YOUR SERVER CONFIGURATION
 *************************************/

// PLATFORM INDEPENDENT CONFIGURATION
const _config = {
    hostname: "localhost",
    //Admin user (will be created or updated to database table users)
    admin: {
        username: 'root',
        password: 'Admin765431091',
        lang: 'en',
        email: 'piworld.es@gmail.com',
        emailPassword: 'Admin765431091'
    }, 
    mathpix: { 'app_id': 'piworld', 'app_key': '0945a56b7d3b3b3f6497df5c15d3217d', 'Content-type': 'application/json' },
    API_KEY: 'AIzaSyB3hBmL_NgK91CHGFJt5YVROtM8St1c50I',
    oauth2: {
        accessToken:
        'ya29.GlvvAwSzCYvC_ZcA2Fq_OMMUJ8DOuLHzB-JQFv1-IJh6j4teYDrOVJ4tWQragmdzWyciPAjkTTOdW46V_tJA6vtMPSiZ6l_eX4Mt9F_gN39DcA2c2FykZc33QJI7',
        refreshToken: '1/CcpPrIcleoyurfTswqo6jFNVLTAYhDyopEXs-VqXFIynbdXXJIhr7rsqksgltQqg',
        token_type: 'Bearer',
        expires: 1486807451180,
        clientId: '260364920387-iabhn4e4i7qu0nqebgp4dfhv4cocr7a8.apps.googleusercontent.com', 'project_id': 'piworld-1377',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth', 'token_uri': 'https://accounts.google.com/o/oauth2/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        clientSecret: 'nRyw3W_2fGiTlYvwuwxwVWyQ',
        redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost']
    },
    badges: {
        CMT: { id: 1, desc: 'Comment bagde', score: 10, EVERY: 4 },
        REG: { id: 2, desc: 'Regularity bagde', score: 100, EVERY: 3 },
        BOW: { id: 3, desc: 'Best of weeek bagde', score: 200, MIN: 100 },
        BOM: { id: 4, desc: 'Best of month bagde', score: 300, MIN: 500 },
        CHL: { id: 5, desc: 'Weekly challenge badge', score: 140 }
    }

};



// PLATFORM DEPENDENT CONFIGURATION

const _platform = process.platform;
let platformConfig: any;

if (_platform.indexOf('win') === 0) {
    console.log('Node platform windows');

    platformConfig = {
        //Configure the database connection here
        mysql: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'imaths'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: 'c:\\Maxima-5.31.2\\bin\\maxima.bat',
            python: 'c:\\Python33\\python.exe',
            yacas: '',
            pandoc: 'c:\\Pandoc\\pandoc.exe',
            tmp: 'c:\\imaths-tmp\\',
            mysqldump: ''
        },

        express: {
            port: 3000
        },

        logLevel: 'verbose'

    };
} else if (_platform === 'darwin') {
    console.log('Node platform darwin');

    platformConfig = {
        //Configure the database connection here
        mysql: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Admin765431091',
            database: 'imaths'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: '/Applications/Maxima.app/Contents/Resources/maxima.sh',
            python: '/usr/bin/python',
            pandoc: '/usr/local/bin/pandoc',
            tex: '/usr/local/texlive/2014basic/bin/universal-darwin/',
            yacas: '/usr/bin/yacas',
            tmp: '/Users/josep/imaths-tmp/',
            mysqldump: '/usr/local/mysql/bin/mysqldump'
        },

        express: {
            port: 3200
        },
        logLevel: 'debug'
    };
} else if (_platform === 'linux') {
    console.log('Node platform linux');
    _config.hostname = '46.101.208.135';

    platformConfig = {

        mysql: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Admin765431091',
            database: 'imaths'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: '/usr/bin/maxima',
            python: '/usr/bin/python',
            yacas: '/usr/bin/yacas',
            tex: '',
            pandoc: '/usr/local/bin/pandoc',
            tmp: '/root/imaths-tmp/',
            mysqldump: '/usr/bin/mysqldump'
        },

        express: {
            port: 3000
        },

        logLevel: 'warn'
    };
} else {
    console.log('Please provide a configuration for platform ', _platform);
    process.exit(1);
}

// Choose here your preferred configuration
export const config: any = {..._config, ...platformConfig, platform: _platform};
 
