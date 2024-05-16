const ExamRegistration = artifacts.require("ExamRegistration");

module.exports = function(deployer) {
  deployer.deploy(ExamRegistration);
};
