"use client"

import { useState } from "react"

const CreditDebitForm = () => {
  const [formData, setFormData] = useState({
    type: "Credit",
    amount: "",
    partyName: "",
    date: "",
    paymentMode: "Cash",
    referenceId: "",
    description: "",
    proof: null,
    category: "",
    subCategory: "",
    dueDate: "",
    contactNumber: "",
    address: "",
    gstNumber: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    status: "Pending",
    priority: "Medium",
    tags: "",
    remarks: "",
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "proof") {
      setFormData({ ...formData, [name]: files?.[0] || null })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const completeData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      proofFileName: formData.proof?.name || null,
      formattedAmount: `₹${Number(formData.amount).toLocaleString('en-IN')}`,
    }

    console.log("=== CREDIT/DEBIT ENTRY SUBMISSION ===")
    console.log(JSON.stringify(completeData, null, 2))
    console.log("=== END SUBMISSION ===")

    alert(`${formData.type} Entry of ₹${Number(formData.amount).toLocaleString('en-IN')} submitted successfully!`)
  }

  const formatAmount = (amount) => {
    if (!amount) return ""
    return `₹${Number(amount).toLocaleString('en-IN')}`
  }

  return (
    <div className="bg-white p-6 border border-gray-200 shadow-lg rounded-xl">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${formData.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 ${formData.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}
            >
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Credit / Debit Entry</h2>
            <p className="text-gray-600 mt-1">Record financial transactions and payments</p>
          </div>
        </div>
        {formData.amount && (
          <div className={`mt-4 p-3 rounded-lg ${formData.type === 'Credit' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Transaction Amount:</span>
              <span className={`text-xl font-bold ${formData.type === 'Credit' ? 'text-green-700' : 'text-red-700'}`}>
                {formData.type === 'Credit' ? '+' : '-'}{formatAmount(formData.amount)}
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Transaction Type *</label>
          <div className="grid grid-cols-2 gap-4">
            {['Credit', 'Debit'].map((type) => (
              <label
                key={type}
                className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.type === type
                    ? type === 'Credit'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.type === type
                      ? type === 'Credit'
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.type === type && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="font-medium">{type}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount *
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="partyName" className="text-sm font-medium text-gray-700">
              Party Name *
            </label>
            <input
              id="partyName"
              name="partyName"
              placeholder="Enter party name"
              value={formData.partyName}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              Transaction Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
              Payment Mode *
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="NEFT/RTGS">NEFT/RTGS</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Category</option>
              <option value="Fuel">Fuel</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Salary">Salary</option>
              <option value="Equipment">Equipment</option>
              <option value="Office Expenses">Office Expenses</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="referenceId" className="text-sm font-medium text-gray-700">
              Reference / Transaction ID
            </label>
            <input
              id="referenceId"
              name="referenceId"
              placeholder="Enter reference details"
              value={formData.referenceId}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gstNumber" className="text-sm font-medium text-gray-700">
              GST Number
            </label>
            <input
              id="gstNumber"
              name="gstNumber"
              placeholder="Enter GST number"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="panNumber" className="text-sm font-medium text-gray-700">
              PAN Number
            </label>
            <input
              id="panNumber"
              name="panNumber"
              placeholder="Enter PAN number"
              value={formData.panNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Party Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter party address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description / Purpose
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter transaction description or purpose..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="remarks" className="text-sm font-medium text-gray-700">
            Additional Remarks
          </label>
          <textarea
            id="remarks"
            name="remarks"
            placeholder="Enter any additional remarks..."
            value={formData.remarks}
            onChange={handleChange}
            rows={2}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="proof" className="text-sm font-medium text-gray-700">
            Attach Proof / Receipt
          </label>
          <input
            id="proof"
            name="proof"
            type="file"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-medium transition-colors duration-200 ${
              formData.type === 'Credit'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Save {formData.type} Entry
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreditDebitForm
