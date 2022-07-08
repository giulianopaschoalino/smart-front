import axios from "axios"
import { parseCookies } from "nookies"

export async function getDiscretization(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { '@smartAuth-token': token } = parseCookies()
  const { data } = await axios.post('https://smart-energia-api.herokuapp.com/api/telemetry/powerFactor', {
    "type": discretization,
    "filters": [
        {"type" : "=", "field": "med_5min.ponto", "value": unity}
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )

  return data.data
}
