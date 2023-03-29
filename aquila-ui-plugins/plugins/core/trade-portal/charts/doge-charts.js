import { LitElement, html, css } from 'lit'
import { render } from 'lit/html.js'
import { Epml } from '../../../../epml.js'
import { use, get, translate, translateUnsafeHTML, registerTranslateConfig } from 'lit-translate'

registerTranslateConfig({
	loader: lang => fetch(`/language/${lang}.json`).then(res => res.json())
})

import '@polymer/paper-dialog/paper-dialog.js'
import * as Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)
import StockChart from 'highcharts/modules/stock'
StockChart(Highcharts)
import 'highcharts/highcharts-more.js'
import 'highcharts/modules/accessibility.js'
import 'highcharts/modules/boost.js'
import 'highcharts/modules/data.js'
import 'highcharts/modules/export-data.js'
import 'highcharts/modules/offline-exporting.js'

let dogeChartDialog

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class DogeCharts extends LitElement {
	static get properties() {
		return {
			isLoadingTradesChart: { type: Boolean },
			dogeTrades: { type: Array },
			dogePrice: { type: Array }
		}
	}

	static get styles() {
		return css`
			.loadingContainer {
				height: 100%;
				width: 100%;
			}

			.trades-chart {
				color: var(--black);
				background: var(--white);
				border: 1px solid var(--black);
				border-radius: 25px;
				padding: 15px;
			}

			.chart-container {
				margin: auto;
				color: var(--black);
				text-align: center;
				padding: 15px;
				height: 30vh;
				width: 80vw;
			}

			.chart-info-wrapper {
				background: transparent;
				height: 38vh;
				width: 83vw;
				overflow: auto;
			}

			.chart-loading-wrapper {
				color: var(--black);
				background: var(--white);
				border: 1px solid var(--black);
				border-radius: 15px;
			}
		`
	}

	constructor() {
		super()
		this.theme = localStorage.getItem('aquilaTheme') ? localStorage.getItem('aquilaTheme') : 'light'
		this.isLoadingTradesChart = false
		this.dogeTrades = []
		this.dogePrice = []
	}

	render() {
		return html`
			<paper-dialog id="loadChartDialog" class="chart-loading-wrapper" modal>
				<div class="loadingContainer" style="display:${this.isLoadingTradesChart ? 'inline-block' : 'none'}">
					<span style="color: var(--black);">${translate("login.loading")}</span>
				</div>
			</paper-dialog>
			<paper-dialog id="dogeChartDialog" class="chart-info-wrapper">
				<div class="chart-container">
					<div id='dogeStockPriceContainer' class='trades-chart'></div>
				</div>
			</paper-dialog>
		`
	}

	async firstUpdated() {
		this.changeTheme()
		this.changeLanguage()

		window.addEventListener('storage', () => {
			const checkLanguage = localStorage.getItem('aquilaLanguage')
			const checkTheme = localStorage.getItem('aquilaTheme')

			use(checkLanguage)

			this.theme = (checkTheme === 'dark') ? 'dark' : 'light'
			document.querySelector('html').setAttribute('theme', this.theme)
		})
	}

	async loadTradesChart() {
		this.isLoadingTradesChart = true
		this.shadowRoot.getElementById('loadChartDialog').open()
		await this.getDogeTrades()
		this.isLoadingTradesChart = false
		this.shadowRoot.getElementById('loadChartDialog').close()
		this.enableDogeStockPriceChart()
	}

	async getDogeTrades() {
		let currentDogeTimestamp = Date.now()
		const monthBackDoge = currentDogeTimestamp - 31556952000
           	await parentEpml.request("apiCall", { url: `/crosschain/trades?foreignBlockchain=DOGECOIN&minimumTimestamp=${monthBackDoge}&limit=0&reverse=false` }).then((res) => {
			this.dogeTrades = res
		})
		this.dogePrice = this.dogeTrades.map(item => {
			const dogeSellPrice = this.round(parseFloat(item.foreignAmount) / parseFloat(item.unciaAmount))
			return [item.tradeTimestamp, parseFloat(dogeSellPrice)]
		}).filter(item => !!item)
	}

	enableDogeStockPriceChart() {
            const dogeStockPriceData = this.dogePrice
            const header = 'UNCIA / DOGE ' + get("tradepage.tchange49")
		Highcharts.stockChart(this.shadowRoot.querySelector('#dogeStockPriceContainer'), {
			accessibility: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			rangeSelector: {
				selected: 1,
				labelStyle: {color: 'var(--black)'},
				inputStyle: {color: '#03a9f4'}
			},
			chart: {
				backgroundColor: 'transparent'
			},
			title: {
				text: header,
				style: {color: 'var(--black)'}
			},
			xAxis: {
				labels: {
					style: {
						color: '#03a9f4'
					}
				}
			},
			yAxis: {
				labels: {
					style: {
						color: '#03a9f4'
					}
				}
			},
			series: [{
				name: 'UNCIA / DOGE',
				data: dogeStockPriceData,
				tooltip: {
					valueDecimals: 8
				}
			}]
		})
	}

	async open() {
		await this.loadTradesChart()
		this.shadowRoot.getElementById('dogeChartDialog').open()
	}

	changeTheme() {
		const checkTheme = localStorage.getItem('aquilaTheme')
		this.theme = (checkTheme === 'dark') ? 'dark' : 'light'
		document.querySelector('html').setAttribute('theme', this.theme);
	}

	changeLanguage() {
		const checkLanguage = localStorage.getItem('aquilaLanguage')

		if (checkLanguage === null || checkLanguage.length === 0) {
			localStorage.setItem('aquilaLanguage', 'us')
			use('us')
		} else {
			use(checkLanguage)
		}
	}

	round(number) {
		let result = (Math.round(parseFloat(number) * 1e8) / 1e8).toFixed(8)
		return result
	}
}

window.customElements.define('doge-charts', DogeCharts)

const chartsdoge = document.createElement('doge-charts')
dogeChartDialog = document.body.appendChild(chartsdoge)

export default dogeChartDialog