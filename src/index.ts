
import axios, { AxiosInstance} from "axios";
import pkg from 'simple-xml-to-json';

const { convertXML } = pkg;


interface OwnCloudOptions {
  baseUrl: string,
  username: string,
  password: string
}


class OwnCloudClient {
  private api: AxiosInstance;

  constructor(private options: OwnCloudOptions) {
    this.api = axios.create({
      baseURL: options.baseUrl,
      auth: {
        username: options.username,
        password: options.password
      },
      headers: {
        "OCS-APIRequest": "true",
      }})
  }


  async createFolder(path: string): Promise<void> {

    try {

      const url = `${this.options.baseUrl}/remote.php/dav/files/${this.options.username}/${path}`;
      const response = await this.api.request({
        method: "MKCOL",
        url: url,
      })

      if (response.status === 201) {
        console.log(`Folder created successfully at ${path}`);
      } else {
        console.error(`Failed to create folder. Status code: ${response.status}`);
      }   
    } catch (error: any) {
      console.error("Error creating folder:", error.message);
      throw error;
    } 
  } 



  async listFiles(path: string): Promise<void> {
    try {
      const url = `${this.options.baseUrl}/remote.php/dav/files/${this.options.username}/${path}`;
      const response = await this.api.request({
        method: "PROPFIND",
        url: url,
      })
      if (response.status === 207) {
        const files = response.data;
        const json = convertXML(files);
        return json;
      } else {
        console.error(`Failed to list files. Status code: ${response.status}`);
      }

    } catch (error: any) {
      console.error("Error listing files:", error.message);
      throw error;
    }
  }


}
export { OwnCloudClient, OwnCloudOptions };




