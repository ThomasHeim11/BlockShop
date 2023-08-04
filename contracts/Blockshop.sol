// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Blockshop {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id, 
        string memory _name, 
        string memory _category,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
        ) public {

    }
}
