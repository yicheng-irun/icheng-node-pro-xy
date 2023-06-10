import { createProxyServer } from './utils/proxy-server'

console.log('server')

async function main () {
  await createProxyServer()
}

main().catch(console.error)
