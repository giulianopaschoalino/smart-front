import { api } from "./api";

export const TOKEN_KEY = "@smartAuth-token";

interface SignInRequestData {
  email: string,
  password: string
}

type UserObjectType = {
  name: string;
  email: string;
  client_id: number;
  id: number;
  role: number;
  profile_picture?: string
}

export async function signInRequest(data: SignInRequestData) {
  let user: UserObjectType, token: string, exception: any = null

  await api
    .post('/auth/login', {
      email: data.email,
      password: data.password,
      device_name: 'test'
    })
    .then((res) => {
      token = res.data.token
      user = {
        name: res.data.user.name,
        email: res.data.user.email,
        client_id: res.data.user.client_id,
        id: res.data.user.id,
        role: res.data.user.roles[0].pivot.role_id,
        profile_picture: res.data.user.profile_picture
      }
    })
    .catch((res) => {
      exception = res
    })

  return {
    token,
    user: {
      name: user?.name,
      email: user?.email,
      client_id: user?.client_id,
      id: user?.id,
      role: user?.role,
      profile_picture: user?.profile_picture
    },
    exception
  }
}

export default async function recoverUserInformation(id) {
  let user: UserObjectType

  await api.get(`/user/${id}`).then(res => {
    user = {
      name: res.data.user.name,
      email: res.data.user.email,
      client_id: res.data.user.client_id,
      id: res.data.user.id,
      role: res.data.user.roles[0].pivot.role_id,
      profile_picture: res.data.user.profile_picture
    }
  })

  return {
    user: {
      name: user?.name,
      email: user?.email,
      client_id: user?.client_id,
      id: user?.id,
      profile_picture: user?.profile_picture
    }
  }
}

export async function logout() {
  await api.post('/auth/logout', {})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .then(res => {})
}
