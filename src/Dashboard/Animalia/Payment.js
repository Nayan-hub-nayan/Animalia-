export default function PaymentContent() {
  const transactions = [
    {
      id: "INV-001",
      service: "General Health Checkup",
      petName: "Max",
      amount: 150,
      date: "2024-01-15",
      status: "Paid",
      method: "UPI",
    },
    {
      id: "INV-002",
      service: "Vaccination",
      petName: "Bella",
      amount: 80,
      date: "2024-01-14",
      status: "Pending",
      method: "Card",
    },
    {
      id: "INV-003",
      service: "Surgery Consultation",
      petName: "Charlie",
      amount: 300,
      date: "2024-01-13",
      status: "Paid",
      method: "NetBanking",
    },
  ]

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      description: "Pay using UPI apps like GPay, PhonePe, Paytm",
      icon: "📱",
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, RuPay cards accepted",
      icon: "💳",
      popular: false,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "Direct bank transfer from your account",
      icon: "🏦",
      popular: false,
    },
  ]

  const getStatusColor = (status: string) => {
    return status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Payment Gateway</h2>
        <p className="text-gray-600 mt-2">Manage payments and billing</p>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹450</div>
          <p className="text-xs text-gray-500">This month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <span className="text-2xl">📅</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹80</div>
          <p className="text-xs text-gray-500">1 invoice</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Transactions</h3>
            <span className="text-2xl">💳</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <p className="text-xs text-gray-500">This month</p>
        </div>
      </div>

      {/* Make Payment */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
          <p className="text-gray-600 text-sm">Pay for services using multiple payment options</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice/Service</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select invoice</option>
                <option value="inv-002">INV-002 - Vaccination (₹80)</option>
                <option value="new">New Service Payment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                defaultValue="₹80"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-3 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input type="radio" name="payment" id={method.id} className="text-blue-600" />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <span className="text-xl">{method.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <label htmlFor={method.id} className="font-medium cursor-pointer text-gray-900">
                          {method.name}
                        </label>
                        {method.popular && (
                          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
            <span>💳</span>
            <span>Proceed to Payment</span>
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <p className="text-gray-600 text-sm">View all payment transactions and download invoices</p>
        </div>
        <div className="p-6 space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{transaction.id}</h3>
                  <p className="text-sm text-gray-500">{transaction.service}</p>
                  <p className="text-sm text-gray-500">Pet: {transaction.petName}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">₹{transaction.amount}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                  <span>Date: {transaction.date}</span>
                  <span>Method: {transaction.method}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1">
                    <span>📥</span>
                    <span>Invoice</span>
                  </button>
                  {transaction.status === "Pending" && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
