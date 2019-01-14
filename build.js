const fs = require('fs')

const contracts = fs.readdirSync('./tokens')

const tokens = contracts.reduce((reduced, contract) => {
  const tokenFiles = fs.readdirSync(`./tokens/${contract}`)

  tokenFiles.forEach(tokenFile => {
    if (tokenFile.match(/\.json$/)) {
      const token = require(`./tokens/${contract}/${tokenFile}`)
      reduced.push(token)
    }
  })
  return reduced
}, [])

fs.writeFileSync('./tokens.json', JSON.stringify(tokens, null, 2), 'utf-8')