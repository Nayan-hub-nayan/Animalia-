"use client"

import { useState } from "react"

const StockEntryForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    category: "",
    supplier: "",
    purchaseDate: "",
    quantity: "",
    unitPrice: "",
    stockLocation: "",
    batchNo: "",
    expiryDate: "",
    remarks: "",
    billImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "billImage") {
      setFormData({ ...formData, [name]: files?.[0] || null })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalCost = Number(formData.quantity) * Number(formData.unitPrice)

    const completeData = {
      ...formData,
      totalCost: totalCost.toFixed(2),
      submittedAt: new Date().toISOString(),
      billImageName: formData.billImage?.name || null,
      billImageSize: formData.billImage?.size || null,
    }

    console.log("=== STOCK ENTRY SUBMISSION ===")
    console.log(JSON.stringify(completeData, null, 2))
    console.log("=== END SUBMISSION ===")

    alert(
      `Stock entry submitted successfully!\nTotal Cost: ₹${totalCost.toFixed(2)}\nCheck console for complete JSON data.`,
    )
  }

  const totalCost = Number(formData.quantity) * Number(formData.unitPrice) || 0

  return (
    <div className="bg-white p-6 border border-gray-200 shadow-lg rounded-xl">
      <div className="mb-6">
        <div className="flex items-center gap-2">
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
            className="h-6 w-6 text-gray-700"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.29 7 12 12 20.71 7"></polyline>
            <line x1="12" y1="22" x2="12" y2="12"></line>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">Stock Entry Form</h2>
        </div>
        <p className="text-gray-600 mt-1">Add new inventory items to your stock</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="itemName" className="text-sm font-medium text-gray-700">
              Item Name *
            </label>
            <input
              id="itemName"
              name="itemName"
              placeholder="Enter item name"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="itemCode" className="text-sm font-medium text-gray-700">
              Item Code / SKU
            </label>
            <input
              id="itemCode"
              name="itemCode"
              placeholder="Enter item code"
              value={formData.itemCode}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Pharma">Pharma</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="supplier" className="text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              id="supplier"
              name="supplier"
              placeholder="Enter supplier name"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="purchaseDate" className="text-sm font-medium text-gray-700">
              Purchase Date *
            </label>
            <input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity *
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="0"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="unitPrice" className="text-sm font-medium text-gray-700">
              Unit Price *
            </label>
            <input
              id="unitPrice"
              name="unitPrice"
              type="number"
              placeholder="0.00"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stockLocation" className="text-sm font-medium text-gray-700">
              Stock Location
            </label>
            <input
              id="stockLocation"
              name="stockLocation"
              placeholder="Enter storage location"
              value={formData.stockLocation}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="batchNo" className="text-sm font-medium text-gray-700">
              Batch Number
            </label>
            <input
              id="batchNo"
              name="batchNo"
              placeholder="Enter batch number (optional)"
              value={formData.batchNo}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Total Cost Display */}
        {totalCost > 0 && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Cost:</span>
              <span className="text-lg font-semibold text-gray-900">₹{totalCost.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="remarks" className="text-sm font-medium text-gray-700">
            Remarks / Notes
          </label>
          <textarea
            id="remarks"
            name="remarks"
            placeholder="Enter any additional notes..."
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="billImage" className="text-sm font-medium text-gray-700">
            Upload Bill/Receipt
          </label>
          <input
            id="billImage"
            name="billImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Submit Stock Entry
          </button>
        </div>
      </form>
    </div>
  )
}

export default StockEntryForm
