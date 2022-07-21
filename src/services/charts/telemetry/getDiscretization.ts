import axios from "axios"
import { parseCookies } from "nookies"
import { api } from "../../api"

const { '@smartAuth-token': token } = parseCookies()

export async function getDiscretization(
    unity: string,
    startDate: Date,
    endDate: Date,
    discretization: string
  ) {
    const { data } = await api.post('/telemetry/discretization', {
      "type": discretization,
      // "type": "1_hora",
      "filters": [
          {"type" : "=", "field": "med_5min.ponto", "value": unity},
          {"type" : "between", "field": "dia_num", "value": [startDate.toLocaleDateString().split('/').reverse().join('-'), endDate.toLocaleDateString().split('/').reverse().join('-')]}
        ]
      // "filters": [
      //     {"type" : "=", "field": "med_5min.ponto", "value": "RSZFNAENTR101P"}
      //   ]
      }
    )

  return data.data
}
