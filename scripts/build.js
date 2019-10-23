const fs = require('fs')
const glob = require('glob')
const path = require('path')

const tokenFiles = glob.sync(path.resolve(__dirname, '../tokens/**/*.json'))

const tokens = tokenFiles.reduce((reduced, tokenFile) => {
  const token = require(tokenFile)
  // To compatible with old naming format
  token.account = token.contract || token.account
  reduced.push(token)
  return reduced
}, [])

let tokensMd = tokens.reduce((reduced, token) => {
  return reduced + `|  <img src="https://raw.githubusercontent.com/BlockABC/eos-tokens/master/tokens/${token.contract}/${token.symbol}.png" width=30 />  | [${token.symbol}](https://github.com/BlockABC/eos-tokens/blob/master/tokens/${token.contract}/${token.symbol}.json) | [${token.contract}](https://eospark.com/contract/${token.contract}) |\n`
}, '|   Logo    | Symbol      | Account Name |\n| ----------- |:------------:|:------------:|\n')

tokensMd = '<!-- token_list_start -->\n' + tokensMd + '<!-- token_list_end -->'

let readme = fs.readFileSync('./readme.md', 'utf-8')

readme = readme.replace(/<!-- token_list_start -->(.|\s)*<!-- token_list_end -->/, tokensMd)

fs.writeFileSync('./readme.md', readme, 'utf-8')
fs.writeFileSync(path.resolve(__dirname, '../tokens.json'), JSON.stringify(tokens, null, 2), 'utf-8')
