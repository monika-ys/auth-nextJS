import { NextRequest, NextResponse } from "next/server";

console.log('file')
// Function to fetch data from external API
const fetchData = async () => {
  console.log(new Date().toLocaleDateString(),'last step')
  // try {
  //   // Make the API call
  //   const response = await fetch('external-api-url');
  //   const data = await response.json();
  //   latestData = data; // Store the fetched data
  //   console.log('Data fetched:', data); // Log fetched data
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
};

// Call the fetchData function initially
fetchData();

// Set up an interval to fetch data every 10 minutes
setInterval(fetchData, 10 * 60 * 1000);

export default async function handler(req:Request, res:NextResponse) {
 console.log('1st step')
}