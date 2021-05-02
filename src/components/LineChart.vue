<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: () => {return {}}
    },
  },
  data() {
    return {
      options: {
        type: Object,
        default: {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: { display: true },
              }
            ],
          },
        },
      }
    }
  },
  watch: {
    'chartdata' () {
      this.renderChart(this.chartdata, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
