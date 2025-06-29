"use client"

import type React from "react"
import { useState } from "react"
import { useData } from "../../context/DataContext"

interface ServiceBookingFormProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: {
    id: string
    name: string
    icon: string
    price?: string
  }
  selectedPet?: {
    id: string
    name: string
    owner: string
    phone: string
  }
}

export default function ServiceBookingForm({ isOpen, onClose, selectedService, selectedPet }: ServiceBookingFormProps) {
  const { pets, addAppointment } = useData()
  const [formData, setFormData] = useState({
    petId: selectedPet?.id || "",
    petName: selectedPet?.name || "",
    owner: selectedPet?.owner || "",
    service: selectedService?.name || "",
    date: "",
    time: "",
    doctor: "",
    location: "",
    notes: "",
    phone: selectedPet?.phone || "",
    emergencyContact: "",
    symptoms: "",
    previousTreatment: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "petId" && !selectedPet) {
      const pet = pets.find((p) => p.id === value)
      if (pet) {
        setFormData((prev) => ({
          ...prev,
          petName: pet.name,
          owner: pet.owner,
          phone: pet.phone,
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const appointmentData = {
        petId: formData.petId,
        petName: formData.petName,
        owner: formData.owner,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        doctor: formData.doctor,
        location: formData.location,
        status: "Pending",
        notes: formData.notes,
        phone: formData.phone,
        emergencyContact: formData.emergencyContact,
        symptoms: formData.symptoms,
        previousTreatment: formData.previousTreatment,
        bookingDate: new Date().toISOString(),
        servicePrice: selectedService?.price || "N/A",
      }

      // Add to appointments
      addAppointment(appointmentData)

      // Log to console in JSON format
      console.log("=== SERVICE BOOKING DETAILS ===")
      console.log(JSON.stringify(appointmentData, null, 2))

      // Reset form
      setFormData({
        petId: selectedPet?.id || "",
        petName: selectedPet?.name || "",
        owner: selectedPet?.owner || "",
        service: selectedService?.name || "",
        date: "",
        time: "",
        doctor: "",
        location: "",
        notes: "",
        phone: selectedPet?.phone || "",
        emergencyContact: "",
        symptoms: "",
        previousTreatment: "",
      })

      alert("Service booked successfully! Check console for booking details.")
      onClose()
    } catch (error) {
      console.error("Error booking service:", error)
      alert("Error booking service. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-6 border border-gray-200 shadow-lg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 pt-44">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Services Selection</h2>
        <p className="text-green-600 mt-2">Choose from available services for your pets</p>
      </div>
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Services Selection</h2>
        <p className="text-green-600 mt-2">Choose from available services for your pets</p>
      </div>
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Services Selection</h2>
        <p className="text-green-600 mt-2">Choose from available services for your pets</p>
      </div>
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Services Selection</h2>
        <p className="text-green-100 mt-2">Choose from available services for your pets</p>
      </div>
          <div className="flex items-center justify-between">
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
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800">Book Service</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-2">
            {selectedService && (
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">{selectedService.icon}</span>
                {selectedService.name}
                {selectedService.price && (
                  <span className="ml-2 bg-gray-100 px-2 py-1 rounded-full text-sm">{selectedService.price}</span>
                )}
              </p>
            )}
            {selectedPet && <p className="text-gray-600 text-sm">for {selectedPet.name}</p>}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Selection (if not pre-selected) */}
          {!selectedPet && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Pet <span className="text-red-500">*</span>
              </label>
              <select
                name="petId"
                value={formData.petId}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Choose your pet</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species}) - Owner: {pet.owner}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Service Selection (if not pre-selected) */}
          {!selectedService && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select service</option>
                <option value="General Health Checkup">General Health Checkup</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Surgery Consultation">Surgery Consultation</option>
                <option value="Grooming">Grooming</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Emergency Care">Emergency Care</option>
                <option value="Self Check">Self Check</option>
                <option value="Artificial Insemination">Artificial Insemination</option>
                <option value="Consultancy">Consultancy</option>
              </select>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select time slot</option>
                <option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
                <option value="2:00 PM - 5:00 PM">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="6:00 PM - 9:00 PM">Evening (6:00 PM - 9:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Doctor and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Preferred Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Any Available Doctor</option>
                <option value="Dr. Sarah Wilson">Dr. Sarah Wilson (General Veterinarian)</option>
                <option value="Dr. Mike Brown">Dr. Mike Brown (Surgery Specialist)</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis (Exotic Pet Specialist)</option>
                <option value="Dr. John Smith">Dr. John Smith (Emergency Care)</option>
                <option value="Dr. Lisa Johnson">Dr. Lisa Johnson (Dental Specialist)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select location</option>
                <option value="Main Clinic">Main Clinic (Downtown)</option>
                <option value="Branch Clinic">Branch Clinic (Uptown)</option>
                <option value="Home Visit">Home Visit (+₹200 extra)</option>
                <option value="Emergency Center">Emergency Center (24/7)</option>
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Primary Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Primary contact number"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="Emergency contact number"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Symptoms and Previous Treatment */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Symptoms</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe any symptoms or concerns you've noticed..."
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Previous Treatment</label>
              <textarea
                name="previousTreatment"
                value={formData.previousTreatment}
                onChange={handleInputChange}
                rows={2}
                placeholder="Any recent treatments, medications, or vet visits..."
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any special requirements, dietary restrictions, or other important information..."
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Booking Terms:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Appointments are confirmed within 2 hours</li>
              <li>• Cancellation allowed up to 4 hours before appointment</li>
              <li>• Home visits require advance payment</li>
              <li>• Emergency services available 24/7</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
