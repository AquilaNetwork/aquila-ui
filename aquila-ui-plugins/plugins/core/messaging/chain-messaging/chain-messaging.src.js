import { LitElement, html, css } from 'lit'

class ChainMessaging extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean },
            theme: { type: String, reflect: true }
        }
    }

    static get styles() {
        return css`
            * {
                --mdc-theme-primary: rgb(3, 169, 244);
                --paper-input-container-focus-color: var(--mdc-theme-primary);
            }

            paper-spinner-lite{
                height: 24px;
                width: 24px;
                --paper-spinner-color: var(--mdc-theme-primary);
                --paper-spinner-stroke-width: 2px;
            }

            #chain-messaging-page {
                background: var(--white);
            }

        `
    }

    constructor() {
        super()
        this.theme = localStorage.getItem('aquilaTheme') ? localStorage.getItem('aquilaTheme') : 'light'
    }

    render() {
        return html`
            <div id="chain-messaging-page">
                <h2 style="text-align: center; margin-top: 3rem; color: var(--black)">Coming Soon!</h2>
            </div>
        `
    }

    firstUpdated() {

        this.changeTheme()

	setInterval(() => {
	    this.changeTheme();
	}, 100)

        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        window.addEventListener("click", () => {
        });

        window.onkeyup = (e) => {
            if (e.keyCode === 27) {
            }
        }
    }

    changeTheme() {
        const checkTheme = localStorage.getItem('aquilaTheme')
        if (checkTheme === 'dark') {
            this.theme = 'dark';
        } else {
            this.theme = 'light';
        }
        document.querySelector('html').setAttribute('theme', this.theme);
    }

    isEmptyArray(arr) {
        if (!arr) { return true }
        return arr.length === 0
    }
}

window.customElements.define('chain-messaging', ChainMessaging)
