import { createProxyServer } from './utils/proxy-server'
import { createWSServer } from './utils/ws-server'

console.log('server')

async function main () {
  await createProxyServer(18080)
  console.log('本地httpProxy启动成功')
  await createWSServer(8800, 18080)
  console.log('websocket server 启动成功')
}

main().catch(console.error)
