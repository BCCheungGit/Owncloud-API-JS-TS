import axios from "axios";
import pkg from 'simple-xml-to-json';
const { convertXML } = pkg;
class OwnCloudClient {
    options;
    api;
    constructor(options) {
        this.options = options;
        this.api = axios.create({
            baseURL: options.baseUrl,
            auth: {
                username: options.username,
                password: options.password
            },
            headers: {
                "OCS-APIRequest": "true",
            }
        });
    }
    async createFolder(path) {
        try {
            const url = `${this.options.baseUrl}/remote.php/dav/files/${this.options.username}/${path}`;
            const response = await this.api.request({
                method: "MKCOL",
                url: url,
            });
            if (response.status === 201) {
                console.log(`Folder created successfully at ${path}`);
            }
            else {
                console.error(`Failed to create folder. Status code: ${response.status}`);
            }
        }
        catch (error) {
            console.error("Error creating folder:", error.message);
            throw error;
        }
    }
    async listFiles(path) {
        try {
            const url = `${this.options.baseUrl}/remote.php/dav/files/${this.options.username}/${path}`;
            const response = await this.api.request({
                method: "PROPFIND",
                url: url,
            });
            if (response.status === 207) {
                const files = response.data;
                const json = convertXML(files);
                return json;
            }
            else {
                console.error(`Failed to list files. Status code: ${response.status}`);
            }
        }
        catch (error) {
            console.error("Error listing files:", error.message);
            throw error;
        }
    }
}
export { OwnCloudClient };
