// Ensure you have web3.js included in your project

// ABI and contract address
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_usn",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_examType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_examFees",
                "type": "uint256"
            }
        ],
        "name": "registerExam",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getExamDetails",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0x0A12E51945CecE3B254E6e6dcda7e66FFBA00A0d';

async function registerStudent() {
    // Connect to the blockchain
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log('No Ethereum provider detected. Install MetaMask.');
        return;
    }

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Get form values
    const name = document.getElementById('name').value;
    const usn = document.getElementById('usn').value;
    const examType = document.getElementById('examType').value;
    let examFees = document.getElementById('examFees').value;

    examFees/=1000;

    try {
        examFees = web3.utils.toWei(examFees.toString(), 'ether');
        await contract.methods.registerExam(name, usn, examType, examFees).send({ from: account });
        // Navigate to the next page
        window.location.href = 'next_page.html';
    } catch (error) {
        console.error(error);
        alert('Error registering student. See console for details.');
    }
}
