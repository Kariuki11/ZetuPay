from wallet import Wallet
from zetu_invest import ZetuWealth

class User:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone
        self.wallet = Wallet(currency="KES")
        self.portfolio = ZetuWealth(self.wallet)