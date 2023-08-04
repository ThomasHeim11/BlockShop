const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Blockshop", () => {
  let blockshop;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    console.log(deployer, buyer);

    const Blockshop = await ethers.getContractFactory("Blockshop");
    blockshop = await Blockshop.deploy();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await blockshop.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await blockshop
        .connect(deployer)
        .list(1, "Shoes", "Clothing", "Image", 1, 4, 5);

      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await blockshop.items(1)
      expect(item.id).to.equal(1)
    });
  });
});
