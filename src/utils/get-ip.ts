import { networkInterfaces } from 'os'

/**
 * 获取本机IP
 */
export function getMyIpList () {
  const ip: string[] = []
  const interfaces = networkInterfaces()
  Object.values(interfaces).forEach((v) => {
    if (v) {
      v.forEach((item) => {
        if (item.family === 'IPv4') {
          ip.push(item.address)
        }
      })
    }
  })

  return ip
}
