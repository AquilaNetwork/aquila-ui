/**
 * CrossChain - TradeBot Create Request (Sell Action)
 * 
 * These are special types of transactions (JSON ENCODED)
 */

export default class TradeBotCreateRequest {
	constructor() {
		// ...
	}

	createTransaction(txnReq) {
		this.creatorPublicKey(txnReq.creatorPublicKey)
		this.unciaAmount(txnReq.unciaAmount)
		this.fundingUnciaAmount(txnReq.fundingUnciaAmount)
		this.foreignBlockchain(txnReq.foreignBlockchain)
		this.foreignAmount(txnReq.foreignAmount)
		this.tradeTimeout(txnReq.tradeTimeout)
		this.receivingAddress(txnReq.receivingAddress)

		return this.txnRequest()
	}

	creatorPublicKey(creatorPublicKey) {
		this._creatorPublicKey = creatorPublicKey
	}

	unciaAmount(unciaAmount) {
		this._unciaAmount = unciaAmount
	}

	fundingUnciaAmount(fundingUnciaAmount) {
		this._fundingUnciaAmount = fundingUnciaAmount
	}

	foreignBlockchain(foreignBlockchain) {
		this._foreignBlockchain = foreignBlockchain
	}

	foreignAmount(foreignAmount) {
		this._foreignAmount = foreignAmount
	}

	tradeTimeout(tradeTimeout) {
		this._tradeTimeout = tradeTimeout
	}

	receivingAddress(receivingAddress) {
		this._receivingAddress = receivingAddress
	}

	txnRequest() {
		return {
			creatorPublicKey: this._creatorPublicKey,
			unciaAmount: this._unciaAmount,
			fundingUnciaAmount: this._fundingUnciaAmount,
			foreignBlockchain: this._foreignBlockchain,
			foreignAmount: this._foreignAmount,
			tradeTimeout: this._tradeTimeout,
			receivingAddress: this._receivingAddress
		}
	}
}
