
const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Blockshop
  const Blockshop = await hre.ethers.getContractFactory("Blockshop")
  const blockshop = await Blockshop.deploy()
  await blockshop.deployed()

  console.log(`Deployed Blockshop Contract at: ${blockshop.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await blockshop.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});