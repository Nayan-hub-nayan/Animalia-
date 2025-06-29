"use client"

import { useState, useEffect } from "react"

const BillingForm = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "INV-" + Date.now(),
    date: "",
    customerName: "",
    contact: "",
    address: "",
    serviceType: "",
    quantity: "",
    rate: "",
    gst: "",
    paymentStatus: "Unpaid",
    remarks: "",
    receipt: null,
  })

  const [total, setTotal] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  useEffect(() => {
    const subtotal = Number(formData.quantity) * Number(formData.rate) || 0
    setTotal(subtotal)
    setGrandTotal(subtotal + (subtotal * Number(formData.gst)) / 100)
  }, [formData.quantity, formData.rate, formData.gst])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "receipt") {
      setFormData({ ...formData, [name]: files?.[0] || null })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const completeData = {
      ...formData,
      total: total.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      submittedAt: new Date().toISOString(),
    }

    console.log("=== BILLING FORM SUBMISSION ===")
    console.log(JSON.stringify(completeData, null, 2))
    console.log("=== END SUBMISSION ===")

    alert(`Bill submitted successfully!\nGrand Total: ₹${grandTotal.toFixed(2)}`)
  }

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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">Billing Form</h2>
        </div>
        <p className="text-gray-600 mt-1">Create and manage customer invoices</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="invoiceNo" className="text-sm font-medium text-gray-700">
              Invoice Number
            </label>
            <input
              id="invoiceNo"
              name="invoiceNo"
              value={formData.invoiceNo}
              disabled
              className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date *
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
            <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
              Customer Name *
            </label>
            <input
              id="customerName"
              name="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
              Service/Product *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Service/Product</option>
              <option value="Borewell Drilling">Borewell Drilling</option>
              <option value="Diesel Supply">Diesel Supply</option>
              <option value="Material Delivery">Material Delivery</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity/Hours *
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
            <label htmlFor="rate" className="text-sm font-medium text-gray-700">
              Rate per Unit *
            </label>
            <input
              id="rate"
              name="rate"
              type="number"
              placeholder="0.00"
              value={formData.rate}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gst" className="text-sm font-medium text-gray-700">
              GST %
            </label>
            <input
              id="gst"
              name="gst"
              type="number"
              placeholder="0"
              value={formData.gst}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="paymentStatus" className="text-sm font-medium text-gray-700">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Billing Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter billing address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        {/* Total Display */}
        {total > 0 && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Subtotal:</span>
              <span className="text-lg font-semibold text-gray-900">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Grand Total:</span>
              <span className="text-xl font-bold text-gray-900">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="remarks" className="text-sm font-medium text-gray-700">
            Additional Notes
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
          <label htmlFor="receipt" className="text-sm font-medium text-gray-700">
            Attach Receipt (Optional)
          </label>
          <input
            id="receipt"
            name="receipt"
            type="file"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Save Bill
          </button>
        </div>
      </form>
    </div>
  )
}

export default BillingForm
