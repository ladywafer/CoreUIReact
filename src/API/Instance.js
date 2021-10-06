import axios from "axios";
const Instance = axios.create({
  baseURL: 'https://petstore.subx64.space/api',
  headers: {
    'Authorization': 'Basic ' + localStorage.getItem('credentials')
  }
})

export default Instance
