// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Blockshop {

    string public name;
    address public owner;

    constructor() {
        name = "Blockshop";
        owner = msg.sender; 
    }
}
