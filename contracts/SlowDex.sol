// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@uniswap/lib/contract/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SlowDex {
    ERC20 public ERC20Interface;

    function InitiateTransfer(address token, uint256 value) external {
        //Token, from, to, value
        // TransferHelper.safeTransferFrom(
        //     token,
        //     msg.sender,
        //     address(this),
        //     value
        // );
        (bool success, bytes memory data) =
            token.call(
                abi.encodeWithSelector(
                    0x23b872dd,
                    msg.sender,
                    address(this),
                    value
                )
            );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper::transferFrom: transferFrom failed"
        );
    }

    function transferTokens(address token, uint256 amount_) public {
        ERC20Interface = ERC20(token);
        // uint256 allowance = token.allowance(msg.sender, address(this));

        ERC20Interface.transferFrom(msg.sender, address(this), amount_);
    }
}
