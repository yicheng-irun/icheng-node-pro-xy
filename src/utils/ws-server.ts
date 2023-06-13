/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express'
import http from 'http'
import { toTCPOnServer } from './tunnel'

export async function createWSServer (port: number = 8800, tcpPort: number = 18080) {
  const app = express()

  app.get('/', (_, res) => {
    res.send('hello world')
  })

  const server = http.createServer(app)

  toTCPOnServer({
    server,
    path: '/ws-ttt',
    toPort: tcpPort,
    toHost: '127.0.0.1'
  })

  server.listen(port, '0.0.0.0', () => {
    console.log(`ws server listen in ${port}, to ${tcpPort}`)
  })
}
