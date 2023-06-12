/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express'
import expressWS from 'express-ws'
import { toTCPOnConnection } from './tunnel'

export async function createWSServer (port: number = 8800, tcpPort: number = 18080) {
  const app = express()
  expressWS(app)

  // @ts-expect-error
  app.ws('/ws-ttt', (ws) => {
    console.log('收到请求')
    toTCPOnConnection(ws, tcpPort, '127.0.0.1')
  })

  app.get('/', (_, res) => {
    res.send('hello world')
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`ws server listen in ${port}, to ${tcpPort}`)
  })
}
