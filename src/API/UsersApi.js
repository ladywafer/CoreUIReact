import Instance from "./Instance";
import axios from "axios";

export default class UsersApi {
  static async getMe(login, password) {
    try {
      const credentials = btoa(`${login}:${password}`)
      const basicAuth = 'Basic ' + credentials
      await axios.get(
        'https://petstore.subx64.space/api/users/me', {
        headers: {
          'Authorization': basicAuth
        }
      })
      return  credentials
    } catch (err) {
      return false
    }
  }

  static async getAllUsers() {
    try {
      const response = await Instance.get('/users')
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  static async addNewUser(payload) {
    try {
      await Instance.post('/users', payload)
    } catch (err) {
      console.log(err)
    }
  }

  static async editUser(payload, id) {
    try {
      await Instance.put(`/users/${id}`, payload)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteUser(id) {
    try {
      await Instance.delete(`/users/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
}
