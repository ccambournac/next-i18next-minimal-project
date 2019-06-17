const os     = require('os'),
      ifaces = os.networkInterfaces();

let mainIP = '127.0.0.1';

// Try for Mac... :)
for (let ifname in ifaces) {
    if (/^en[0-9]$/.test(ifname)) {
        for (let iface of ifaces[ifname]) {
            if (/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(iface.address) && iface.netmask === '255.255.255.0') {
                mainIP = iface.address;
                break;
            }
        }
    }
}

// Not found... because of Mac ;)
if (mainIP === '127.0.0.1') {
    const ipconfig = [].concat.apply([], Object.values(ifaces))
    .filter(({family}) => family === 'IPv4')
    .find(({address}) => address.indexOf('192.168.110.') === 0);

    if (ipconfig) mainIP = ipconfig.address;
}

module.exports = mainIP;
