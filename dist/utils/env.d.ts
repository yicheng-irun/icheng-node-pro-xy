/**
 * 从环境变量中获取一个值
 * @param name 环境变量名
 * @param defaultValue 默认值
 */
export declare function getEnvString(name: string, fallback?: string): string;
export declare function getEnvInt(envName: string, fallback?: number): number;
