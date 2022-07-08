import { api } from "../../api"

export async function getDemand(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { data } = await api.post('/telemetry/demand', {
		"filters": [
			{"type" : "=", "field": `${discretization}.ponto`, "value": unity},
			{"type" : "between", "field": ["dia_num"], "value": [startDate, endDate]}
		]
  })

  return data.data
}
