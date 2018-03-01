import {config} from '../src/server.config';

export class TestConfig {
    static asUsername = config.admin.username;
    static asPassword = config.admin.password;
    static parents = 0;
    static uri = "http://localhost:" + config.express.port + config.basePrefix;
 }

 console.log(TestConfig.uri, TestConfig.asUsername);