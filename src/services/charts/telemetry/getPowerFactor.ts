import axios from "axios"
import { parseCookies } from "nookies"

export async function getPowerFactorData(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { '@smartAuth-token': token } = parseCookies()
  console.log(token.replace(/"/g, ''))
  const { data } = await axios.post('http://smart-energia-api.herokuapp.com/api/telemetry/powerFactor', {
		"filters": [
			{"type" : "=", "field": "med_5min.ponto", "value": "PRAXCUENTR101P"},
			{"type" : "between", "field": "dia_num", "value": ["2022-01-01", "2022-01-31"]}
		]
}, {
    headers: {
      'Authorization': `Bearer 1260|RHfh3uMsEfHwCTqxKOhy1CEIr34UIln9OFdf5Fc8`
    }
  })
  return data.data
}
