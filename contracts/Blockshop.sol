// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Blockshop {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
