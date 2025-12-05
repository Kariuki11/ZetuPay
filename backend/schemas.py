# schemas.py
from pydantic import BaseModel

# 1. Schema for creating a user
class UserCreate(BaseModel):
    username: str
    phone: str

# 2. Schema for depositing money
class DepositRequest(BaseModel):
    amount: float

# 3. Schema for transferring money
class TransferRequest(BaseModel):
    receiver_username: str
    amount: float

# 4. Schema for buying assets
class InvestRequest(BaseModel):
    asset_name: str
    price: float
    quantity: int