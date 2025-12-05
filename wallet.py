class Wallet:
    def __init__(self, currency="KES"):
        self.balance = 0.0
        self.currency = currency

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return True
        return False