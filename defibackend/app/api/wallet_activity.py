import requests
from fastapi import APIRouter
from datetime import datetime
from config.settings import settings

router = APIRouter(prefix="/wallet", tags=["Wallet Activity"])

ETHERSCAN_URL = "https://api.etherscan.io/v2/api"
SEPOLIA_CHAIN_ID = 11155111


def compute_risk(tx):
    score = 0

    eth_value = int(tx.get("value", 0)) / 1e18
    gas_price = int(tx.get("gasPrice", 0)) / 1e9 if "gasPrice" in tx else 0

    if eth_value > 5:
        score += 40
    if gas_price > 100:
        score += 30
    if tx.get("isError") == "1":
        score += 30

    if score >= 70:
        level = "high"
    elif score >= 40:
        level = "medium"
    else:
        level = "low"

    return min(score / 100, 1.0), level


@router.get("/{wallet_address}/transactions")
def get_wallet_transactions(wallet_address: str, limit: int = 20):

    params = {
        "chainid": SEPOLIA_CHAIN_ID,
        "module": "account",
        "action": "txlist",
        "address": wallet_address,
        "startblock": 0,
        "endblock": 99999999,
        "sort": "desc",
        "apikey": settings.ETHERSCAN_API_KEY,
    }

    res = requests.get(ETHERSCAN_URL, params=params)
    data = res.json()

    if data.get("status") != "1":
        return {
            "wallet": wallet_address,
            "count": 0,
            "transactions": [],
        }

    enriched = []

    for tx in data["result"][:limit]:
        risk_score, risk_level = compute_risk(tx)

        enriched.append({
            "tx_hash": tx["hash"],
            "from": tx["from"],
            "to": tx["to"],
            "amount_eth": round(int(tx["value"]) / 1e18, 6),
            "gas_gwei": round(int(tx["gasPrice"]) / 1e9, 2),
            "timestamp": datetime.utcfromtimestamp(int(tx["timeStamp"])),
            "risk_score": risk_score,
            "risk_level": risk_level,
        })

    return {
        "wallet": wallet_address,
        "count": len(enriched),
        "transactions": enriched,
    }
