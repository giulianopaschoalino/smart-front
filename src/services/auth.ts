import { api } from "./api";

export const TOKEN_KEY = "@smartAuth-token";

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

interface SignInRequestData {
  email: string,
  password: string
}

type UserObjectType = {
  name: string;
  email: string;
  client_id: number
  id: number,
  role: number
}

export async function signInRequest(data: SignInRequestData) {
  let user: UserObjectType, token: string

  await api.post('/auth/login', {
    "email": data.email,
    "password": data.password,
    "device_name": "test"
  }).then(res => {
    user = {
      name: res.data.user.name,
      email: res.data.user.email,
      client_id: res.data.user.client_id,
      id: res.data.user.id,
      role: res.data.user.roles.role_id
    }
    token = res.data.token
  }).catch(res => {
    console.log(res)
  })

  return {
    token,
    user
  }
}

export default async function recoverUserInformation(id) {
  let user: UserObjectType

  await api.get(`/user/${id}`).then(res => {
    console.log(res)
    user = {
      name: res.data.user.name,
      email: res.data.user.email,
      client_id: res.data.user.client_id,
      id: res.data.user.id,
      role: res.data.user.roles.role_id
    }
  }).catch(res => {
    console.log(res)
  })

  return {
    user
  }
}
