"use client"

import { useState } from "react"

const VehicleEntryForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    type: "",
    manufacturer: "",
    model: "",
    purchaseYear: "",
    ownerName: "",
    contact: "",
    rcNumber: "",
    insuranceNo: "",
    insuranceExpiry: "",
    status: "Active",
    notes: "",
    documents: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "documents") {
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
      documentName: formData.documents?.name || null,
    }

    console.log("=== VEHICLE ENTRY SUBMISSION ===")
    console.log(JSON.stringify(completeData, null, 2))
    console.log("=== END SUBMISSION ===")

    alert("Vehicle entry saved successfully!")
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
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10V6c0-2-2-4-4-4H4c-2 0-4 2-4 4v10c0 .6.4 1 1 1h2"></path>
            <circle cx="7" cy="17" r="2"></circle>
            <path d="M9 17h6"></path>
            <circle cx="17" cy="17" r="2"></circle>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">Vehicle Entry Form</h2>
        </div>
        <p className="text-gray-600 mt-1">Register and manage vehicle information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="vehicleNumber" className="text-sm font-medium text-gray-700">
              Vehicle Number *
            </label>
            <input
              id="vehicleNumber"
              name="vehicleNumber"
              placeholder="Enter vehicle number"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium text-gray-700">
              Vehicle Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Truck">Truck</option>
              <option value="Tanker">Tanker</option>
              <option value="Tractor">Tractor</option>
              <option value="Jeep">Jeep</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="manufacturer" className="text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              id="manufacturer"
              name="manufacturer"
              placeholder="Enter manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="model" className="text-sm font-medium text-gray-700">
              Model Name
            </label>
            <input
              id="model"
              name="model"
              placeholder="Enter model name"
              value={formData.model}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="purchaseYear" className="text-sm font-medium text-gray-700">
              Year of Purchase
            </label>
            <input
              id="purchaseYear"
              name="purchaseYear"
              type="number"
              placeholder="Enter purchase year"
              value={formData.purchaseYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              id="ownerName"
              name="ownerName"
              placeholder="Enter owner name"
              value={formData.ownerName}
              onChange={handleChange}
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
            <label htmlFor="rcNumber" className="text-sm font-medium text-gray-700">
              RC Number
            </label>
            <input
              id="rcNumber"
              name="rcNumber"
              placeholder="Enter RC number"
              value={formData.rcNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="insuranceNo" className="text-sm font-medium text-gray-700">
              Insurance Number
            </label>
            <input
              id="insuranceNo"
              name="insuranceNo"
              placeholder="Enter insurance number"
              value={formData.insuranceNo}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="insuranceExpiry" className="text-sm font-medium text-gray-700">
              Insurance Expiry
            </label>
            <input
              id="insuranceExpiry"
              name="insuranceExpiry"
              type="date"
              value={formData.insuranceExpiry}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
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
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Enter any additional notes..."
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="documents" className="text-sm font-medium text-gray-700">
            Upload RC / Insurance Documents
          </label>
          <input
            id="documents"
            name="documents"
            type="file"
            accept=".pdf,image/*"
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Save Vehicle
          </button>
        </div>
      </form>
    </div>
  )
}

export default VehicleEntryForm
