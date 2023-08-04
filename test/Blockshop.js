const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Blockshop", () => {
  let blockshop;
  let deployer, buyer

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners()
    console.log(deployer, buyer)

    const Blockshop = await ethers.getContractFactory("Blockshop");
    blockshop = await Blockshop.deploy();

  });

  describe("Deployment", () => {
    it("has a name", async () => {
      const name = await blockshop.name();
      expect(await blockshop.name()).to.equal("Blockshop");
    });
  });
});
