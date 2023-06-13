"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const env_1 = require("./utils/env");
const tunnel_1 = require("./utils/tunnel");
console.log('local');
async function main() {
    const remoteUrl = (0, env_1.getEnvString)('DEV_WS_URL');
    const wsUrl = remoteUrl.replace('https://', 'wss://');
    console.log(wsUrl);
    const server = (0, tunnel_1.toWebSocket)(18080, wsUrl);
    server.on('listening', () => {
        console.log('local listening in 18080');
    });
}
exports.main = main;
main().catch(console.error);
/**
 * curl --proxy http://127.0.0.1:18888 https://google.com
 * curl --proxy http://127.0.0.1:18080 https://google.com
 */
