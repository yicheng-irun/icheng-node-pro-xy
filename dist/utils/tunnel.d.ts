/// <reference types="node" />
import { type Server } from 'http';
import net from 'net';
import WebSocket from 'ws';
export declare const toWebSocket: (fromPort: number, toAddr: string) => net.Server;
export declare const toIPCTCPOnConnection: (ws: WebSocket, ipc: string) => void;
export declare const toTCPOnConnection: (ws: WebSocket, toPort: number, toHost: string) => void;
export declare const toTCPOnServer: ({ server, path, toHost, toPort }: {
    server: Server;
    path?: string | undefined;
    toPort: number;
    toHost: string;
}) => WebSocket.Server<typeof WebSocket, typeof import("http").IncomingMessage>;
export declare const toTCP: (fromPort: number, toPort: number, toHost: string) => WebSocket.Server<typeof WebSocket, typeof import("http").IncomingMessage>;
