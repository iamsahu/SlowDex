// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
// import "@uniswap/lib/contract/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SlowDex {
    ERC20 public ERC20Interface;
    uint256 public loc1Token;
    uint256 public loc2Token;
    uint256 public theconstant;
    address slw;

    event SuccessfulSwap(address, uint256, address, uint256);
    event AmountDeposited(uint256, uint256);

    function DepositTokens(
        address token1_,
        address token2_,
        uint256 amount1_,
        uint256 amount2_
    ) public {
        ERC20 token1 = ERC20(token1_);
        ERC20 token2 = ERC20(token2_);
        require(token1.allowance(msg.sender, address(this)) >= amount1_);
        require(token2.allowance(msg.sender, address(this)) >= amount2_);
        token1.transferFrom(msg.sender, address(this), amount1_);
        token2.transferFrom(msg.sender, address(this), amount2_);
        //Add the toke amounts
        loc1Token += amount1_;
        loc2Token += amount2_;
        theconstant = loc1Token * loc2Token;
        emit AmountDeposited(amount1_, amount2_);
    }

    function ReturnBalances() public returns (uint256, uint256) {
        return (loc1Token, loc2Token);
    }

    function swapToken(
        address token1,
        address token2,
        uint256 amount1,
        uint256 amount2
    ) public {
        ERC20 _token1 = ERC20(token1);
        ERC20 _token2 = ERC20(token2);
        require(_token1.allowance(msg.sender, address(this)) >= amount1);
        _token1.transferFrom(msg.sender, address(this), amount1);
        _token2.transfer(msg.sender, amount2);
        loc1Token += amount1;
        loc2Token -= amount2;
        emit SuccessfulSwap(token1, amount1, token2, amount2);
    }

    function SetSlw(address sl) public {
        slw = sl;
    }
}
