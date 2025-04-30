var https = require('https');
var fs = require('fs');

var host = process.env.HOST || '192.168.178.250';
var port = process.env.PORT || 8443; // Change port to avoid conflict with HTTP

var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
var checkRateLimit = require('./lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT);
var cors_proxy = require('./lib/cors-anywhere');

// Load your SSL certificate and key
var options = {
  key: fs.readFileSync('/var/www/ssl/singasong/server.key'), // Replace with your key file
  cert: fs.readFileSync('/var/www/ssl/singasong/server.crt'), // Replace with your certificate file
};

function parseEnvList(env) {
  return env ? env.split(',') : [];
}

// Create the CORS Anywhere server
var corsServer = cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
});

// Create an HTTPS server
var server = https.createServer(options, corsServer);

// Start the server
server.listen(port, host, function() {
  console.log('Running CORS Anywhere on https://' + host + ':' + port);
});

