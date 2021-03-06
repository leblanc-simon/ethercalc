
/*
CC0 1.0 Universal

To the extent possible under law, 唐鳳 has waived all copyright and
related or neighboring rights to EtherCalc.

This work is published from Taiwan.

<http://creativecommons.org/publicdomain/zero/1.0>
*/

(function() {
  var argv, host, json, key, port;

  argv = (function() {
    try {
      return require('optimist').argv;
    } catch (_error) {}
  })();

  json = (function() {
    try {
      return JSON.parse(require('fs').readFileSync('/home/dotcloud/environment.json', 'utf8'));
    } catch (_error) {}
  })();

  port = Number((argv != null ? argv.port : void 0) || (json != null ? json.PORT_NODEJS : void 0) || process.env.PORT || process.env.VCAP_APP_PORT) || 8000;

  host = (argv != null ? argv.host : void 0) || process.env.VCAP_APP_HOST || '0.0.0.0';

  key = (argv != null ? argv.key : void 0) || null;

  console.log("Please connect to: http://" + (host === '0.0.0.0' ? require('os').hostname() : host) + ":" + port + "/");

  require('zappa')(port, host, function() {
    this.KEY = key;
    return this.include('main');
  });

}).call(this);
