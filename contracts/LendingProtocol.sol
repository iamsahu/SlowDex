// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LendingProtocol {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    uint256 public balance;

    ERC20 public token;
    event AmountReceived(address winner, uint256 amount);
    event AmountDeposited(uint256 winner, uint256 amount);

    function LoanMe(address add_, uint256 amount) public payable {
        token = ERC20(add_);
        require(
            token.balanceOf(address(this)) >= amount,
            "Balance is not sufficient"
        );
        token.transfer(msg.sender, msg.value / 2);
        emit AmountReceived(msg.sender, msg.value);
    }

    function DepositTokens(
        address token1_,
        address token2_,
        uint256 amount1_,
        uint256 amount2_
    ) public {
        ERC20 token1 = ERC20(token1_);
        ERC20 token2 = ERC20(token2_);
        token1.transferFrom(msg.sender, address(this), amount1_);
        token2.transferFrom(msg.sender, address(this), amount2_);
        emit AmountDeposited(amount1_, amount2_);
    }
}
