"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyIpList = void 0;
const os_1 = require("os");
function getMyIpList() {
    const ip = [];
    const interfaces = (0, os_1.networkInterfaces)();
    Object.values(interfaces).forEach((v) => {
        if (v) {
            v.forEach((item) => {
                if (item.family === 'IPv4') {
                    ip.push(item.address);
                }
            });
        }
    });
    return ip;
}
exports.getMyIpList = getMyIpList;
