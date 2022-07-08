import axios from "axios"
import { parseCookies } from "nookies"

export async function getDemand(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { '@smartAuth-token': token } = parseCookies()
  const { data } = await axios.post('https://smart-energia-api.herokuapp.com/api/telemetry/powerFactor', {
		"filters": [
			{"type" : "=", "field": `${discretization}.ponto`, "value": unity},
			{"type" : "between", "field": ["dia_num"], "value": [startDate, endDate]}
		]
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return data.data
}
