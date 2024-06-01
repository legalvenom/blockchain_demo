// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamRegistration {
    struct Student {
        string name;
        string usn;
        string examType;
        uint marks;
    }

    mapping(address => Student) public students;

    function registerExam(string memory _name, string memory _usn, string memory _examType, uint _marks) public payable {
        require(msg.value == 100 wei, "Registration fee is 100 wei");
        
        students[msg.sender] = Student(_name, _usn, _examType, _marks);
    }

    function getExamDetails(address _user) public view returns (string memory, string memory, string memory, uint) {
        Student memory student = students[_user];
        return (student.name, student.usn, student.examType, student.marks);
    }
}
