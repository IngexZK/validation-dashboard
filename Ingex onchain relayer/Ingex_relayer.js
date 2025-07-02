
require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

// Keys and other sensitive information removed for public repo
// CONTRACT_ADDRESS currently points to Ingex testnet deployment
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  "function totalItems() view returns (uint256)",
  "function items(uint256) view returns (string name, string outcome, uint256 commitment)"
];

function getProvider() {
  return new ethers.providers.AlchemyProvider('homestead', ALCHEMY_API_KEY);
}

function getContractInstance(provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

// Retrieves the total number of items stored in the contract.
async function fetchTotalItems(contract) {
  const count = await contract.totalItems();
  return count.toNumber();
}

// Fetches a single item by its index.
async function fetchItem(contract, index) {
  const [name, outcome, commitment] = await contract.items(index);
  return { name, outcome, commitment: commitment.toString() };
}

async function fetchAllData(contract, total) {
  const results = [];
  for (let i = 0; i < total; i++) {
    const item = await fetchItem(contract, i);
    results.push(item);
  }
  return results;
}

// Write to file
function writeToFile(data) {
  const content =
    'export const dashboardTableData = ' +
    JSON.stringify(data, null, 2) +
    ';\n';
  fs.writeFileSync('general.js', content, 'utf8');
}

async function main() {
  try {
    const provider = getProvider();
    const contract = getContractInstance(provider);

    const total = await fetchTotalItems(contract);
    console.log(`Found ${total} items in contract storage.`);

    const data = await fetchAllData(contract, total);
    console.log('Fetched all items:', data);

    writeToFile(data);
    console.log('general.js created successfully.');
  } catch (err) {
    console.error('Error in data fetching or file writing:', err);
  }
}

main();
