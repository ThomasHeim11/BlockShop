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

    const ID = 1
    const NAME = "Shoes"
    const CATEGORY = "Clothing"
    const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
    const COST = tokens(1)
    const RATING = 4
    const STOCK = 5

    beforeEach(async () => {
      transaction = await blockshop
        .connect(deployer)
        .list(1, "Shoes", "Clothing", "Image", 1, 4, 5);

      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await blockshop.items(ID)
      expect(item.id).to.equal(ID)
    });
  });
});
