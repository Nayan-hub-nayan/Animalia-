"use client"
import { useState } from "react"
import { useData } from "../../context/DataContext"
import ServiceBookingForm from "./ServiceBookingForm"

type ServiceType = {
  id: string
  name: string
  icon: string
  price?: string
}

type SelectedPetType = {
  id: string
  name: string
  owner: string
  phone: string
}

export default function PetsContent() {
  const { pets } = useData()
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const services: ServiceType[] = [
    { id: "checkup", name: "General Health Checkup", icon: "🩺", price: "₹500" },
    { id: "vaccination", name: "Vaccination", icon: "💉", price: "₹300" },
    { id: "surgery", name: "Surgery Consultation", icon: "🏥", price: "₹1500" },
    { id: "grooming", name: "Grooming", icon: "✨", price: "₹800" },
    { id: "dental", name: "Dental Care", icon: "🦷", price: "₹600" },
    { id: "emergency", name: "Emergency Care", icon: "🚨", price: "₹2000" },
  ]

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedPetData = pets.find((pet) => pet.id === selectedPet)

  const handleServiceBook = (service: ServiceType) => {
    setSelectedService(service)
    setShowServiceForm(true)
  }

  if (selectedPet && selectedPetData) {
    return (
      <div className="space-y-8">
        {/* Pet Details Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <button
            onClick={() => setSelectedPet(null)}
            className="mb-4  text-blue-600 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
          >
            <span className="mr-2">←</span>
            Back to All Pets
          </button>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white bg-opacity-20 flex items-center justify-center">
              {selectedPetData.image ? (
                <img
                  src={selectedPetData.image}
                  alt={selectedPetData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">🐾</span>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{selectedPetData.name}</h2>
              <p className="text-purple-100">
                {selectedPetData.species} • {selectedPetData.breed}
              </p>
              <p className="text-purple-100">Owner: {selectedPetData.owner}</p>
            </div>
          </div>
        </div>

        {/* Pet Info */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Pet Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-600">Age:</span><span>{selectedPetData.age}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Weight:</span><span>{selectedPetData.weight}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Color:</span><span>{selectedPetData.color}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Gender:</span><span>{selectedPetData.gender}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Last Visit:</span><span>{selectedPetData.lastVisit}</span></div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">👤</span>
              Owner Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-600">Name:</span><span>{selectedPetData.owner}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Phone:</span><span>{selectedPetData.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Email:</span><span>{selectedPetData.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Address:</span><span>{selectedPetData.address}</span></div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="mr-2">🩺</span>
              Available Services for {selectedPetData.name}
            </h3>
            <p className="text-gray-600 text-sm">Choose a service to book an appointment</p>
          </div>
          <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-lg font-semibold text-green-600">{service.price}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                <button
                  onClick={() => handleServiceBook(service)}
                  className="w-full bg-black text-white hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        <ServiceBookingForm
          isOpen={showServiceForm}
          onClose={() => setShowServiceForm(false)}
          selectedService={selectedService || undefined}
          selectedPet={{
            id: selectedPetData.id,
            name: selectedPetData.name,
            owner: selectedPetData.owner,
            phone: selectedPetData.phone,
          }}
        />
      </div>
    )
  }

  // Default View - Pets List
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold text-gray-900">Pets & Animals</h2>
        <p className="text-purple-600 mt-2">View all registered pets and their profiles</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <input
          type="text"
          placeholder="Search pets by name, species, or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            onClick={() => setSelectedPet(pet.id)}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition cursor-pointer group"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {pet.image ? (
                    <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🐾</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{pet.name}</h3>
                  <p className="text-gray-600">{pet.species} • {pet.breed}</p>
                  <p className="text-sm text-gray-500">{pet.age}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Owner:</span><span>{pet.owner}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Last Visit:</span><span>{pet.lastVisit}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Phone:</span><span>{pet.phone}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button         className="w-full bg-black text-white hover:bg-white hover:text-black border border-black py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
>
                  <span>👁️</span>
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🐾</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
          <p className="text-gray-600">Try adjusting your search terms or add a new pet.</p>
        </div>
      )}
    </div>
  )
}
