const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_SERVER)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD)
    await wallet.connect(provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)

    const currentFavoriteNumber = await contract.retrieveNumber()
    console.log(`Current Number => ${currentFavoriteNumber.toString()}`)
    const txResponse = await contract.storeNumber("729")
    await txResponse.wait(1)
    const modifiedFavoriteNumber = await contract.retrieveNumber()
    console.log(`Modified Number => ${modifiedFavoriteNumber.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
