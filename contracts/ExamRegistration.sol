// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamRegistration {
    struct Exam {
        string name;
        string usn;
        string examType;
        uint256 examFees;
    }

    mapping(address => Exam) public exams;

    function registerExam(
        string memory _name,
        string memory _usn,
        string memory _examType,
        uint256 _examFees
    ) public {
        exams[msg.sender] = Exam(_name, _usn, _examType, _examFees);
    }

    function getExamDetails(
        address _user
    )
        public
        view
        returns (string memory, string memory, string memory, uint256)
    {
        Exam memory exam = exams[_user];
        return (exam.name, exam.usn, exam.examType, exam.examFees);
    }
}
