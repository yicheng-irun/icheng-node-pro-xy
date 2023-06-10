/**
 * 进行普通的http代理
 */

import http, { IncomingMessage, ServerResponse } from 'http';
import net from 'net';
import url from 'url';

/**
 * 普通的http请求走这里
 * @param cReq
 * @param cRes
 */
function request(cReq: IncomingMessage, cRes: ServerResponse) {
  console.log('request', cReq.url);
  const u = url.parse(cReq.url!);
  const options: http.RequestOptions = {
    hostname: u.hostname,
    port: u.port || 80,
    path: u.path,
    method: cReq.method,
    headers: cReq.headers,
  };

  if (u.hostname === null) { // 如果是直接请求的
    cRes.write('hello wrold');
    cRes.end();
    return;
  }

  const pReq = http.request(options, (pRes) => {
    cRes.writeHead(pRes.statusCode!, pRes.headers);
    pRes.pipe(cRes);
  }).on('error', (e) => {
    console.log('request error', e);
    cRes.end();
  });
  cReq.pipe(pReq);
  cReq.on('error', (e) => {
    console.log('request creq error', e);
    pReq.end();
  });
}

/**
 * websock 或者 https 是走的这里
 * @param cReq
 * @param cSock
 */
function connect(cReq: IncomingMessage, cSock: ServerResponse) {
  console.log('connect', cReq.url);
  const u = url.parse(`http://${cReq.url}`);
  const pSock = net.connect(parseInt(u.port!, 10), u.hostname!, () => {
    cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    pSock.pipe(cSock);
  }).on('error', (e) => {
    console.log('connect error', u.href, e);
    cSock.end();
  });
  cSock.pipe(pSock);
  cSock.on('error', (e) => {
    console.log('connect cSock error', u.href, e);
    pSock.end();
  });
}

export function createProxyServer(port = 18080): Promise<void> {
  return new Promise((resolve, reject) => {
    http.createServer()
      .on('request', request)
      .on('connect', connect)
      .on('error', reject)
      .listen(port, '0.0.0.0', () => {
        console.log(`proxy server listen in ${port}`);
        resolve();
      });
  });
}