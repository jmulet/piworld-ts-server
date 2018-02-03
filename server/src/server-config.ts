/*************************************
 * SETUP YOUR SERVER CONFIGURATION
 *************************************
  Example of configuration using with nginx
    1. Proxy::  http://piworld.es/demo --> 127.0.0.1:3200/demo
    2. Use:: http://piworld.es/demo2 to serve static assets
      
    location /demo/ {
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_pass http://127.0.0.1:3200/demo/;
                proxy_redirect off;
    }

        location /demo2/ {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                root /root/piworld-springjs-server/src/client/public;
                #expires 0;
                expires modified 365d;
                #add_header Cache-Control "public";

                # Uncomment to enable naxsi on this location
                # include /etc/nginx/naxsi.rules
        }

 */

// PLATFORM INDEPENDENT CONFIGURATION
const _config = {
    hostname: "localhost",
    basePrefix: "/demo", //Base prefix for server routes
    staticPrefix: "/demo2", //Base prefix for the static assets
    //Admin user (will be created or updated to database table users)
    admin: {
        username: 'root',
        password: '<set password>',
        lang: 'en',
        email: '<set email>',
        emailPassword: '<set email password>'
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
            database: 'piworld'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: 'c:\\Maxima-5.31.2\\bin\\maxima.bat',
            python: 'c:\\Python33\\python.exe',
            yacas: '',
            pandoc: 'c:\\Pandoc\\pandoc.exe',
            tmp: 'c:\\pw-tmp\\',
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
            password: '',
            database: 'piworld'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: '/Applications/Maxima.app/Contents/Resources/maxima.sh',
            python: '/usr/bin/python',
            pandoc: '/usr/local/bin/pandoc',
            tex: '/usr/local/texlive/2014basic/bin/universal-darwin/',
            yacas: '/usr/bin/yacas',
            tmp: '/Users/josep/pw-tmp/',
            mysqldump: '/usr/local/mysql/bin/mysqldump'
        },

        express: {
            port: 3200
        },
        logLevel: 'debug'
    };
} else if (_platform === 'linux') {
    console.log('Node platform linux');
    process.env.NODE_ENV = 'production';
    platformConfig = {

        mysql: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'piworld'
        },

        //Configure executable and temporal paths here
        paths: {
            maxima: '/usr/bin/maxima',
            python: '/usr/bin/python',
            yacas: '/usr/bin/yacas',
            tex: '',
            pandoc: '/usr/local/bin/pandoc',
            tmp: '/root/pw-tmp/',
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
 
