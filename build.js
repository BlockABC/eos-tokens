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

const tokensMd = tokens.reduce((reduced, token) => {
  return reduced + `| [${token.symbol}](https://github.com/BlockABC/eos-tokens/blob/master/tokens/${token.account}/${token.symbol}.json) | [${token.account}](https://eospark.com/contract/${token.account}) |\n`
}, '| Symbol      | Account Name |\n| ----------- |:------------:|\n')

console.log(tokensMd)
fs.writeFileSync('./tokens.json', JSON.stringify(tokens, null, 2), 'utf-8')