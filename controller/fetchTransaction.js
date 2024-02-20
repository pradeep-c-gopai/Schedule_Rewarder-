const { Web3 } = require('web3');

// Initialize web3 with the provider
const web3Base = new Web3('https://base-sepolia.g.alchemy.com/v2/DyOXSqDxeGPhXIq71dOFsVq-gniGnKJG');

// Initialize web3 with the provider
const web3Cronos = new Web3('https://evm-t3.cronos.org/');

const poolContractABI = require('../constants/poolAbi.json');

const routerContractABI = require('../constants/routerAbi.json');

// const from = 0;

const pool = require('../database');

// Contract address
const basePoolcontractAddress = '0xf75e544fFb50acB36C7565cd03388eEcb036A33A';

const baseRouterContractAddress = '0xf889B7419579527E24D0df8740d58bd769989977';

const cronosPoolContractAddress = '0xFBdD2c6Dadb70A48b5574970851177568721203C';

const cronosRouterContractAddress = '0x2E2748c0F26a08c68F9C3aC4b7037F43FBaa26D2';

// Contract instance
const basePoolContract = new web3Base.eth.Contract(poolContractABI, basePoolcontractAddress);

// Contract instance
const baseRouterContract = new web3Base.eth.Contract(routerContractABI, baseRouterContractAddress);

// Contract instance
const cronosPoolContract = new web3Cronos.eth.Contract(poolContractABI, cronosPoolContractAddress);

// Contract instance
const cronosRouterContract = new web3Cronos.eth.Contract(routerContractABI, cronosRouterContractAddress);


async function main(){
    
    // const fromBlock = await getTransactionBlockNumber();
    // const fromBlock = ;

    // await getPoolContractTransactionsInBase(0);

    // await getPoolContractTransactionsInCronos(0);

    await getRouterContractTransactions(0);


}

// Function to get transactions made to the contract for specific methods
async function getPoolContractTransactionsInBase(_from) {
    try {
        // Get past events for specific methods: deposit, borrow, repay
        const depositEvents = await basePoolContract.getPastEvents('Deposit', {
            fromBlock: _from,
            toBlock: 'latest'
        });

        const borrowEvents = await basePoolContract.getPastEvents('Borrow', {
            fromBlock: _from,
            toBlock: 'latest'
        });

        const repayEvents = await basePoolContract.getPastEvents('Repay', {
            fromBlock: _from,
            toBlock: 'latest'
        });

        // Concatenate all events into one array
        const allEvents = [...depositEvents, ...borrowEvents, ...repayEvents];

        console.log('\n\n\n\n');

        console.log('allEvents', allEvents.length);

        console.log('\n\n\n\n');
        // Log each event
        allEvents.forEach(event => {
            console.log('Transaction Hash:', event.transactionHash);
            console.log('Event:', event.event);
            console.log('Event Data:', event.returnValues);
            console.log('Block Number:', event.blockNumber);
            console.log('-----------------------------------');
        });

        console.log('latest block', allEvents[allEvents.length - 1].blockNumber);

    } catch (error) {
        console.error('Error fetching basePoolContract transactions:', error);
    }
}

// Function to get transactions made to the contract for specific methods
async function getPoolContractTransactionsInCronos(_from) {
    try {
        // Get past events for specific methods: deposit, borrow, repay
        const depositEvents = await cronosPoolContract.getPastEvents('Deposit', {
            fromBlock: 18257369,
            toBlock: 18257679
        });

        const borrowEvents = await cronosPoolContract.getPastEvents('Borrow', {
            fromBlock: 18257369,
            toBlock: 18257679
        });

        const repayEvents = await cronosPoolContract.getPastEvents('Repay', {
            fromBlock: 18257369,
            toBlock: 18257679
        });

        // Concatenate all events into one array
        const allEvents = [...depositEvents, ...borrowEvents, ...repayEvents];

        console.log('\n\n\n\n');

        console.log('allEvents', allEvents.length);

        console.log('\n\n\n\n');
        // Log each event
        allEvents.forEach(event => {
            console.log('Transaction Hash:', event.transactionHash);
            console.log('Event:', event.event);
            console.log('Event Data:', event.returnValues);
            console.log('Block Number:', event.blockNumber);
            console.log('-----------------------------------');
        });

        console.log('latest block', allEvents[allEvents.length - 1].blockNumber);

    } catch (error) {
        console.error('Error fetching basePoolContract transactions:', error);
    }
}

// Function to get transactions made to the contract for specific methods
async function getRouterContractTransactions(_from) {

    // const firstTransactionHash = await baseRouterContract.methods.getFirstTransactionHash().call();

    // console.log('firstTransactionHash ', firstTransactionHash);

    // const transaction = await web3Base.eth.getTransaction(firstTransactionHash);

    // console.log(transaction.blockNumber);


    try {
        // Get past events for specific methods: deposit, borrow, repay
        const addLiquidityEvents = await baseRouterContract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest'
        });


        // Concatenate all events into one array
        const allEvents = [...addLiquidityEvents];

        console.log('\n\n\n\n');

        console.log('allEvents', allEvents.length);

        console.log('\n\n\n\n');
        // Log each event
        allEvents.forEach(event => {
            console.log('Transaction Hash:', event.transactionHash);
            console.log('Event:', event.event);
            console.log('Event Data:', event.returnValues);
            console.log('Block Number:', event.blockNumber);
            console.log('-----------------------------------');
        });

        console.log('latest block', allEvents[allEvents.length - 1]);

    } catch (error) {
        console.error('Error fetching baseRoterContract transactions:', error);
    }
}


// // Function to get block number of a transaction
// async function getTransactionBlockNumber() {
//     try {

//         //get last rewarded tx
//         const [baseLatestTx, cronosLatestTx] = await getLatestRewardedTx();

//         // Get transaction details
//         const transaction = await web3Base.eth.getTransaction(baseLatestTx);

//         // Check if transaction exists
//         if (!transaction) {
//             console.error('Transaction not found');
//             return;
//         }

//         // Get block number
//         const blockNumber = transaction.blockNumber;

//         // Log block number
//         console.log('Block Number:', Number(blockNumber)+1, blockNumber);

//         return blockNumber;

//     } catch (error) {
//         console.error('Error fetching transaction block number:', error);
//     }
// }

// async function getLatestRewardedTx() {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = `(SELECT id, tx_id
//             FROM transactions
//             WHERE id = (
//                 SELECT MAX(id) AS last_id
//                 FROM sakhafinance.transactions
//                 WHERE chainId = 84532
//             )
//            )
//            UNION
//            (SELECT id, tx_id
//             FROM transactions
//             WHERE id = (
//                 SELECT MAX(id) AS last_id
//                 FROM sakhafinance.transactions
//                 WHERE chainId = 338
//             )
//            );`

//         pool.query(sqlQuery, (err, result) => {
//             if (err) {
//                 console.log('jhbgdsyf')
//                 reject(err);
//             }

//             console.log("result[0].tx_id",result[0].tx_id, result[1].tx_id);
//             resolve([result[0].tx_id, result[1].tx_id]);
//         });
//     });
// }


main();

// // Call the function to get contract transactions for specific methods
// getPoolContractTransactions(from);