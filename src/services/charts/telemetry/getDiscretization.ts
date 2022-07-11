import axios from "axios"
import { parseCookies } from "nookies"

export async function getDiscretization(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { '@smartAuth-token': token } = parseCookies()
  const { data } = await axios.post('https://smart-energia-api.herokuapp.com/api/telemetry/discretization', {
    "type": discretization,
    "filters": [
        {"type" : "=", "field": "med_5min.ponto", "value": unity}
      ]
    }, {
      headers: {
        'Authorization': `Bearer 1260|RHfh3uMsEfHwCTqxKOhy1CEIr34UIln9OFdf5Fc8`
      }
    }
  )

  return data.data
}
