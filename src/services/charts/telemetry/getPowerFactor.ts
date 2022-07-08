import { api } from "../../api"

export async function getPowerFactorData(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { data } = await api.post('/telemetry/powerFactor', {
    "filters": [
      {"type" : "=", "field": `${discretization}.ponto`, "value": unity},
      {"type" : "between", "field": "dia_num", "value": [startDate, endDate]}
    ]
  })

  return data.data
}
