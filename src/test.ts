

import { OwnCloudClient } from './index';

console.log("Starting test...");

const client = new OwnCloudClient({
  baseUrl: 'https://image.cloudority.com',
  username: 'samsui',
  password: 'Tbtilaf4'
});

(async () => {
  try {
    // await client.createFolder('test-folder');
    const res = await client.listFiles('visitorImages'); 
    console.log('Files in visitorImages:', res);
  } catch (error) {
    console.error('Error running test: ', error);
  }
})();


