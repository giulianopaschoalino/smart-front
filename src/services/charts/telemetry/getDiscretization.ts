import { api } from "../../api"

export async function getDiscretization(
    unity: string,
    startDate: string,
    endDate: string,
    discretization: string
  ) {
  const { data } = await api.post('/telemetry/discretization', {
    "type": discretization,
    "filters": [
        {"type" : "=", "field": "med_5min.ponto", "value": unity}
      ]
    }
  )

  return data.data
}
