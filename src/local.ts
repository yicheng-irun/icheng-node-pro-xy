import { getEnvString } from './utils/env'
import { getMyIpList } from './utils/get-ip'
import { toWebSocket } from './utils/tunnel'
console.log('local')

export async function main () {
  const remoteUrl = getEnvString('DEV_WS_URL')
  const wsUrl = remoteUrl.replace('https://', 'wss://')
  console.log(wsUrl)

  const server = toWebSocket(18080, wsUrl)
  server.on('listening', () => {
    console.log('local listening in 18080')
    console.log(getMyIpList().map((t) => {
      return `${t}:18080`
    }))
  })
}

main().catch(console.error)

/**
 * curl --proxy http://127.0.0.1:18888 https://google.com
 * curl --proxy http://127.0.0.1:18080 https://google.com
 */
