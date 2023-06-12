/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express'
import expressWS from 'express-ws'
// @ts-expect-error
import { toTCPOnConnection } from 'tcp-websocket-tunnel'

export async function createWSServer (port: number = 8800, tcpPort: number = 18080) {
  const app = express()
  expressWS(app)

  // @ts-expect-error
  app.ws('/ws', (ws) => toTCPOnConnection(ws, tcpPort, 'localhost'))

  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`ws server listen in ${port}`)
  })
}
