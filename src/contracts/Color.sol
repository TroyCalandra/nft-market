pragma solidity 0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721Enumerable {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() public ERC721("Color", "COLOR") {}

    // E.G. color = #FFFFFF
    function mint(string memory _color) public {
        require(!_colorExists[_color]);
        colors.push(_color);
        _mint(msg.sender, colors.length);
        _colorExists[_color] = true;
    }
}
