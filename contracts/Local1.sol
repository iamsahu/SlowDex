// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Local1 is ERC20 {
    constructor() ERC20("Local1", "LOC1") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
