

import { OwnCloudClient } from './index';

console.log("Starting test...");

const client = new OwnCloudClient({
    baseUrl: 'https://image.cloudority.com',
    username: 'samsui',
    password: 'Tbtilaf4'
});

(async () => {
    try {
        await client.createFolder('test-folder');
        console.log('Folder created successfully');
    } catch (error) {
        console.error('Error creating folder:', error);
    }
})();


