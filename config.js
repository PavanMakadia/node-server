var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);
// Define a schema
var config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'env'
    },
    server: {
        port: {
            doc: 'The port to bind.',
            format: 'port',
            default: 9000,
            env: 'PORT',
            arg: 'port'
        },
        ip: {
            doc: 'The IP address to bind.',
            format: 'ipaddress',
            default: '127.0.0.1',
            env: 'IP_ADDRESS',
        },
        enableHttpLogging: {
            doc: 'Enable http request logging',
            format: Boolean,
            default: true,
            env: 'HTTP_LOGGING'
        },
        enableCompression: {
            doc: 'Enable Compression',
            format: Boolean,
            default: true,
            env: 'COMPRESSION'
        }
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'server1.dev.test'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: 'users'
        }
    },
    admins: {
        doc: 'Users with write access, or null to grant full access without login.',
        format: Array,
        nullable: true,
        default: null
    },
    secret: {
        doc: 'Secret used for session cookies and CSRF tokens',
        format: '*',
        default: '',
        sensitive: true
    }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;