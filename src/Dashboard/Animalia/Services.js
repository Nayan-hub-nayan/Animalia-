"use client"

import { useState } from "react"
import ServiceBookingForm from "./ServiceBookingForm"

export default function ServicesContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: "1",
      name: "General Health Checkup",
      icon: "🩺",
      description: "Complete health examination for your pet",
      price: "₹500",
      duration: "30-45 mins",
      features: ["Physical examination", "Weight check", "Temperature check", "Basic consultation"],
    },
    {
      id: "2",
      name: "Vaccination",
      icon: "💉",
      description: "Essential vaccinations to keep your pet healthy",
      price: "₹300-800",
      duration: "15-20 mins",
      features: ["Core vaccines", "Non-core vaccines", "Vaccination record", "Follow-up schedule"],
    },
    {
      id: "3",
      name: "Surgery Consultation",
      icon: "🏥",
      description: "Pre and post-surgery consultation",
      price: "₹1000",
      duration: "45-60 mins",
      features: ["Pre-surgery assessment", "Surgery planning", "Post-op care", "Recovery guidance"],
    },
    {
      id: "4",
      name: "Grooming",
      icon: "✂️",
      description: "Professional grooming services",
      price: "₹800-1500",
      duration: "60-90 mins",
      features: ["Bath & dry", "Hair trimming", "Nail clipping", "Ear cleaning"],
    },
    {
      id: "5",
      name: "Dental Care",
      icon: "🦷",
      description: "Dental cleaning and oral health care",
      price: "₹1200",
      duration: "45-60 mins",
      features: ["Dental cleaning", "Oral examination", "Teeth scaling", "Dental health advice"],
    },
    {
      id: "6",
      name: "Emergency Care",
      icon: "🚨",
      description: "24/7 emergency veterinary services",
      price: "₹2000+",
      duration: "Variable",
      features: ["Immediate care", "Emergency surgery", "Critical monitoring", "24/7 availability"],
    },
    {
      id: "7",
      name: "Self Check",
      icon: "🔍",
      description: "Basic health monitoring and guidance",
      price: "₹200",
      duration: "15-20 mins",
      features: ["Basic health tips", "Self-examination guide", "Health monitoring", "Preventive care"],
    },
    {
      id: "8",
      name: "Artificial Insemination",
      icon: "🧬",
      description: "Professional breeding services",
      price: "₹3000-5000",
      duration: "30-45 mins",
      features: ["Breeding consultation", "AI procedure", "Pregnancy monitoring", "Follow-up care"],
    },
    {
      id: "9",
      name: "Consultancy",
      icon: "💬",
      description: "Expert advice and consultation",
      price: "₹400",
      duration: "20-30 mins",
      features: ["Expert consultation", "Health advice", "Treatment planning", "Second opinion"],
    },
  ]

  const handleBookService = (service) => {
    setSelectedService(service)
    setIsBookingOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="text-green-100 mt-2">Comprehensive veterinary care for your beloved pets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{service.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-semibold text-green-600">{service.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm text-gray-900">{service.duration}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Includes:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleBookService(service)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <span>📅</span>
              <span>Book Service</span>
            </button>
          </div>
        ))}
      </div>

      {/* Service Booking Form */}
      <ServiceBookingForm
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false)
          setSelectedService(null)
        }}
        selectedService={selectedService}
      />
    </div>
  )
}
