/* eslint-disable @typescript-eslint/ban-ts-comment */
import net from 'net'
import WebSocket from 'ws'

export const toWebSocket = (fromPort: number, toAddr: string) => {
  const server = net.createServer(c => {
    const ws = new WebSocket(toAddr)

    console.log('start')

    ws.on('close', () => c.destroy())

    ws.on('error', () => c.destroy())

    c.on('end', () => { ws.close(1000) })

    c.on('error', () => { ws.close(1000) })

    ws.on('open', () => {
      console.log('on open')
      c.on('data', data => {
        ws.send(data)
      })
    })

    ws.on('message', data => {
      if (!c.destroyed) {
        // @ts-expect-error
        c.write(data)
      }
    })
  })

  server.on('error', (err) => {
    throw err
  })
  server.listen(fromPort)

  return server
}

export const toIPCTCPOnConnection = (ws: WebSocket, ipc: string) => {
  const client = net.connect(ipc)

  client.on('end', () => { ws.close(1000) })

  client.on('error', () => { ws.close(1000) })

  ws.on('close', () => client.destroy())

  ws.on('error', () => client.destroy())

  // @ts-expect-error
  ws.on('message', data => client.write(data))

  client.on('data', data => { ws.send(data) })
}

export const toTCPOnConnection = (ws: WebSocket, toPort: number, toHost: string) => {
  const client = net.createConnection(toPort, toHost)

  client.on('end', () => { ws.close(1000) })

  client.on('error', () => { ws.close(1000) })

  ws.on('close', () => client.destroy())

  ws.on('error', () => client.destroy())

  client.on('connect', () => {
    console.log('client on ready')
    ws.on('message', data => {
      console.log('ws on message')
      // @ts-expect-error
      client.write(data)
    })
  })

  client.on('data', data => {
    console.log('client on data')
    ws.send(data)
  })
}

export const toTCP = (fromPort: number, toPort: number, toHost: string) => {
  const wss = new WebSocket.WebSocketServer({ port: fromPort })

  wss.on('connection', ws => { toTCPOnConnection(ws, toPort, toHost) })

  return wss
}
