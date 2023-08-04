// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title Blockshop
 * @author Thomas Heim 
 * @dev A smart contract for managing an online marketplace called Blockshop.
 * @notice This contract allows users to list items for sale and buy items with ether.
 */
contract Blockshop {
    /**
     * @notice Address of the contract owner who can list items and withdraw funds.
     */
    address public owner;

    /**
     * @notice Represents an individual item in the marketplace.
     */
    struct Item {
        uint256 id; // Unique identifier for the item
        string name; // Name of the item
        string category; // Category of the item
        string image; // IPFS or URL link to the item image
        uint256 cost; // Cost of the item in ether
        uint256 rating; // Rating of the item (out of 5)
        uint256 stock; // Quantity of the item available in stock
    }

    /**
     * @notice Represents an order placed by a user.
     */
    struct Order {
        uint256 time; // Timestamp when the order was created
        Item item; // Item that was ordered
    }

    /**
     * @notice Mapping of item IDs to their corresponding Item struct.
     */
    mapping(uint256 => Item) public items;

    /**
     * @notice Mapping of user addresses to their orders.
     */
    mapping(address => mapping(uint256 => Order)) public orders;

    /**
     * @notice Mapping of user addresses to the number of orders they have placed.
     */
    mapping(address => uint256) public orderCount;

    /**
     * @notice Event emitted when an item is listed for sale.
     * @param name The name of the listed item.
     * @param cost The cost of the listed item in ether.
     * @param quantity The quantity of the listed item available in stock.
     */
    event List(string name, uint256 cost, uint256 quantity);

    /**
     * @notice Event emitted when a user buys an item.
     * @param buyer The address of the buyer.
     * @param orderId The ID of the order.
     * @param itemId The ID of the purchased item.
     */
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    /**
     * @notice Modifier to restrict access to the contract owner only.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    /**
     * @notice Constructor to set the contract owner as the deployer of the contract.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Allows the contract owner to list an item for sale.
     * @param _id The unique identifier of the item.
     * @param _name The name of the item.
     * @param _category The category of the item.
     * @param _image The IPFS or URL link to the item image.
     * @param _cost The cost of the item in ether.
     * @param _rating The rating of the item (out of 5).
     * @param _stock The quantity of the item available in stock.
     */
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    /**
     * @notice Allows a user to buy an item from the marketplace using ether.
     * @param _id The ID of the item to be purchased.
     */
    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost, "Insufficient funds to buy the item.");

        // Require item is in stock
        require(item.stock > 0, "Item is out of stock.");

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    /**
     * @notice Allows the contract owner to withdraw the contract's balance.
     */
    function withdraw() public onlyOwner {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed.");
    }
}
