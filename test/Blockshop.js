const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Blockshop", () => {

  it('has a name', async () => {
    const Blockshop = await ethers.getContractFactory("Blockshop")
    blockshop = await Blockshop.deploy()
    const name = await blockshop.name()
    expect(await blockshop.name()).to.equal("Blockshop")
  })

})
