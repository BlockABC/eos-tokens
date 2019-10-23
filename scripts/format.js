const fs = require('fs')
const path = require('path')
const glob = require('glob')

for (const filepath of glob.sync(path.join(__dirname, "..", "tokens", "**", "*.json"))) {
    const token = require(filepath)

    // Format in order
    const formatedToken = {
        ...token,
        name: token.name || "",
        symbol: token.symbol || "",
        contract: token.contract || "",
        precision: token.precision !== undefined ? token.precision : 4,
        issuer: token.issuer || "",
        logo: token.logo || "",
        desc: token.desc || "",
        website: token.website || "",
        whitepaper: token.whitepaper || "",
        links: token.links || {},
    }

    // Save Token
    fs.writeFileSync(filepath, JSON.stringify(formatedToken, null, 2), 'utf-8')
}
