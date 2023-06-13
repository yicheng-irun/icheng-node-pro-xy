"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvInt = exports.getEnvString = void 0;
/**
 * 从环境变量中获取一个值
 * @param name 环境变量名
 * @param defaultValue 默认值
 */
function getEnvString(name, fallback) {
    const result = process.env[name] ?? fallback;
    if (result === undefined) {
        throw new Error(`请配置环境变量 ${name}`);
    }
    return result;
}
exports.getEnvString = getEnvString;
function getEnvInt(envName, fallback) {
    const envValue = process.env[envName];
    if (envValue) {
        const envValueNumber = Number.parseInt(envValue, 10);
        if (!Number.isNaN(envValueNumber)) {
            return envValueNumber;
        }
        throw new Error(`请配置环境变量 ${envName} 为数字字符串`);
    }
    if (fallback === undefined)
        throw new Error(`请配置环境变量 ${envName}`);
    return fallback;
}
exports.getEnvInt = getEnvInt;
