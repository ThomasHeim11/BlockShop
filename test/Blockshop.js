const { expect } = require("chai");
const { transform } = require("typescript");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE =
  "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Blockshop", () => {
  let blockshop;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    // console.log(deployer, buyer);

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
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await blockshop.items(ID);

      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it("Emits List event", () => {
      expect(transaction).to.emit(blockshop, "List");
    });
  });

  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await blockshop
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await blockshop.connect(buyer).buy(ID, { value: COST });

      beforeEach(async () => {
        transaction = await blockshop.connect(deployer).list();
      });

      it("Updates the contract balance", async () => {
        const result = await ethers.provider.getBalance(blockshop.address);
        expect(result).to.equal(COST);
      });

      it("Updates buyer`s order count", async () => {
        const result = await blockshop.orderCount(buyer.address);
        expect(result).to.equal(1);
      });

      it("Adds the order", async () => {
        const order = await blockshop.orders(buyer.address, 1);

        expect(order.time).to.be.greaterThan(0);
        expect(order.item.name).to.equal(NAME);
      });

      it("Updates the contract balance", async () => {
        const result = await ethers.provider.getBalance(blockshop.address);
        expect(result).to.equal(COST);
      });

      it("Emits Buy event", () => {
        expect(transaction).to.emit(blockshop, "Buy")
      })

      describe("Withdrawing", () => {
        let balanceBefore

        beforeEach(async () =>{
          let transaction = await blockshop.connect(deployer).list(ID, CATEGORY, IMAGE, COST, RATING, STOCK)
          await transaction.wait()

          transaction = await blockshop.connect(buyer).buy(ID, { value: COST })

          balanceBefore = await ethers.provider.getBalance(deployer.address)

          transaction = await blockshop.connect(deployer).withdraw()
          await transaction.wait()
        })

        it('Updates the owner balance', async () => {
          const balanceAfter = await ethers.provider.getBalance(deployer.address)
          expect(balanceAfter).to.be.greaterThan(balanceBefore)
        })

        it('Updates the contract balance', async () => {
          const result = await ethers.provider.getBalance(blockshop.address)
          expect(result).to.equal(0)
        })
      })
    });
  });
});
