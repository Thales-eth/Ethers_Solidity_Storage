// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7; // solidity version

contract SimpleStorage {
    uint256 public favoriteNumber; // initialized as 0 (null default value)

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person public person = Person({favoriteNumber: 5, name: "popino"});

    Person[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function addPerson(string memory _name, uint256 favNumber) public {
        people.push(Person(favNumber, _name));
        nameToFavoriteNumber[_name] = favNumber;
    }

    function storeNumber(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieveNumber() public view returns (uint256) {
        return favoriteNumber;
    }
}
