import axios from "axios"
import { parseCookies } from "nookies"

export async function getDemand(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { '@smartAuth-token': token } = parseCookies()
  const { data } = await axios.post('https://smart-energia-api.herokuapp.com/api/telemetry/demand', {
		"filters": [
			{"type" : "=", "field": `${discretization}.ponto`, "value": unity},
			{"type" : "between", "field": ["dia_num"], "value": [startDate, endDate]}
		]
  }, {
    headers: {
      'Authorization': `Bearer 1260|RHfh3uMsEfHwCTqxKOhy1CEIr34UIln9OFdf5Fc8`
    }
  })

  return data.data
}
