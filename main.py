# main.py
from fastapi import FastAPI, HTTPException
from user import User
from schemas import UserCreate, DepositRequest, TransferRequest, InvestRequest

app = FastAPI(title="Zetu API", description="Backend for Zetu Fintech App")

# --- FAUX DATABASE ---
# In a real app, this would be SQL. For now, we store users in memory.
# Format: {'username': UserObject}
users_db = {}

# --- HELPER FUNCTION ---
def get_user(username):
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[username]

# --- ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "Welcome to Zetu API. Visit /docs for the interface."}

@app.post("/users/create")
def create_user(user: UserCreate):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new User instance
    new_user = User(user.username, user.phone)
    users_db[user.username] = new_user
    return {"message": f"User {user.username} created successfully."}

@app.get("/users/{username}")
def get_user_details(username: str):
    user = get_user(username)
    return {
        "username": user.name,
        "phone": user.phone,
        "balance": user.wallet.balance,
        "currency": user.wallet.currency,
        "portfolio": user.portfolio.assets
    }

@app.post("/wallet/{username}/deposit")
def deposit_money(username: str, transaction: DepositRequest):
    user = get_user(username)
    user.wallet.deposit(transaction.amount)
    return {"message": "Deposit successful", "new_balance": user.wallet.balance}

@app.post("/transfer/{sender_username}")
def transfer_money(sender_username: str, transfer: TransferRequest):
    sender = get_user(sender_username)
    receiver = get_user(transfer.receiver_username)

    if sender.wallet.withdraw(transfer.amount):
        receiver.wallet.deposit(transfer.amount)
        return {"message": f"Sent {transfer.amount} to {receiver.name}"}
    else:
        raise HTTPException(status_code=400, detail="Insufficient funds")

@app.post("/invest/{username}")
def buy_asset(username: str, invest: InvestRequest):
    user = get_user(username)
    
    # Calculate cost
    total_cost = invest.price * invest.quantity
    
    if user.wallet.withdraw(total_cost):
        # Update portfolio logic manually here since we are in API mode
        asset = invest.asset_name
        if asset in user.portfolio.assets:
            user.portfolio.assets[asset] += invest.quantity
        else:
            user.portfolio.assets[asset] = invest.quantity
            
        return {"message": f"Bought {invest.quantity} units of {asset}"}
    else:
        raise HTTPException(status_code=400, detail="Insufficient funds for investment")