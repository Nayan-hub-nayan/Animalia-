"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "../../context/DataContext"

export default function AppointmentsContent() {
  const { pets, appointments, addAppointment } = useData()
  const [formData, setFormData] = useState({
    petId: "",
    petName: "",
    owner: "",
    service: "",
    date: "",
    time: "",
    doctor: "",
    location: "",
    status: "Pending",
    notes: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "petId") {
      const selectedPet = pets.find((pet) => pet.id === value)
      if (selectedPet) {
        setFormData((prev) => ({
          ...prev,
          petName: selectedPet.name,
          owner: selectedPet.owner,
          phone: selectedPet.phone,
        }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addAppointment(formData)

    // Reset form
    setFormData({
      petId: "",
      petName: "",
      owner: "",
      service: "",
      date: "",
      time: "",
      doctor: "",
      location: "",
      status: "Pending",
      notes: "",
      phone: "",
    })

    alert("Appointment booked successfully!")
  }

  const getStatusColor = (status: string) => {
    return status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
        <p className="text-gray-600 mt-2-">Schedule and manage appointments</p>
      </div>

      {/* Book New Appointment */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📅</span>
            Book New Appointment
          </h3>
          <p className="text-gray-600 text-sm">Schedule a 2-3 hour appointment slot</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select service</option>
                <option value="General Health Checkup">General Health Checkup</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Surgery Consultation">Surgery Consultation</option>
                <option value="Grooming">Grooming</option>
                <option value="Emergency">Emergency</option>
                <option value="Dental Care">Dental Care</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select time slot</option>
                <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM</option>
                <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select doctor</option>
                <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
                <option value="Dr. Mike Brown">Dr. Mike Brown</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                <option value="Any Available">Any Available</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select location</option>
                <option value="Main Clinic">Main Clinic</option>
                <option value="Branch Clinic">Branch Clinic</option>
                <option value="Home Visit">Home Visit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contact phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special requirements or notes"
            />
          </div>

         <button
  type="submit"
  className="w-full bg-black text-white hover:bg-white hover:text-black border border-black py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
>
            <span>📅</span>
            <span>Book Appointment</span>
          </button>
        </form>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">📋</span>
            All Appointments
          </h3>
          <p className="text-gray-600 text-sm">Your scheduled appointments</p>
        </div>
        <div className="p-6 space-y-4">
          {appointments.length > 0 ? (
            appointments
              .slice()
              .reverse()
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.petName}</h3>
                      <p className="text-sm text-gray-500">Owner: {appointment.owner}</p>
                      <p className="text-sm font-medium text-blue-600">{appointment.service}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span>📅</span>
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🕐</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span>👨‍⚕️</span>
                        <span>{appointment.doctor || "Not assigned"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📍</span>
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Reschedule
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Cancel
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Contact Clinic
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📅</span>
              <p>No appointments scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
