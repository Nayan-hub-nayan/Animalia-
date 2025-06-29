"use client"

import { useState } from "react"

const PetrolPumpProfileForm = () => {
  const [formData, setFormData] = useState({
    pumpName: "",
    ownerName: "",
    contact: "",
    email: "",
    address: "",
    fuelTypes: [],
    capacity: "",
    licenseNo: "",
    gstNo: "",
    regDate: "",
    documents: null,
    city: "",
    state: "",
    pincode: "",
    establishedYear: "",
    numberOfNozzles: "",
    operatingHours: "",
    emergencyContact: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    status: "Active",
    remarks: "",
  })

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target
    if (name === "documents") {
      setFormData({ ...formData, [name]: files?.[0] || null })
    } else if (type === "checkbox") {
      const updated = checked ? [...formData.fuelTypes, value] : formData.fuelTypes.filter((fuel) => fuel !== value)
      setFormData({ ...formData, fuelTypes: updated })
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
      totalFuelTypes: formData.fuelTypes.length,
    }

    console.log("=== PETROL PUMP PROFILE SUBMISSION ===")
    console.log(JSON.stringify(completeData, null, 2))
    console.log("=== END SUBMISSION ===")

    alert("Petrol Pump Profile Submitted Successfully!")
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
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M12 7v5l4 2"></path>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">Petrol Pump Profile</h2>
        </div>
        <p className="text-gray-600 mt-1">Register and manage petrol pump information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="pumpName" className="text-sm font-medium text-gray-700">
              Pump Name *
            </label>
            <input
              id="pumpName"
              name="pumpName"
              placeholder="Enter pump name"
              value={formData.pumpName}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ownerName" className="text-sm font-medium text-gray-700">
              Owner Name *
            </label>
            <input
              id="ownerName"
              name="ownerName"
              placeholder="Enter owner name"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="text-sm font-medium text-gray-700">
              Contact Number *
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <input
              id="emergencyContact"
              name="emergencyContact"
              type="tel"
              placeholder="Enter emergency contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">
              State
            </label>
            <input
              id="state"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="pincode" className="text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="capacity" className="text-sm font-medium text-gray-700">
              Storage Capacity (liters)
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="Enter storage capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="0"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="numberOfNozzles" className="text-sm font-medium text-gray-700">
              Number of Nozzles
            </label>
            <input
              id="numberOfNozzles"
              name="numberOfNozzles"
              type="number"
              placeholder="Enter number of nozzles"
              value={formData.numberOfNozzles}
              onChange={handleChange}
              min="1"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="establishedYear" className="text-sm font-medium text-gray-700">
              Established Year
            </label>
            <input
              id="establishedYear"
              name="establishedYear"
              type="number"
              placeholder="Enter established year"
              value={formData.establishedYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="operatingHours" className="text-sm font-medium text-gray-700">
              Operating Hours
            </label>
            <input
              id="operatingHours"
              name="operatingHours"
              placeholder="e.g., 6:00 AM - 10:00 PM"
              value={formData.operatingHours}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="licenseNo" className="text-sm font-medium text-gray-700">
              License Number
            </label>
            <input
              id="licenseNo"
              name="licenseNo"
              placeholder="Enter license number"
              value={formData.licenseNo}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gstNo" className="text-sm font-medium text-gray-700">
              GST Number
            </label>
            <input
              id="gstNo"
              name="gstNo"
              placeholder="Enter GST number"
              value={formData.gstNo}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="regDate" className="text-sm font-medium text-gray-700">
              Registration Date
            </label>
            <input
              id="regDate"
              name="regDate"
              type="date"
              value={formData.regDate}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bankName" className="text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              id="bankName"
              name="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ifscCode" className="text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              id="ifscCode"
              name="ifscCode"
              placeholder="Enter IFSC code"
              value={formData.ifscCode}
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
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Complete Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter complete address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />
        </div>

        {/* Fuel Types Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Fuel Types Available *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Petrol", "Diesel", "CNG", "LPG"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="fuelTypes"
                  value={type}
                  checked={formData.fuelTypes.includes(type)}
                  onChange={handleChange}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 font-medium">{type}</span>
              </label>
            ))}
          </div>
          {formData.fuelTypes.length > 0 && (
            <div className="text-sm text-gray-600">Selected: {formData.fuelTypes.join(", ")}</div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="remarks" className="text-sm font-medium text-gray-700">
            Additional Notes / Remarks
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
          <label htmlFor="documents" className="text-sm font-medium text-gray-700">
            Upload License / Documents
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
            Save Pump Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default PetrolPumpProfileForm
