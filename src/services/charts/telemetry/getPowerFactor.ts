import axios from "axios"
import { parseCookies } from "nookies"
import { api } from "../../api"

export async function getPowerFactorData(
    unity: string,
    startDate: Date,
    endDate: Date,
    discretization: string
  ) {
  const { data } = await api.post('http://smart-energia-api.herokuapp.com/api/telemetry/powerFactor', {
		"filters": [
			{"type" : "=", "field": "med_5min.ponto", "value": unity},
			{"type" : "between", "field": "dia_num", "value": [startDate.toLocaleDateString().split('/').reverse().join('-'), endDate.toLocaleDateString().split('/').reverse().join('-')]}
		]
  })
  return data.data
}
