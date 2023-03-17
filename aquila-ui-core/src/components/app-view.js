import { LitElement, html, css } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../store.js'
import { Epml } from '../epml.js'
import { addTradeBotRoutes } from '../tradebot/addTradeBotRoutes.js'
import { get, translate, translateUnsafeHTML } from 'lit-translate'
import localForage from "localforage";

const chatLastSeen = localForage.createInstance({
    name: "chat-last-seen",
});

import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/paper-progress/paper-progress.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/app-layout/app-layout.js'
import '@polymer/paper-ripple'
import '@vaadin/button'
import '@vaadin/icon'
import '@vaadin/icons'
import '@vaadin/text-field'
import '@vaadin/tooltip'

import './wallet-profile.js'
import './app-info.js'
import './show-plugin.js'
import './uncia-theme-toggle.js'
import './language-selector.js'
import './settings-view/user-settings.js'
import './logout-view/logout-view.js'
import './user-info-view/user-info-view.js'
import '../functional-components/side-menu.js'
import '../functional-components/side-menu-item.js'
import './start-minting.js'
import { setChatLastSeen } from '../redux/app/app-actions.js'

const parentEpml = new Epml({type: 'WINDOW', source: window.parent})

class AppView extends connect(store)(LitElement) {
    static get properties() {
        return {
            config: { type: Object },
            urls: { type: Object },
            nodeType: { type: String, reflect: true },
            theme: { type: String, reflect: true },
            addressInfo: { type: Object },
            searchContentString: { type: String },
            getAllBalancesLoading: { type: Boolean },
            botUnciaWallet: { type: String },
            botBtcWallet: { type: String },
            botLtcWallet: { type: String },
            botDogeWallet: { type: String },
            botDgbWallet: { type: String },
            botRvnWallet: { type: String },
            botArrrWallet: { type: String },
            arrrWalletAddress: { type: String },
            unciaWalletBalance: { type: Number },
            btcWalletBalance: { type: Number },
            ltcWalletBalance: { type: Number },
            dogeWalletBalance: { type: Number },
            dgbWalletBalance: { type: Number },
            rvnWalletBalance: { type: Number },
            arrrWalletBalance: { type: Number },
            tradesOpenBtcAquila: { type: Array },
            tradesOpenLtcAquila: { type: Array },
            tradesOpenDogeAquila: { type: Array },
            tradesOpenDgbAquila: { type: Array },
            tradesOpenRvnAquila: { type: Array },
            tradesOpenArrrAquila: { type: Array },
            tradeBotBtcBook: { type: Array },
            tradeBotLtcBook: { type: Array },
            tradeBotDogeBook: { type: Array },
            tradeBotDgbBook: { type: Array },
            tradeBotRvnBook: { type: Array },
            tradeBotArrrBook: { type: Array },
            tradeBotBtcAt: { type: Array },
            tradeBotLtcAt: { type: Array },
            tradeBotDogeAt: { type: Array },
            tradeBotDgbAt: { type: Array },
            tradeBotRvnAt: { type: Array },
            tradeBotArrrAt: { type: Array },
            tradeBotAvailableBtcAquila: { type: Array },
            tradeBotAvailableLtcAquila: { type: Array },
            tradeBotAvailableDogeAquila: { type: Array },
            tradeBotAvailableDgbAquila: { type: Array },
            tradeBotAvailableRvnAquila: { type: Array },
            tradeBotAvailableArrrAquila: { type: Array },
            checkBtcAlice: { type: String },
            checkLtcAlice: { type: String },
            checkDogeAlice: { type: String },
            checkDgbAlice: { type: String },
            checkRvnAlice: { type: String },
            checkArrrAlice: { type: String },
            reAddBtcAmount: { type: Number },
            reAddLtcAmount: { type: Number },
            reAddDogeAmount: { type: Number },
            reAddDgbAmount: { type: Number },
            reAddRvnAmount: { type: Number },
            reAddArrrAmount: { type: Number },
            reAddBtcPrice: { type: Number },
            reAddLtcPrice: { type: Number },
            reAddDogePrice: { type: Number },
            reAddDgbPrice: { type: Number },
            reAddRvnPrice: { type: Number },
            reAddArrrPrice: { type: Number },
            botBtcBuyAtAddress: { type: String },
            botLtcBuyAtAddress: { type: String },
            botDogeBuyAtAddress: { type: String },
            botDgbBuyAtAddress: { type: String },
            botRvnBuyAtAddress: { type: String },
            botArrrBuyAtAddress: { type: String },
            balanceTicker: { type: String }
        }
    }

    static get styles() {
        return [
            css`
                * {
		        --mdc-theme-primary: rgb(3, 169, 244);
		        --mdc-theme-secondary: var(--mdc-theme-primary);
		        --mdc-theme-error: rgb(255, 89, 89);
                    --lumo-primary-text-color: rgb(0, 167, 245);
                    --lumo-primary-color-50pct: rgba(0, 167, 245, 0.5);
                    --lumo-primary-color-10pct: rgba(0, 167, 245, 0.1);
                    --lumo-primary-color: hsl(199, 100%, 48%);
                    --lumo-base-color: var(--white);
                    --lumo-body-text-color: var(--black);
                    --lumo-secondary-text-color: var(--sectxt);
                    --lumo-contrast-60pct: var(--vdicon);
                    --item-selected-color: var(--nav-selected-color);
                    --item-selected-color-text: var(--nav-selected-color-text);
                    --item-color-active: var(--nav-color-active);
                    --item-color-hover: var(--nav-color-hover);
                    --item-text-color: var(--nav-text-color);
                    --item-icon-color: var(--nav-icon-color);
                    --item-border-color: var(--nav-border-color);
                    --item-border-selected-color: var(--nav-border-selected-color);
                }

                :host {
                    --app-drawer-width: 260px;
                }

                app-drawer-layout:not([narrow]) [drawer-toggle]:not(side-menu-item) {
                    display: none;
                }

                app-drawer {
                    box-shadow: var(--shadow-2);
                }

                app-header {
                    box-shadow: var(--shadow-2);
                }

                app-toolbar {
                    background: var(--sidetopbar);
                    color: var(--black);
                    border-top: var(--border);
                    height: 48px;
                    padding: 3px;
                }

                paper-progress {
                    --paper-progress-active-color: var(--mdc-theme-primary);
                }

                .s-menu {
                    list-style: none;
                    padding: 0px 0px;
                    background: var(--sidetopbar);
                    border-radius: 2px;
                    width: 100%;
                    border-top: 1px solid var(--border);
                    outline: none;
                }

                .search {
                    display: inline;
                    width: 50%;
                    align-items: center;
                }

                #sideBar {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: var(--sidetopbar);
                }

                .sideBarMenu {
                    overflow-y: auto;
                    flex: 1 1;
                }

                .sideBarMenu::-webkit-scrollbar-track {
                    background-color: whitesmoke;
                    border-radius: 7px;
                }
        
                .sideBarMenu::-webkit-scrollbar {
                    width: 6px;
                    border-radius: 7px;
                    background-color: whitesmoke;
                }
        
                .sideBarMenu::-webkit-scrollbar-thumb {
                    background-color: rgb(180, 176, 176);
                    border-radius: 7px;
                    transition: all 0.3s ease-in-out;
                }

                #balanceheader {
                    flex: 0 0 24px;
                    padding: 12px 12px 45px 12px;
                    border-bottom: 1px solid var(--border);
                    background: var(--sidetopbar);
                }

                .balanceheadertext {
                    position: absolute;
                    margin: auto;
                    font-size: 14px;
                    font-weight: 400;
                    width: 250px;
                    display: inline;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    color: var(--nav-text-color);
                }

                #balances {
                    flex: 0 0 24px;
                    padding: 12px;
                    background: var(--sidetopbar);
                }

                .balancelist {
                   align-items: center;
                   float: left;
                   opacity: 1;
                   position: relative;
                }

                .balanceinfo {
                    position: absolute;
                    margin: auto;
                    font-size: 14px;
                    font-weight: 100;
                    width: 250px;
                    display: inline;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    color: var(--black);
                }

                .uncia {
                    animation: animate1 4s 2s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .btc {
                    animation: animate2 4s 8s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .ltc {
                    animation: animate3 4s 14s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .doge {
                    animation: animate4 4s 20s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .dgb {
                    animation: animate5 4s 26s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .rvn {
                    animation: animate6 4s 32s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                .arrr {
                    animation: animate7 4s 38s 1 ease-in-out ;
                    color: var(--black);
                    opacity: 0;
                }

                @keyframes animate1 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate2 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate3 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate4 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate5 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate6 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }

                @keyframes animate7 {
                    0%,100% { opacity: 0; }
                    50% { opacity: 10; }
                }
        
                .sideBarMenu::-webkit-scrollbar-thumb:hover {
                    background-color: rgb(148, 146, 146);
                    cursor: pointer;
                }

                .balanceButton {
                    background-color: #03a9f4;
                    color: #ffffff;
                    margin-left: 12px;
                    margin-right: 12px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
            `
        ]
    }

    constructor() {
        super()
        this.theme = localStorage.getItem('aquilaTheme') ? localStorage.getItem('aquilaTheme') : 'light'
        this.searchContentString = ''
        this.urls = [];
        this.nodeType = ''
        this.addressInfo = {}
        this.getAllBalancesLoading = false
        this.botUnciaWallet = ''
        this.botBtcWallet = ''
        this.botLtcWallet = ''
        this.botDogeWallet = ''
        this.botDgbWallet = ''
        this.botRvnWallet = ''
        this.botArrrWallet = ''
        this.arrrWalletAddress = ''
        this.unciaWalletBalance = 0
        this.btcWalletBalance = 0
        this.ltcWalletBalance = 0
        this.dogeWalletBalance = 0
        this.dgbWalletBalance = 0
        this.rvnWalletBalance = 0
        this.arrrWalletBalance = 0
        this.tradesOpenBtcAquila = []
        this.tradesOpenLtcAquila = []
        this.tradesOpenDogeAquila = []
        this.tradesOpenDgbAquila = []
        this.tradesOpenRvnAquila = []
        this.tradesOpenArrrAquila = []
        this.tradeBotBtcBook = []
        this.tradeBotLtcBook = []
        this.tradeBotDogeBook = []
        this.tradeBotDgbBook = []
        this.tradeBotRvnBook = []
        this.tradeBotArrrBook = []
        this.tradeBotBtcAt = []
        this.tradeBotLtcAt = []
        this.tradeBotDogeAt = []
        this.tradeBotDgbAt = []
        this.tradeBotRvnAt = []
        this.tradeBotArrrAt = []
        this.tradeBotAvailableBtcAquila = []
        this.tradeBotAvailableLtcAquila = []
        this.tradeBotAvailableDogeAquila = []
        this.tradeBotAvailableDgbAquila = []
        this.tradeBotAvailableRvnAquila = []
        this.tradeBotAvailableArrrAquila = []
        this.checkBtcAlice = ''
        this.checkLtcAlice = ''
        this.checkDogeAlice = ''
        this.checkDgbAlice = ''
        this.checkRvnAlice = ''
        this.checkArrrAlice = ''
        this.reAddBtcAmount = 0
        this.reAddLtcAmount = 0
        this.reAddDogeAmount = 0
        this.reAddDgbAmount = 0
        this.reAddRvnAmount = 0
        this.reAddArrrAmount = 0
        this.reAddBtcPrice = 0
        this.reAddLtcPrice = 0
        this.reAddDogePrice = 0
        this.reAddDgbPrice = 0
        this.reAddRvnPrice = 0
        this.reAddArrrPrice = 0
        this.botBtcBuyAtAddress = ''
        this.botLtcBuyAtAddress = ''
        this.botDogeBuyAtAddress = ''
        this.botDgbBuyAtAddress = ''
        this.botRvnBuyAtAddress = ''
        this.botArrrBuyAtAddress = ''
        this.balanceTicker = html`
            <div id="balances">
                <div class="balancelist"></div>
            </div>
        `
    }

    render() {
        return html`
            <app-drawer-layout responsive-width='${getComputedStyle(document.body).getPropertyValue('--layout-breakpoint-laptop')}' fullbleed>
                <app-drawer swipe-open slot="drawer" id="appdrawer">
                    <app-header-layout>
                        <div id="sideBar">
                            <wallet-profile></wallet-profile>
                            <div class="sideBarMenu">
                                <div class="s-menu">
                                    <side-menu>
                                        ${this.renderNodeTypeMenu()}
                                    </side-menu>
                                </div>
                            </div>
                            <button class="balanceButton" @click="${() => this.shBalanceTicker()}">${translate("grouppage.gchange59")}</button>
                            <div id="theTicker" style="display: none; margin-bottom: 20px;">
                            <div id="balanceheader">
                                <span class="balanceheadertext">
                                    ${this.getAllBalancesLoading ? html`
                                        ${translate("general.update")}
                                    ` : html`
                                        ${translate("general.balances")}
                                        <vaadin-button theme="icon" id="reload" @click="${() => this.getAllBalances()}">
                                             <vaadin-icon icon="vaadin:refresh"></vaadin-icon>
                                        </vaadin-button>
                                        <vaadin-tooltip text="${translate("general.update")}" for="reload" position="top"></vaadin-tooltip>
                                    `}
                                </span>
                            </div>
                            ${this.getAllBalancesLoading ? html`<paper-progress indeterminate style="width: 100%; margin: 4px;"></paper-progress>` : ''}
                            ${this.balanceTicker}
                            </div>
                            <app-info></app-info>
                        </div>
                    </app-header-layout>
                </app-drawer>
                <app-header-layout style="height: var(--window-height);">
                    <app-header id='appHeader' slot="header" fixed>
                        <app-toolbar>
                            <paper-icon-button class="menu-toggle-button" drawer-toggle icon="menu"></paper-icon-button>
                            <div main-title>
                                <span class="qora-title">
                                    <img src="${this.config.coin.logo}" style="height:32px; padding-left:12px;">
                                </span>
                            </div>
                            <div style="display: inline;">
	                          <div class="search">
	                              <vaadin-text-field
                                        style="width: 350px"
                                        theme="medium"
                                        id="searchContent"
                                        placeholder="${translate("explorerpage.exp1")}"
                                        value="${this.searchContentString}"
                                        @keydown="${this.searchKeyListener}"
                                        clear-button-visible
                                    >
                                    </vaadin-text-field>
	                              <paper-icon-button icon="icons:search" @click="${() => this.openUserInfo()}"></paper-icon-button>
	                          </div>
	                      </div>
                            <div>&nbsp;&nbsp;&nbsp;</div>
                            <div style="display: inline;">
                                <span>
                                    <img src="/img/${translate("selectmenu.languageflag")}-flag-round-icon-32.png" style="width: 32px; height: 32px; padding-top: 4px;">
                                </span>
                            </div>
                            <div>&nbsp;&nbsp;</div>
                            <language-selector></language-selector>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <uncia-theme-toggle></uncia-theme-toggle>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="display: inline;">
                                <paper-icon-button icon="icons:settings" @click=${() => this.openSettings()} title="${translate("settings.settings")}"></paper-icon-button>
                            </div>
                            <div>&nbsp;&nbsp;</div>
                            <div style="display: inline;">
                                <paper-icon-button icon="icons:exit-to-app" @click=${() => this.openLogout()} title="${translate("logout.logout")}"></paper-icon-button>
                            </div>
                            <div>&nbsp;&nbsp;</div>
                        </app-toolbar>
                    </app-header>
                    <show-plugin></show-plugin>
                </app-header-layout>
            </app-drawer-layout>
            <user-info-view></user-info-view>
            <user-settings></user-settings>
            <logout-view></logout-view>
        `
    }

    async firstUpdated() {

        addTradeBotRoutes(parentEpml)
        parentEpml.imReady()

        this.getNodeType()

        const myAppNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
        const nodeAppUrl = myAppNode.protocol + '://' + myAppNode.domain + ':' + myAppNode.port
        const appDelay = ms => new Promise(res => setTimeout(res, ms))

        await appDelay(3000)

        this.botUnciaWallet = store.getState().app.selectedAddress.address
        this.botBtcWallet = store.getState().app.selectedAddress.btcWallet.address
        this.botLtcWallet = store.getState().app.selectedAddress.ltcWallet.address
        this.botDogeWallet = store.getState().app.selectedAddress.dogeWallet.address
        this.botDgbWallet = store.getState().app.selectedAddress.dgbWallet.address
        this.botRvnWallet = store.getState().app.selectedAddress.rvnWallet.address
        this.botArrrWallet = store.getState().app.selectedAddress.arrrWallet.address

        await this.getAllBalances()

        await this.botBtcTradebook()
        await this.botLtcTradebook()
        await this.botDogeTradebook()
        await this.botDgbTradebook()
        await this.botRvnTradebook()
        await this.botArrrTradebook()

        window.addEventListener('storage', async () => {
            this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")
            this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")
            this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")
            this.tradeBotDgbBook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")
            this.tradeBotRvnBook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")
            this.tradeBotArrrBook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")
        })

        this.renderBalances()

        const getOpenTradesBTC = async () => {
            let timerBTC

            if (this.isEmptyArray(this.tradeBotBtcBook) === true) {
                clearTimeout(timerBTC)
                timerBTC = setTimeout(getOpenTradesBTC, 150000)
            } else {
                await this.updateBtcWalletBalance()
                const tradesOpenBtcAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=BITCOIN&limit=0`

                const tradesOpenBtcAquila = await fetch(tradesOpenBtcAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenBtcAquila = tradesOpenBtcAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesBTC()
                setTimeout(getOpenTradesBTC, 150000)
            }
        }

        const filterMyBotPriceTradesBTC = async () => {
            const tradeBotBtcUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=BITCOIN&apiKey=${this.getApiKey()}`

            const tradeBotBtcAt = await fetch(tradeBotBtcUrl).then(response => {
                return response.json()
            })

            this.tradeBotBtcAt = tradeBotBtcAt

            await appDelay(1000)

            this.tradeBotAvailableBtcAquila = this.tradesOpenBtcAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotBtcBook[0].botBtcPrice)
                const checkamount = parseFloat(this.tradeBotBtcBook[0].botBtcUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableBtcAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableBtcAquila) === true) {
                return
            } else {
                this.checkBtcAlice = this.tradeBotAvailableBtcAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotBtcAt.some(item => item.atAddress === this.checkBtcAlice)) {
                return
            } else {
                this.tradeBotAvailableBtcAquila = this.tradeBotAvailableBtcAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableBtcAquila) === true) {
                return
            } else {
                const botbtcprice = this.round(parseFloat(this.tradeBotBtcBook[0].botBtcPrice))
                const changebtcamount = parseFloat(this.tradeBotBtcBook[0].botBtcUnciaAmount)
                const reducebtcamount = parseFloat(this.tradeBotAvailableBtcAquila[0].unciaAmount)
                const tradebtcataddress = this.tradeBotAvailableBtcAquila[0].aquilaAtAddress
                const newbtcamount = this.round(parseFloat(changebtcamount - reducebtcamount))

                this.reAddBtcAmount = this.round(parseFloat(this.tradeBotBtcBook[0].botBtcUnciaAmount))
                this.reAddBtcPrice = this.round(parseFloat(this.tradeBotBtcBook[0].botBtcPrice))

                localStorage.removeItem(this.botBtcWallet)
                localStorage.setItem(this.botBtcWallet, "")

                var oldBtcTradebook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                const newBtcTradebookItem = {
                    botBtcUnciaAmount: newbtcamount,
                    botBtcPrice: botbtcprice
                }

                oldBtcTradebook.push(newBtcTradebookItem)

                localStorage.setItem(this.botBtcWallet, JSON.stringify(oldBtcTradebook))

                this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                this.botBtcBuyAtAddress = tradebtcataddress

                await appDelay(1000)

                this.buyBtcAction()

                if (this.isEmptyArray(this.tradeBotBtcBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotBtcBook[0].botBtcUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotBTCTradebook()
                    } else {
                        this.tradeBotBtcBook = this.tradeBotBtcBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotBtcBook) === true) {
                    return
                } else {
                    const checkBotBtcFunds = this.round(parseFloat(this.tradeBotBtcBook[0].botBtcUnciaAmount) * parseFloat(this.tradeBotBtcBook[0].botBtcPrice))
                    const myBotBtcFunds = this.round(parseFloat(this.btcWalletBalance))

                    if (Number(myBotBtcFunds) < Number(checkBotBtcFunds)) {
                        this.removeBotBTCTradebook()
                    } else {
                        this.tradeBotBtcBook = this.tradeBotBtcBook
                    }
                }
            }
        }

        const getOpenTradesLTC = async () => {
            let timerLTC

            if (this.isEmptyArray(this.tradeBotLtcBook) === true) {
                clearTimeout(timerLTC)
                timerLTC = setTimeout(getOpenTradesLTC, 150000)
            } else {
                await this.updateLtcWalletBalance()
                const tradesOpenLtcAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=LITECOIN&limit=0`

                const tradesOpenLtcAquila = await fetch(tradesOpenLtcAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenLtcAquila = tradesOpenLtcAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesLTC()
                setTimeout(getOpenTradesLTC, 150000)
            }
        }

        const filterMyBotPriceTradesLTC = async () => {
            const tradeBotLtcUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=LITECOIN&apiKey=${this.getApiKey()}`

            const tradeBotLtcAt = await fetch(tradeBotLtcUrl).then(response => {
                return response.json()
            })

            this.tradeBotLtcAt = tradeBotLtcAt

            await appDelay(1000)

            this.tradeBotAvailableLtcAquila = this.tradesOpenLtcAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotLtcBook[0].botLtcPrice)
                const checkamount = parseFloat(this.tradeBotLtcBook[0].botLtcUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableLtcAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableLtcAquila) === true) {
                return
            } else {
                this.checkLtcAlice = this.tradeBotAvailableLtcAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotLtcAt.some(item => item.atAddress === this.checkLtcAlice)) {
                return
            } else {
                this.tradeBotAvailableLtcAquila = this.tradeBotAvailableLtcAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableLtcAquila) === true) {
                return
            } else {
                const botltcprice = this.round(parseFloat(this.tradeBotLtcBook[0].botLtcPrice))
                const changeltcamount = parseFloat(this.tradeBotLtcBook[0].botLtcUnciaAmount)
                const reduceltcamount = parseFloat(this.tradeBotAvailableLtcAquila[0].unciaAmount)
                const tradeltcataddress = this.tradeBotAvailableLtcAquila[0].aquilaAtAddress
                const newltcamount = this.round(parseFloat(changeltcamount - reduceltcamount))

                this.reAddLtcAmount = this.round(parseFloat(this.tradeBotLtcBook[0].botLtcUnciaAmount))
                this.reAddLtcPrice = this.round(parseFloat(this.tradeBotLtcBook[0].botLtcPrice))

                localStorage.removeItem(this.botLtcWallet)
                localStorage.setItem(this.botLtcWallet, "")

                var oldLtcTradebook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                const newLtcTradebookItem = {
                    botLtcUnciaAmount: newltcamount,
                    botLtcPrice: botltcprice
                }

                oldLtcTradebook.push(newLtcTradebookItem)

                localStorage.setItem(this.botLtcWallet, JSON.stringify(oldLtcTradebook))

                this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                this.botLtcBuyAtAddress = tradeltcataddress

                await appDelay(1000)

                this.buyLtcAction()

                if (this.isEmptyArray(this.tradeBotLtcBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotLtcBook[0].botLtcUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotLTCTradebook()
                    } else {
                        this.tradeBotLtcBook = this.tradeBotLtcBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotLtcBook) === true) {
                    return
                } else {
                    const checkBotLtcFunds = this.round(parseFloat(this.tradeBotLtcBook[0].botLtcUnciaAmount) * parseFloat(this.tradeBotLtcBook[0].botLtcPrice))
                    const myBotLtcFunds = this.round(parseFloat(this.ltcWalletBalance))

                    if (Number(myBotLtcFunds) < Number(checkBotLtcFunds)) {
                        this.removeBotLTCTradebook()
                    } else {
                        this.tradeBotLtcBook = this.tradeBotLtcBook
                    }
                }
            }
        }

        const getOpenTradesDOGE = async () => {
            let timerDOGE

            if (this.isEmptyArray(this.tradeBotDogeBook) === true) {
                clearTimeout(timerDOGE)
                timerDOGE = setTimeout(getOpenTradesDOGE, 150000)
            } else {
                await this.updateDogeWalletBalance()
                const tradesOpenDogeAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=DOGECOIN&limit=0`

                const tradesOpenDogeAquila = await fetch(tradesOpenDogeAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenDogeAquila = tradesOpenDogeAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesDOGE()
                setTimeout(getOpenTradesDOGE, 150000)
            }
        }

        const filterMyBotPriceTradesDOGE = async () => {
            const tradeBotDogeUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=DOGECOIN&apiKey=${this.getApiKey()}`

            const tradeBotDogeAt = await fetch(tradeBotDogeUrl).then(response => {
                return response.json()
            })

            this.tradeBotDogeAt = tradeBotDogeAt

            await appDelay(1000)

            this.tradeBotAvailableDogeAquila = this.tradesOpenDogeAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotDogeBook[0].botDogePrice)
                const checkamount = parseFloat(this.tradeBotDogeBook[0].botDogeUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableDogeAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableDogeAquila) === true) {
                return
            } else {
                this.checkDogeAlice = this.tradeBotAvailableDogeAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotDogeAt.some(item => item.atAddress === this.checkDogeAlice)) {
                return
            } else {
                this.tradeBotAvailableDogeAquila = this.tradeBotAvailableDogeAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableDogeAquila) === true) {
                return
            } else {
                const botdogeprice = this.round(parseFloat(this.tradeBotDogeBook[0].botDogePrice))
                const changedogeamount = parseFloat(this.tradeBotDogeBook[0].botDogeUnciaAmount)
                const reducedogeamount = parseFloat(this.tradeBotAvailableDogeAquila[0].unciaAmount)
                const tradedogeataddress = this.tradeBotAvailableDogeAquila[0].aquilaAtAddress
                const newdogeamount = this.round(parseFloat(changedogeamount - reducedogeamount))

                this.reAddDogeAmount = this.round(parseFloat(this.tradeBotDogeBook[0].botDogeUnciaAmount))
                this.reAddDogePrice = this.round(parseFloat(this.tradeBotDogeBook[0].botDogePrice))

                localStorage.removeItem(this.botDogeWallet)
                localStorage.setItem(this.botDogeWallet, "")

                var oldDogeTradebook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                const newDogeTradebookItem = {
                    botDogeUnciaAmount: newdogeamount,
                    botDogePrice: botdogeprice
                }

                oldDogeTradebook.push(newDogeTradebookItem)

                localStorage.setItem(this.botDogeWallet, JSON.stringify(oldDogeTradebook))

                this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                this.botDogeBuyAtAddress = tradedogeataddress

                await appDelay(1000)

                this.buyDogeAction()

                if (this.isEmptyArray(this.tradeBotDogeBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotDogeBook[0].botDogeUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotDOGETradebook()
                    } else {
                        this.tradeBotDogeBook = this.tradeBotDogeBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotDogeBook) === true) {
                    return
                } else {
                    const checkBotDogeFunds = this.round(parseFloat(this.tradeBotDogeBook[0].botDogeUnciaAmount) * parseFloat(this.tradeBotDogeBook[0].botDogePrice))
                    const myBotDogeFunds = this.round(parseFloat(this.dogeWalletBalance))

                    if (Number(myBotDogeFunds) < Number(checkBotDogeFunds)) {
                        this.removeBotDOGETradebook()
                    } else {
                        this.tradeBotDogeBook = this.tradeBotDogeBook
                    }
                }
            }
        }

        const getOpenTradesDGB = async () => {
            let timerDGB

            if (this.isEmptyArray(this.tradeBotDgbBook) === true) {
                clearTimeout(timerDGB)
                timerDGB = setTimeout(getOpenTradesDGB, 150000)
            } else {
                await this.updateDgbWalletBalance()
                const tradesOpenDgbAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=DIGIYBYTE&limit=0`

                const tradesOpenDgbAquila = await fetch(tradesOpenDgbAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenDgbAquila = tradesOpenDgbAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesDGB()
                setTimeout(getOpenTradesDGB, 150000)
            }
        }

        const filterMyBotPriceTradesDGB = async () => {
            const tradeBotDgbUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=DIGIBYTE&apiKey=${this.getApiKey()}`

            const tradeBotDgbAt = await fetch(tradeBotDgbUrl).then(response => {
                return response.json()
            })

            this.tradeBotDgbAt = tradeBotDgbAt

            await appDelay(1000)

            this.tradeBotAvailableDgbAquila = this.tradesOpenDgbAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotDgbBook[0].botDgbPrice)
                const checkamount = parseFloat(this.tradeBotDgbBook[0].botDgbUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableDgbAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableDgbAquila) === true) {
                return
            } else {
                this.checkDgbAlice = this.tradeBotAvailableDgbAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotDgbAt.some(item => item.atAddress === this.checkDgbAlice)) {
                return
            } else {
                this.tradeBotAvailableDgbAquila = this.tradeBotAvailableDgbAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableDgbAquila) === true) {
                return
            } else {
                const botdgbprice = this.round(parseFloat(this.tradeBotDgbBook[0].botDgbPrice))
                const changedgbamount = parseFloat(this.tradeBotDgbBook[0].botDgbUnciaAmount)
                const reducedgbamount = parseFloat(this.tradeBotAvailableDgbAquila[0].unciaAmount)
                const tradedgbataddress = this.tradeBotAvailableDgbAquila[0].aquilaAtAddress
                const newdgbamount = this.round(parseFloat(changedgbamount - reducedgbamount))

                this.reAddDgbAmount = this.round(parseFloat(this.tradeBotDgbBook[0].botDgbUnciaAmount))
                this.reAddDgbPrice = this.round(parseFloat(this.tradeBotDgbBook[0].botDgbPrice))

                localStorage.removeItem(this.botDgbWallet)
                localStorage.setItem(this.botDgbWallet, "")

                var oldDgbTradebook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                const newDgbTradebookItem = {
                    botDgbUnciaAmount: newdgbamount,
                    botDgbPrice: botdgbprice
                }

                oldDgbTradebook.push(newDgbTradebookItem)

                localStorage.setItem(this.botDgbWallet, JSON.stringify(oldDgbTradebook))

                this.tradeBotDgbBook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                this.botDgbBuyAtAddress = tradedgbataddress

                await appDelay(1000)

                this.buyDgbAction()

                if (this.isEmptyArray(this.tradeBotDgbBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotDgbBook[0].botDgbUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotDGBTradebook()
                    } else {
                        this.tradeBotDgbBook = this.tradeBotDgbBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotDgbBook) === true) {
                    return
                } else {
                    const checkBotDgbFunds = this.round(parseFloat(this.tradeBotDgbBook[0].botDgbUnciaAmount) * parseFloat(this.tradeBotDgbBook[0].botDgbPrice))
                    const myBotDgbFunds = this.round(parseFloat(this.dgbWalletBalance))

                    if (Number(myBotDgbFunds) < Number(checkBotDgbFunds)) {
                        this.removeBotDGBTradebook()
                    } else {
                        this.tradeBotDgbBook = this.tradeBotDgbBook
                    }
                }
            }
        }

        const getOpenTradesRVN = async () => {
            let timerRVN

            if (this.isEmptyArray(this.tradeBotRvnBook) === true) {
                clearTimeout(timerRVN)
                timerRVN = setTimeout(getOpenTradesRVN, 150000)
            } else {
                await this.updateRvnWalletBalance()
                const tradesOpenRvnAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=RAVENCOIN&limit=0`

                const tradesOpenRvnAquila = await fetch(tradesOpenRvnAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenRvnAquila = tradesOpenRvnAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesRVN()
                setTimeout(getOpenTradesRVN, 150000)
            }
        }

        const filterMyBotPriceTradesRVN = async () => {
            const tradeBotRvnUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=RAVENCOIN&apiKey=${this.getApiKey()}`

            const tradeBotRvnAt = await fetch(tradeBotRvnUrl).then(response => {
                return response.json()
            })

            this.tradeBotRvnAt = tradeBotRvnAt

            await appDelay(1000)

            this.tradeBotAvailableRvnAquila = this.tradesOpenRvnAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotRvnBook[0].botRvnPrice)
                const checkamount = parseFloat(this.tradeBotRvnBook[0].botRvnUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableRvnAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableRvnAquila) === true) {
                return
            } else {
                this.checkRvnAlice = this.tradeBotAvailableRvnAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotRvnAt.some(item => item.atAddress === this.checkRvnAlice)) {
                return
            } else {
                this.tradeBotAvailableRvnAquila = this.tradeBotAvailableRvnAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableRvnAquila) === true) {
                return
            } else {
                const botrvnprice = this.round(parseFloat(this.tradeBotRvnBook[0].botRvnPrice))
                const changervnamount = parseFloat(this.tradeBotRvnBook[0].botRvnUnciaAmount)
                const reducervnamount = parseFloat(this.tradeBotAvailableRvnAquila[0].unciaAmount)
                const tradervnataddress = this.tradeBotAvailableRvnAquila[0].aquilaAtAddress
                const newrvnamount = this.round(parseFloat(changervnamount - reducervnamount))

                this.reAddRvnAmount = this.round(parseFloat(this.tradeBotRvnBook[0].botRvnUnciaAmount))
                this.reAddRvnPrice = this.round(parseFloat(this.tradeBotRvnBook[0].botRvnPrice))

                localStorage.removeItem(this.botRvnWallet)
                localStorage.setItem(this.botRvnWallet, "")

                var oldRvnTradebook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                const newRvnTradebookItem = {
                    botRvnUnciaAmount: newrvnamount,
                    botRvnPrice: botrvnprice
                }

                oldRvnTradebook.push(newRvnTradebookItem)

                localStorage.setItem(this.botRvnWallet, JSON.stringify(oldRvnTradebook))

                this.tradeBotRvnBook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                this.botRvnBuyAtAddress = tradervnataddress

                await appDelay(1000)

                this.buyRvnAction()

                if (this.isEmptyArray(this.tradeBotRvnBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotRvnBook[0].botRvnUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotRVNTradebook()
                    } else {
                        this.tradeBotRvnBook = this.tradeBotRvnBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotRvnBook) === true) {
                    return
                } else {
                    const checkBotRvnFunds = this.round(parseFloat(this.tradeBotRvnBook[0].botRvnUnciaAmount) * parseFloat(this.tradeBotRvnBook[0].botRvnPrice))
                    const myBotRvnFunds = this.round(parseFloat(this.rvnWalletBalance))

                    if (Number(myBotRvnFunds) < Number(checkBotRvnFunds)) {
                        this.removeBotRVNTradebook()
                    } else {
                        this.tradeBotRvnBook = this.tradeBotRvnBook
                    }
                }
            }
        }

        const getOpenTradesARRR = async () => {
            let timerARRR

            if (this.isEmptyArray(this.tradeBotArrrBook) === true) {
                clearTimeout(timerARRR)
                timerARRR = setTimeout(getOpenTradesARRR, 150000)
            } else {
                await this.updateArrrWalletBalance()
                const tradesOpenArrrAquilaUrl = `${nodeAppUrl}/crosschain/tradeoffers?foreignBlockchain=PIRATECHAIN&limit=0`

                const tradesOpenArrrAquila = await fetch(tradesOpenArrrAquilaUrl).then(response => {
                    return response.json()
                })

                this.tradesOpenArrrAquila = tradesOpenArrrAquila.map(item => {
                    const expiryTime = item.creatorPresenceExpiry
                    if (Number(expiryTime) > Date.now()) {
                        const calcedPrice = parseFloat(item.expectedForeignAmount) / parseFloat(item.unciaAmount)
                        const roundedPrice = (Math.round(parseFloat(calcedPrice) * 1e8) / 1e8).toFixed(8)
                        return {
                            unciaAmount: item.unciaAmount,
                            price: roundedPrice,
                            foreignAmount: item.expectedForeignAmount,
                            aquilaCreator: item.aquilaCreator,
                            aquilaAtAddress: item.aquilaAtAddress
                        }
                    }
                }).filter(item => !!item)

                await appDelay(1000)
                filterMyBotPriceTradesARRR()
                setTimeout(getOpenTradesARRR, 150000)
            }
        }

        const filterMyBotPriceTradesARRR = async () => {
            const tradeBotArrrUrl = `${nodeAppUrl}/crosschain/tradebot?foreignBlockchain=PIRATECHAIN&apiKey=${this.getApiKey()}`

            const tradeBotArrrAt = await fetch(tradeBotArrrUrl).then(response => {
                return response.json()
            })

            this.tradeBotArrrAt = tradeBotArrrAt

            await appDelay(1000)

            this.tradeBotAvailableArrrAquila = this.tradesOpenArrrAquila.map(item => {
                const listprice = parseFloat(item.price)
                const listamount = parseFloat(item.unciaAmount)
                const checkprice = parseFloat(this.tradeBotArrrBook[0].botArrrPrice)
                const checkamount = parseFloat(this.tradeBotArrrBook[0].botArrrUnciaAmount)
                if (Number(listprice) <= Number(checkprice) && Number(listamount) <= Number(checkamount)) {
                    return {
                        unciaAmount: item.unciaAmount,
                        price: item.price,
                        foreignAmount: item.foreignAmount,
                        aquilaCreator: item.aquilaCreator,
                        aquilaAtAddress: item.aquilaAtAddress
                    }
                }
            }).filter(item => !!item)

            this.tradeBotAvailableArrrAquila.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

            if (this.isEmptyArray(this.tradeBotAvailableArrrAquila) === true) {
                return
            } else {
                this.checkArrrAlice = this.tradeBotAvailableArrrAquila[0].aquilaAtAddress
            }

            await appDelay(1000)

            if (this.tradeBotArrrAt.some(item => item.atAddress === this.checkArrrAlice)) {
                return
            } else {
                this.tradeBotAvailableArrrAquila = this.tradeBotAvailableArrrAquila
            }

            await appDelay(1000)

            if (this.isEmptyArray(this.tradeBotAvailableArrrAquila) === true) {
                return
            } else {
                const botarrrprice = this.round(parseFloat(this.tradeBotArrrBook[0].botArrrPrice))
                const changearrramount = parseFloat(this.tradeBotArrrBook[0].botArrrUnciaAmount)
                const reducearrramount = parseFloat(this.tradeBotAvailableArrrAquila[0].unciaAmount)
                const tradearrrataddress = this.tradeBotAvailableArrrAquila[0].aquilaAtAddress
                const newarrramount = this.round(parseFloat(changearrramount - reducearrramount))

                this.reAddArrrAmount = this.round(parseFloat(this.tradeBotArrrBook[0].botArrrUnciaAmount))
                this.reAddArrrPrice = this.round(parseFloat(this.tradeBotArrrBook[0].botArrrPrice))

                localStorage.removeItem(this.botArrrWallet)
                localStorage.setItem(this.botArrrWallet, "")

                var oldArrrTradebook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                const newArrrTradebookItem = {
                    botArrrUnciaAmount: newarrramount,
                    botArrrPrice: botarrrprice
                }

                oldArrrTradebook.push(newArrrTradebookItem)

                localStorage.setItem(this.botArrrWallet, JSON.stringify(oldArrrTradebook))

                this.tradeBotArrrBook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                this.botArrrBuyAtAddress = tradearrrataddress

                await appDelay(1000)

                this.buyArrrAction()

                if (this.isEmptyArray(this.tradeBotArrrBook) === true) {
                    return
                } else {
                    const botamount = parseFloat(this.tradeBotArrrBook[0].botArrrUnciaAmount)

                    if (Number(botamount) === 0) {
                        this.removeBotARRRTradebook()
                    } else {
                        this.tradeBotArrrBook = this.tradeBotArrrBook
                    }
                }

                if (this.isEmptyArray(this.tradeBotArrrBook) === true) {
                    return
                } else {
                    const checkBotArrrFunds = this.round(parseFloat(this.tradeBotArrrBook[0].botArrrUnciaAmount) * parseFloat(this.tradeBotArrrBook[0].botArrrPrice))
                    const myBotArrrFunds = this.round(parseFloat(this.arrrWalletBalance))

                    if (Number(myBotArrrFunds) < Number(checkBotArrrFunds)) {
                        this.removeBotARRRTradebook()
                    } else {
                        this.tradeBotArrrBook = this.tradeBotArrrBook
                    }
                }
            }
        }

       const getChatLastSeen=async() => {
            let items = [];
          
            await chatLastSeen.iterate(function(value, key, iterationNumber) {
               
                items.push({key, timestamp: value});
              })
              store.dispatch(setChatLastSeen(items))
            return items;
          }

        await getOpenTradesBTC()
        await appDelay(1000)
        await getOpenTradesLTC()
        await appDelay(1000)
        await getOpenTradesDOGE()
        await appDelay(1000)
        await getOpenTradesDGB()
        await appDelay(1000)
        await getOpenTradesRVN()
        await appDelay(1000)
        await getOpenTradesARRR()
        await getChatLastSeen()
    }

    shBalanceTicker() {
        const targetDiv = this.shadowRoot.getElementById("theTicker")
        if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
        } else {
            targetDiv.style.display = "inline";
        }
    }

    async getNodeType() {
        const myAppNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
        const nodeAppUrl = myAppNode.protocol + '://' + myAppNode.domain + ':' + myAppNode.port
        const url = `${nodeAppUrl}/admin/info`
        await fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            this.nodeType = data.type
        })
    }

    renderNodeTypeMenu() {
        const addressInfo = this.addressInfo
        const isMinter = addressInfo?.error !== 124 && +addressInfo?.level > 0
        const isSponsor = +addressInfo?.level >= 5

        if (this.nodeType === 'lite') {
            return html`
                <side-menu-item drawer-toggle label="${translate('sidemenu.wallets')}" href="/app/wallet" selected>
                    <vaadin-icon icon="vaadin:wallet" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.nameregistration')}" href="/app/name-registration">
                    <vaadin-icon icon="vaadin:user-check" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.datamanagement')}" href="/app/data-management">
                    <vaadin-icon icon="vaadin:database" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.qchat')}" href="/app/q-chat">
                    <vaadin-icon icon="vaadin:chat" slot="icon"></vaadin-icon>
                </side-menu-item>

                ${this.renderNodeManagement()}
            `
        } else {
            return html`
                <side-menu-item label="${translate('sidemenu.minting')}" expanded>
                    <vaadin-icon icon="vaadin:info-circle" slot="icon"></vaadin-icon>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.mintingdetails')}" href="/app/minting" ?hide=${!isMinter}>
                        <vaadin-icon icon="vaadin:info-circle" slot="icon"></vaadin-icon>
                    </side-menu-item>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.becomeAMinter')}" href="/app/become-minter" ?hide=${isMinter}>
                        <vaadin-icon icon="vaadin:thumbs-up" slot="icon"></vaadin-icon>
                    </side-menu-item>
				
                    <side-menu-item drawer-toggle label="${translate('mintingpage.mchange35')}" href="/app/sponsorship-list" ?hide=${!isSponsor}>
                        <vaadin-icon icon="vaadin:list-ol" slot="icon"></vaadin-icon>
                    </side-menu-item>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.wallets')}" href="/app/wallet" selected>
                    <vaadin-icon icon="vaadin:wallet" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item label="${translate('sidemenu.trading')}" expanded>
                    <vaadin-icon icon="vaadin:cash" slot="icon"></vaadin-icon>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.tradeportal')}" href="/app/trade-portal">
                        <vaadin-icon icon="vaadin:bullets" slot="icon"></vaadin-icon>
                    </side-menu-item>

                    <side-menu-item drawer-toggle label="${translate('tradepage.tchange46')}" href="/app/trade-bot-portal">
                        <vaadin-icon icon="vaadin:calc-book" slot="icon"></vaadin-icon>
                    </side-menu-item>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.rewardshare')}" href="/app/reward-share">
                    <vaadin-icon icon="vaadin:share-square" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.qchat')}" href="/app/q-chat">
                    <vaadin-icon icon="vaadin:chat" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item label="${translate('sidemenu.sm1')}" expanded>
                    <vaadin-icon icon="vaadin:user-card" slot="icon"></vaadin-icon>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.sm2')}" href="/app/name-registration">
                        <vaadin-icon icon="vaadin:user-check" slot="icon"></vaadin-icon>
                    </side-menu-item>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.sm3')}" href="/app/names-market">
                        <vaadin-icon icon="vaadin:shop" slot="icon"></vaadin-icon>
                    </side-menu-item>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.websites')}" href="/app/websites">
                    <vaadin-icon icon="vaadin:desktop" slot="icon" ></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.groups')}" href="/app/group-management">
                    <vaadin-icon icon="vaadin:group" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item drawer-toggle label="${translate('sidemenu.puzzles')}" href="/app/puzzles">
                    <vaadin-icon icon="vaadin:puzzle-piece" slot="icon"></vaadin-icon>
                </side-menu-item>

                <side-menu-item label="${translate('sidemenu.management')}" expanded>
                    <vaadin-icon icon="vaadin:cogs" slot="icon"></vaadin-icon>

                    <side-menu-item drawer-toggle label="${translate('sidemenu.datamanagement')}" href="/app/data-management">
                        <vaadin-icon icon="vaadin:database" slot="icon"></vaadin-icon>
                    </side-menu-item>

                    ${this.renderNodeManagement()}
                </side-menu-item>

                <div>
                    <start-minting></start-minting>
                </div>
            `
        }
    }

    renderNodeManagement() {
        const checkNodeManagement = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
        if ((checkNodeManagement.enableManagement = true)) {
            return html`
                <side-menu-item drawer-toggle label="${translate('sidemenu.nodemanagement')}" href="/app/node-management">
                    <vaadin-icon icon="vaadin:cloud" slot="icon"></vaadin-icon>
                </side-menu-item>
            `
        } else {
            return html``
        }
    }

    async getAllBalances() {
        this.getAllBalancesLoading = true
        await this.updateUnciaWalletBalance()
        await this.updateBtcWalletBalance()
        await this.updateLtcWalletBalance()
        await this.updateDogeWalletBalance()
        await this.updateDgbWalletBalance()
        await this.updateRvnWalletBalance()
        await this.fetchArrrWalletAddress()
        await this.updateArrrWalletBalance()
        this.getAllBalancesLoading = false
    }

    async renderBalances() {
        const tickerTime = ms => new Promise(res => setTimeout(res, ms))
        clearTimeout(this.updateBalancesTimeout)
        this.balanceTicker = html`
            <div id="balances">
                <div class="balancelist"></div>
            </div>
        `
        await tickerTime(1000)
        this.balanceTicker = html`
            <div id="balances">
                <div class="balancelist">
                    <span class="balanceinfo uncia">UNCIA ${translate("general.balance")}: ${this.unciaWalletBalance}</span>
                    <span class="balanceinfo btc">BTC ${translate("general.balance")}: ${this.btcWalletBalance}</span>
                    <span class="balanceinfo ltc">LTC ${translate("general.balance")}: ${this.ltcWalletBalance}</span>
                    <span class="balanceinfo doge">DOGE ${translate("general.balance")}: ${this.dogeWalletBalance}</span>
                    <span class="balanceinfo dgb">DGB ${translate("general.balance")}: ${this.dgbWalletBalance}</span>
                    <span class="balanceinfo rvn">RVN ${translate("general.balance")}: ${this.rvnWalletBalance}</span>
                    <span class="balanceinfo arrr">ARRR ${translate("general.balance")}: ${this.arrrWalletBalance}</span>
                </div>
            </div>
        `
        this.updateBalancesTimeout = setTimeout(() => this.renderBalances(), 45000)
    }

    async fetchArrrWalletAddress() {
        let res = await parentEpml.request('apiCall', {
            url: `/crosschain/arrr/walletaddress?apiKey=${this.getApiKey()}`,
            method: 'POST',
            body: `${store.getState().app.selectedAddress.arrrWallet.seed58}`,
        })
        if (res != null && res.error != 1201) {
            this.arrrWalletAddress = res
        }
    }

    async updateUnciaWalletBalance() {
        let unciaAddress = store.getState().app.selectedAddress.address

        await parentEpml.request('apiCall', {
            url: `/addresses/balance/${unciaAddress}?apiKey=${this.getApiKey()}`,
        }).then((res) => {
            this.unciaWalletBalance = res
        })
    }

    async updateBtcWalletBalance() {
        let _url = `/crosschain/btc/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.btcWallet.derivedMasterPublicKey

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.btcWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    async updateLtcWalletBalance() {
        let _url = `/crosschain/ltc/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.ltcWallet.derivedMasterPublicKey

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.ltcWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    async updateDogeWalletBalance() {
        let _url = `/crosschain/doge/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.dogeWallet.derivedMasterPublicKey

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.dogeWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    async updateDgbWalletBalance() {
        let _url = `/crosschain/dgb/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.dgbWallet.derivedMasterPublicKey

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.dgbWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    async updateRvnWalletBalance() {
        let _url = `/crosschain/rvn/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.rvnWallet.derivedMasterPublicKey

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.rvnWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    async updateArrrWalletBalance() {
        let _url = `/crosschain/arrr/walletbalance?apiKey=${this.getApiKey()}`
        let _body = store.getState().app.selectedAddress.arrrWallet.seed58

        await parentEpml.request('apiCall', {
            url: _url,
            method: 'POST',
            body: _body,
        }).then((res) => {
            if (isNaN(Number(res))) {
                //...
            } else {
                this.arrrWalletBalance = (Number(res) / 1e8).toFixed(8)
            }
        })
    }

    botBtcTradebook() {
        if (localStorage.getItem(this.botBtcWallet) === null) {
            localStorage.setItem(this.botBtcWallet, "")
        } else {
            this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")
        }
    }

    removeBotBTCTradebook() {
        localStorage.removeItem(this.botBtcWallet)
        localStorage.setItem(this.botBtcWallet, "")
        this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")
        this.tradeBotAvailableBtcAquila = []
    }

    botLtcTradebook() {
        if (localStorage.getItem(this.botLtcWallet) === null) {
            localStorage.setItem(this.botLtcWallet, "")
        } else {
            this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")
        }
    }

    removeBotLTCTradebook() {
        localStorage.removeItem(this.botLtcWallet)
        localStorage.setItem(this.botLtcWallet, "")
        this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")
        this.tradeBotAvailableLtcAquila = []
    }

    botDogeTradebook() {
        if (localStorage.getItem(this.botDogeWallet) === null) {
            localStorage.setItem(this.botDogeWallet, "")
        } else {
            this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")
        }
    }

    removeBotDOGETradebook() {
        localStorage.removeItem(this.botDogeWallet)
        localStorage.setItem(this.botDogeWallet, "")
        this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")
        this.tradeBotAvailableDogeAquila = []
    }

    botDgbTradebook() {
        if (localStorage.getItem(this.botDgbWallet) === null) {
            localStorage.setItem(this.botDgbWallet, "")
        } else {
            this.tradeBotDgbBook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")
        }
    }

    botRvnTradebook() {
        if (localStorage.getItem(this.botRvnWallet) === null) {
            localStorage.setItem(this.botRvnWallet, "")
        } else {
            this.tradeBotRvnBook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")
        }
    }

    botArrrTradebook() {
        if (localStorage.getItem(this.botArrrWallet) === null) {
            localStorage.setItem(this.botArrrWallet, "")
        } else {
            this.tradeBotArrrBook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")
        }
    }

    async buyBtcAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botBtcBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.btcWallet.derivedMasterPrivateKey,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botBtcWallet)
                localStorage.setItem(this.botBtcWallet, "")

                var oldBtcTradebook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                const newBtcTradebookItem = {
                    botBtcUnciaAmount: this.reAddBtcAmount,
                    botBtcPrice: this.reAddBtcPrice
                }

                oldBtcTradebook.push(newBtcTradebookItem)

                localStorage.setItem(this.botBtcWallet, JSON.stringify(oldBtcTradebook))

                this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botBtcWallet)
                localStorage.setItem(this.botBtcWallet, "")

                var oldBtcTradebook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                const newBtcTradebookItem = {
                    botBtcUnciaAmount: this.reAddBtcAmount,
                    botBtcPrice: this.reAddBtcPrice
                }

                oldBtcTradebook.push(newBtcTradebookItem)

                localStorage.setItem(this.botBtcWallet, JSON.stringify(oldBtcTradebook))

                this.tradeBotBtcBook = JSON.parse(localStorage.getItem(this.botBtcWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    async buyLtcAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botLtcBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.ltcWallet.derivedMasterPrivateKey,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botLtcWallet)
                localStorage.setItem(this.botLtcWallet, "")

                var oldLtcTradebook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                const newLtcTradebookItem = {
                    botLtcUnciaAmount: this.reAddLtcAmount,
                    botLtcPrice: this.reAddLtcPrice
                }

                oldLtcTradebook.push(newLtcTradebookItem)

                localStorage.setItem(this.botLtcWallet, JSON.stringify(oldLtcTradebook))

                this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botLtcWallet)
                localStorage.setItem(this.botLtcWallet, "")

                var oldLtcTradebook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                const newLtcTradebookItem = {
                    botLtcUnciaAmount: this.reAddLtcAmount,
                    botLtcPrice: this.reAddLtcPrice
                }

                oldLtcTradebook.push(newLtcTradebookItem)

                localStorage.setItem(this.botLtcWallet, JSON.stringify(oldLtcTradebook))

                this.tradeBotLtcBook = JSON.parse(localStorage.getItem(this.botLtcWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    async buyDogeAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botDogeBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.dogeWallet.derivedMasterPrivateKey,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botDogeWallet)
                localStorage.setItem(this.botDogeWallet, "")

                var oldDogeTradebook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                const newDogeTradebookItem = {
                    botDogeUnciaAmount: this.reAddDogeAmount,
                    botDogePrice: this.reAddDogePrice
                }

                oldDogeTradebook.push(newDogeTradebookItem)

                localStorage.setItem(this.botDogeWallet, JSON.stringify(oldDogeTradebook))

                this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botDogeWallet)
                localStorage.setItem(this.botDogeWallet, "")

                var oldDogeTradebook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                const newDogeTradebookItem = {
                    botDogeUnciaAmount: this.reAddDogeAmount,
                    botDogePrice: this.reAddDogePrice
                }

                oldDogeTradebook.push(newDogeTradebookItem)

                localStorage.setItem(this.botDogeWallet, JSON.stringify(oldDogeTradebook))

                this.tradeBotDogeBook = JSON.parse(localStorage.getItem(this.botDogeWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    async buyDgbAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botDgbBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.dgbWallet.derivedMasterPrivateKey,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botDgbWallet)
                localStorage.setItem(this.botDgbWallet, "")

                var oldDgbTradebook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                const newDgbTradebookItem = {
                    botDgbUnciaAmount: this.reAddDgbAmount,
                    botDgbPrice: this.reAddDgbPrice
                }

                oldDgbTradebook.push(newDgbTradebookItem)

                localStorage.setItem(this.botDgbWallet, JSON.stringify(oldDgbTradebook))

                this.tradeBotDgbBook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botDgbWallet)
                localStorage.setItem(this.botDgbWallet, "")

                var oldDgbTradebook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                const newDgbTradebookItem = {
                    botDgbUnciaAmount: this.reAddDgbAmount,
                    botDgbPrice: this.reAddDgbPrice
                }

                oldDgbTradebook.push(newDgbTradebookItem)

                localStorage.setItem(this.botDgbWallet, JSON.stringify(oldDgbTradebook))

                this.tradeBotDgbBook = JSON.parse(localStorage.getItem(this.botDgbWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    async buyRvnAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botRvnBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.rvnWallet.derivedMasterPrivateKey,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botRvnWallet)
                localStorage.setItem(this.botRvnWallet, "")

                var oldRvnTradebook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                const newRvnTradebookItem = {
                    botRvnUnciaAmount: this.reAddRvnAmount,
                    botRvnPrice: this.reAddRvnPrice
                }

                oldRvnTradebook.push(newRvnTradebookItem)

                localStorage.setItem(this.botRvnWallet, JSON.stringify(oldRvnTradebook))

                this.tradeBotRvnBook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botRvnWallet)
                localStorage.setItem(this.botRvnWallet, "")

                var oldRvnTradebook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                const newRvnTradebookItem = {
                    botRvnUnciaAmount: this.reAddRvnAmount,
                    botRvnPrice: this.reAddRvnPrice
                }

                oldRvnTradebook.push(newRvnTradebookItem)

                localStorage.setItem(this.botRvnWallet, JSON.stringify(oldRvnTradebook))

                this.tradeBotRvnBook = JSON.parse(localStorage.getItem(this.botRvnWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    async buyArrrAction() {
        const makeRequest = async () => {
            const response = await parentEpml.request('tradeBotRespondRequest', {
                atAddress: this.botArrrBuyAtAddress,
                foreignKey: store.getState().app.selectedAddress.arrrWallet.seed58,
                receivingAddress: store.getState().app.selectedAddress.address,
            })
            return response
        }

        const manageResponse = (response) => {
            if (response === true) {
                let snack5string = get("tradepage.tchange23")
                parentEpml.request('showSnackBar', `${snack5string}`)
            } else if (response === false) {
                localStorage.removeItem(this.botArrrWallet)
                localStorage.setItem(this.botArrrWallet, "")

                var oldArrrTradebook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                const newArrrTradebookItem = {
                    botArrrUnciaAmount: this.reAddArrrAmount,
                    botArrrPrice: this.reAddArrrPrice
                }

                oldArrrTradebook.push(newArrrTradebookItem)

                localStorage.setItem(this.botArrrWallet, JSON.stringify(oldArrrTradebook))

                this.tradeBotArrrBook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                let snack6string = get("tradepage.tchange24")
                parentEpml.request('showSnackBar', `${snack6string}`)
            } else {
                localStorage.removeItem(this.botArrrWallet)
                localStorage.setItem(this.botArrrWallet, "")

                var oldArrrTradebook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                const newArrrTradebookItem = {
                    botArrrUnciaAmount: this.reAddArrrAmount,
                    botArrrPrice: this.reAddArrrPrice
                }

                oldArrrTradebook.push(newArrrTradebookItem)

                localStorage.setItem(this.botArrrWallet, JSON.stringify(oldArrrTradebook))

                this.tradeBotArrrBook = JSON.parse(localStorage.getItem(this.botArrrWallet) || "[]")

                let snack7string = get("tradepage.tchange25")
                parentEpml.request('showSnackBar', `${snack7string}: ${response.message}`)
            }
        }
        const res = await makeRequest()
        manageResponse(res)
    }

    stateChanged(state) {
        this.config = state.config
        this.urls = state.app.registeredUrls
        this.addressInfo = state.app.accountInfo.addressInfo
    }

    searchKeyListener(e) {
        if (e.key === 'Enter') {
            this.openUserInfo()
        }
    }

    clearSearchField() {
        this.shadowRoot.getElementById('searchContent').value = this.searchContentString
    }

    openUserInfo() {
        let sendInfoAddress = this.shadowRoot.getElementById('searchContent').value
        const infoDialog = document.getElementById('main-app').shadowRoot.querySelector('app-view').shadowRoot.querySelector('user-info-view')
        infoDialog.openUserInfo(sendInfoAddress)
        this.clearSearchField()
    }

    openSettings() {
        const settingsDialog = document.getElementById('main-app').shadowRoot.querySelector('app-view').shadowRoot.querySelector('user-settings')
        settingsDialog.openSettings()
    }

    openLogout() {
        const logoutDialog = document.getElementById('main-app').shadowRoot.querySelector('app-view').shadowRoot.querySelector('logout-view')
        logoutDialog.openLogout()
    }

    getApiKey() {
        const apiNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
        let apiKey = apiNode.apiKey
        return apiKey
    }

    isEmptyArray(arr) {
        if (!arr) {
            return true
        }
        return arr.length === 0
    }

    round(number) {
        let result = (Math.round(parseFloat(number) * 1e8) / 1e8).toFixed(8)
        return result
    }
}

window.customElements.define('app-view', AppView)