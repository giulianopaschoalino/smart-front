import { ChartOptions, ChartType } from "chart.js";

const config = (miniature: boolean | undefined): ChartOptions<ChartType> => {
  const options: any = {
      responsive: true,
      scales: {
        x: {
          stacked: false,
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: !miniature? window.innerWidth/90 : window.innerWidth/130
            }
          },
        },
        y: {
          stacked: false,
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: !miniature? window.innerWidth/90 : window.innerWidth/130
            }
          },
        },
      },
      plugins: {
        datalabels: {
          display: true,
          color: '#255488',
          formatter: (value, ctx) => {
            let sum = 0;
            const dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
                sum += data;
            });
            const result = `${parseFloat((parseFloat(value)).toLocaleString('pt-br'))}`

            return value==null? null : result
          },
          anchor: "end",
          align: "end",
          font: {
            weight: 'bold',
            size: !miniature? window.innerWidth/80 : window.innerWidth/130
          }
        },
        legend: {
          position: 'bottom' as const,

        },
        title: {
          display: true,
          text: '',
        },
      },
  };
  return options
}

export {
  config
}
