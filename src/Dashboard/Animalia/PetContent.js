"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import ServiceBookingForm from "./ServiceBookingForm"

export default function PetsContent() {
  const { pets } = useData()
  const [selectedPet, setSelectedPet] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    { id: "1", name: "General Health Checkup", icon: "🩺", price: "₹500" },
    { id: "2", name: "Vaccination", icon: "💉", price: "₹300" },
    { id: "3", name: "Surgery Consultation", icon: "🏥", price: "₹1000" },
    { id: "4", name: "Grooming", icon: "✂️", price: "₹800" },
    { id: "5", name: "Dental Care", icon: "🦷", price: "₹1200" },
    { id: "6", name: "Emergency Care", icon: "🚨", price: "₹2000" },
  ]

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (pet) => {
    setSelectedPet(pet)
    setShowDetails(true)
    setShowBookingForm(false)
  }

  const handleBookService = (service) => {
    setSelectedService(service)
    setShowBookingForm(true)
    setShowDetails(false)
  }

  const handleBackToList = () => {
    setShowDetails(false)
    setShowBookingForm(false)
    setSelectedPet(null)
    setSelectedService(null)
  }

  // Show booking form
  if (showBookingForm) {
    return (
      <ServiceBookingForm
        selectedService={selectedService}
        selectedPet={selectedPet}
        onBack={handleBackToList}
      />
    )
  }

  // Show pet details
  if (showDetails && selectedPet) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">{selectedPet.name}</h2>
              <p className="text-blue-100 text-lg mt-2">
                {selectedPet.species} • {selectedPet.breed}
              </p>
            </div>
            <button
              onClick={handleBackToList}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pet Image */}
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
            {selectedPet.image ? (
              <img
                src={selectedPet.image || "/placeholder.svg"}
                alt={selectedPet.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">
                {selectedPet.species === "Dog" ? "🐕" : selectedPet.species === "Cat" ? "🐱" : "🐾"}
              </span>
            )}
          </div>
        </div>

        {/* Pet Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">🐾</span>
              Pet Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="font-semibold text-gray-900">{selectedPet.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Species:</span>
                <span className="font-semibold text-gray-900">{selectedPet.species}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Breed:</span>
                <span className="font-semibold text-gray-900">{selectedPet.breed || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Age:</span>
                <span className="font-semibold text-gray-900">{selectedPet.age || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Weight:</span>
                <span className="font-semibold text-gray-900">{selectedPet.weight || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Color:</span>
                <span className="font-semibold text-gray-900">{selectedPet.color || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Gender:</span>
                <span className="font-semibold text-gray-900">{selectedPet.gender}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">👤</span>
              Owner Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="font-semibold text-gray-900">{selectedPet.owner}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="font-semibold text-gray-900">{selectedPet.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="font-semibold text-gray-900">{selectedPet.email || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="font-semibold text-gray-900">{selectedPet.address || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Last Visit:</span>
                <span className="font-semibold text-gray-900">{selectedPet.lastVisit || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        {(selectedPet.medicalHistory?.length > 0 || selectedPet.vaccinations?.length > 0) && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">🏥</span>
              Medical Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedPet.medicalHistory?.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Medical History:</h4>
                  <div className="space-y-2">
                    {selectedPet.medicalHistory.map((history, index) => (
                      <p key={index} className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {history}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {selectedPet.vaccinations?.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Vaccinations:</h4>
                  <div className="space-y-2">
                    {selectedPet.vaccinations.map((vaccination, index) => (
                      <p key={index} className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {vaccination}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Available Services */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🩺</span>
            Available Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleBookService(service)}
                className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{service.name}</div>
                <div className="text-xs text-green-600 font-semibold">{service.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setSelectedPet(selectedPet)
              setShowBookingForm(true)
              setShowDetails(false)
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <span>📅</span>
            <span>Book Service</span>
          </button>
          <button
            onClick={handleBackToList}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Back to List
          </button>
        </div>
      </div>
    )
  }

  // Show main pets list
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold">Pets & Animals</h2>
        <p className="text-purple-100 mt-2">Manage all registered pets and their profiles</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search pets by name, owner, or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <span>🔍</span>
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                {pet.image ? (
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl">
                      {pet.species === "Dog" ? "🐕" : pet.species === "Cat" ? "🐱" : "🐾"}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                  {pet.species}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                  <p className="text-gray-600">
                    {pet.breed} • {pet.age} • {pet.gender}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Owner: {pet.owner}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{pet.weight || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">{pet.color || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Visit:</span>
                    <span className="font-medium">{pet.lastVisit}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(pet)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPet(pet)
                      setShowBookingForm(true)
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <span className="text-6xl mb-4 block">🐾</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-600">Try adjusting your search or add a new pet</p>
          </div>
        )}
      </div>
    </div>
  )
}
