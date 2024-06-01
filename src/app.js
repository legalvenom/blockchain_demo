// Ensure you have web3.js included in your project

// ABI and contract address
const abi = [
    {
        "inputs": [
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "string", "name": "_usn", "type": "string" },
            { "internalType": "string", "name": "_examType", "type": "string" },
            { "internalType": "uint256", "name": "_marks", "type": "uint256" }
        ],
        "name": "registerExam",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_user", "type": "address" }
        ],
        "name": "getExamDetails",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xF0C13964698EFE7491A9739A2d516690C0F34039';

function calculateMarks() {
    let marks = 0;
    const answers = {
        q1: "4",
        q2: "Paris",
        q3: "100"
    };

    if (document.querySelector('input[name="q1"]:checked')?.value === answers.q1) {
        marks += 1;
    }
    if (document.querySelector('input[name="q2"]:checked')?.value === answers.q2) {
        marks += 1;
    }
    if (document.querySelector('input[name="q3"]:checked')?.value === answers.q3) {
        marks += 1;
    }

    return marks;
}

async function registerStudent() {
    // Connect to the blockchain
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('User denied account access');
            return;
        }
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
    const marks = calculateMarks();

    try {
        await contract.methods.registerExam(name, usn, examType, marks).send({ from: account, value: 100 });

        // Display the student details on the same page
        document.getElementById('displayName').innerText = name;
        document.getElementById('displayUSN').innerText = usn;
        document.getElementById('displayExamType').innerText = examType;
        document.getElementById('displayMarks').innerText = marks;
        document.getElementById('transactionStatus').innerText = 'Successful';

        // Show the student details section
        document.getElementById('studentDetails').style.display = 'block';

        // Hide the registration form
        document.getElementById('registrationForm').style.display = 'none';
    } catch (error) {
        console.error(error);
        
        alert('Error registering student. See console for details.');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('registrationForm').addEventListener('submit', (event) => {
        event.preventDefault();
        registerStudent();
    });
});
