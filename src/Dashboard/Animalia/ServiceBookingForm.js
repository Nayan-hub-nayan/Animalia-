"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"

export default function ServiceBookingForm({ selectedService, selectedPet, onBack }) {
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

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
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
      onBack()
    } catch (error) {
      console.error("Error booking service:", error)
      alert("Error booking service. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <div>
              <h2 className="text-3xl font-bold text-white">Book Service</h2>
              <p className="text-blue-100 text-lg">Schedule your pet's appointment</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Service and Pet Info */}
        <div className="mt-6 flex flex-wrap gap-4">
          {selectedService && (
            <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-white font-medium flex items-center">
                <span className="mr-2 text-2xl">{selectedService.icon}</span>
                <span className="text-lg">{selectedService.name}</span>
                {selectedService.price && (
                  <span className="ml-3 bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm">
                    {selectedService.price}
                  </span>
                )}
              </p>
            </div>
          )}
          {selectedPet && (
            <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-white font-medium text-lg">for {selectedPet.name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pet Selection (if not pre-selected) */}
          {!selectedPet && (
            <div className="space-y-2">
              <label htmlFor="petId" className="text-sm font-medium text-gray-700">
                Select Pet *
              </label>
              <select
                id="petId"
                name="petId"
                value={formData.petId}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="service" className="text-sm font-medium text-gray-700">
                Service Type *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Preferred Date *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-gray-700">
                Time Slot *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="doctor" className="text-sm font-medium text-gray-700">
                Preferred Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Primary Contact Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Primary contact number"
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
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Emergency contact number"
              />
            </div>
          </div>

          {/* Symptoms and Previous Treatment */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="symptoms" className="text-sm font-medium text-gray-700">
                Current Symptoms
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe any symptoms or concerns you've noticed..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="previousTreatment" className="text-sm font-medium text-gray-700">
                Previous Treatment
              </label>
              <textarea
                id="previousTreatment"
                name="previousTreatment"
                value={formData.previousTreatment}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any recent treatments, medications, or vet visits..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any special requirements, dietary restrictions, or other important information..."
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-3">Booking Terms:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Appointments are confirmed within 2 hours</li>
              <li>• Cancellation allowed up to 4 hours before appointment</li>
              <li>• Home visits require advance payment</li>
              <li>• Emergency services available 24/7</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <span>📅</span>
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="border border-gray-300 text-gray-700 py-3 px-8 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Back to List
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
