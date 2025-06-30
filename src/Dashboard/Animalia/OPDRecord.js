"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"

export default function OPDRecordContent() {
  const { pets, opdRecords, addOPDRecord } = useData()
  const [formData, setFormData] = useState({
    petId: "",
    petName: "",
    owner: "",
    symptoms: "",
    severity: "",
    duration: "",
    status: "Pending",
    doctor: "Not Assigned",
  })
  const [images, setImages] = useState([])
  const [documents, setDocuments] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "petId") {
      const selectedPet = pets.find((pet) => pet.id === value)
      if (selectedPet) {
        setFormData((prev) => ({
          ...prev,
          petName: selectedPet.name,
          owner: selectedPet.owner,
        }))
      }
    }
  }

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          setImages((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDocumentUpload = (e) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          setDocuments((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const recordData = {
      ...formData,
      images,
      documents,
    }

    addOPDRecord(recordData)

    // Reset form
    setFormData({
      petId: "",
      petName: "",
      owner: "",
      symptoms: "",
      severity: "",
      duration: "",
      status: "Pending",
      doctor: "Not Assigned",
    })
    setImages([])
    setDocuments([])

    alert("OPD Record submitted successfully!")
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700"
      case "High":
        return "bg-orange-100 text-orange-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700"
      case "Under Review":
        return "bg-blue-100 text-blue-700"
      case "Pending":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold">OPD Records</h2>
        <p className="text-orange-100 mt-2">Manage outpatient department records and consultations</p>
      </div>

      {/* New Record Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📝</span>
            Submit New OPD Record
          </h3>
          <p className="text-gray-600 text-sm">Upload problems, symptoms, and supporting documents</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Pet *</label>
              <select
                name="petId"
                value={formData.petId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose pet</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species}) - {pet.owner}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level *</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms Description *</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              required
              placeholder="Describe the symptoms in detail..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Symptoms</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g., 3 days, 1 week"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm text-gray-600">Upload photos of symptoms or affected areas</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={handleDocumentUpload}
                className="hidden"
                id="document-upload"
              />
              <label htmlFor="document-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm text-gray-600">Upload any relevant documents or reports</p>
                <p className="text-xs text-gray-400">PDF, DOC, JPG up to 10MB each</p>
              </label>
            </div>
            {documents.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">{documents.length} document(s) uploaded</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <span>📋</span>
            <span>Submit OPD Record</span>
          </button>
        </form>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📊</span>
            Recent OPD Records
          </h3>
          <p className="text-gray-600 text-sm">View and manage submitted records</p>
        </div>
        <div className="p-6 space-y-4">
          {opdRecords.length > 0 ? (
            opdRecords
              .slice()
              .reverse()
              .map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.petName}</h3>
                      <p className="text-sm text-gray-500">Owner: {record.owner}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <span className="mr-1">📅</span>
                        {record.date}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="font-medium text-gray-900">Symptoms:</p>
                      <p className="text-gray-600">{record.symptoms}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Severity:</p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityColor(record.severity)}`}
                      >
                        {record.severity}
                      </span>
                    </div>
                  </div>

                  {record.duration && (
                    <div className="mb-3">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">Duration:</span> {record.duration}
                      </p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Assigned Doctor:</span> {record.doctor}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📋</span>
              <p>No OPD records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
