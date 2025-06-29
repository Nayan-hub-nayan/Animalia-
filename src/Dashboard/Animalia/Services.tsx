"use client"

import { useState } from "react"
import ServiceBookingForm from "./ServiceBookingForm"

type SelectedService = {
  id: string
  name: string
  icon: string
  price?: string
}

export default function ServicesContent() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null)

  const services = [
    {
      id: "self-check",
      title: "Self Check",
      description: "Owner fills simple online form with symptoms, photos, food intake, etc.",
      icon: "📋",
      color: "bg-blue-100 text-blue-600",
      available: true,
      price: "₹200",
    },
    {
      id: "vaccination",
      title: "Vaccination",
      description: "Date-wise scheduler with email/SMS reminders",
      icon: "💉",
      color: "bg-green-100 text-green-600",
      available: true,
      price: "₹300",
    },
    {
      id: "health-checkup",
      title: "General Health Checkup",
      description: "Book appointment and share past records",
      icon: "🩺",
      color: "bg-purple-100 text-purple-600",
      available: true,
      price: "₹500",
    },
    {
      id: "breeding",
      title: "Artificial Insemination (Breeding)",
      description: "For livestock breeding - request expert visit",
      icon: "❤️",
      color: "bg-pink-100 text-pink-600",
      available: true,
      price: "₹1500",
    },
    {
      id: "surgery",
      title: "Surgery",
      description: "Submit report/photos, book consultation or surgery slot",
      icon: "✂️",
      color: "bg-red-100 text-red-600",
      available: true,
      price: "₹2000",
    },
    {
      id: "consultancy",
      title: "Consultancy",
      description: "Farm Animal/Poultry/Exotic Pet expert - Chat or video consult",
      icon: "💬",
      color: "bg-orange-100 text-orange-600",
      available: true,
      price: "₹800",
    },
    {
      id: "grooming",
      title: "Grooming",
      description: "Book grooming services - Home visit or center-based",
      icon: "✨",
      color: "bg-yellow-100 text-yellow-600",
      available: true,
      price: "₹600",
    },
  ]

  const handleBookService = (service: (typeof services)[0]) => {
    setSelectedService({
      id: service.id,
      name: service.title,
      icon: service.icon,
      price: service.price,
    })
    setShowBookingForm(true)
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Services Selection</h2>
        <p className="text-green-600 mt-2">Choose from available services for your pets</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${service.color}`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div className="text-right">
                  {service.available && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full block mb-1">
                      Available
                    </span>
                  )}
                  <span className="text-lg font-bold text-green-600">{service.price}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
              <button
                onClick={() => handleBookService(service)}
                className="w-full bg-black text-white hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >         
                <span>📅</span>
                <span>Book Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Categories */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="mr-2">🏥</span>
            Service Categories by Animal Type
          </h3>
          <p className="text-gray-600 text-sm">Different services available for different animal types</p>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>🐕🐱🐰</span>
                <span>Pets (Dogs, Cats, Rabbits)</span>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• General Health Checkup</li>
                <li>• Vaccination</li>
                <li>• Surgery</li>
                <li>• Grooming</li>
                <li>• Emergency Care</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>🐄🐃🐐🐎</span>
                <span>Livestock</span>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Health Checkup</li>
                <li>• Vaccination</li>
                <li>• Artificial Insemination</li>
                <li>• Surgery</li>
                <li>• Farm Consultancy</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>🐔🦜</span>
                <span>Poultry & Exotic</span>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Specialized Health Checkup</li>
                <li>• Vaccination Programs</li>
                <li>• Expert Consultancy</li>
                <li>• Emergency Care</li>
                <li>• Breeding Consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Service Booking Form Modal */}
      <ServiceBookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        selectedService={selectedService || undefined} // Convert null to undefined
      />
    </div>
  )
}
