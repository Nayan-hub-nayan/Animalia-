export default function EmergencyContent() {
  const nearbyVets = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      clinic: "City Veterinary Hospital",
      distance: "0.5 km",
      availability: "Available Now",
      phone: "+1-234-567-8901",
      specialization: "Emergency Care",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Mike Brown",
      clinic: "Pet Care Emergency Center",
      distance: "1.2 km",
      availability: "Available in 15 mins",
      phone: "+1-234-567-8902",
      specialization: "Surgery & Critical Care",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      clinic: "24/7 Animal Hospital",
      distance: "2.1 km",
      availability: "Available Now",
      phone: "+1-234-567-8903",
      specialization: "Exotic Pets",
      rating: 4.7,
    },
  ]

  const emergencyTips = [
    {
      title: "Poisoning",
      description: "Do not induce vomiting unless instructed. Contact vet immediately.",
      severity: "Critical",
    },
    {
      title: "Severe Bleeding",
      description: "Apply direct pressure with clean cloth. Keep pet calm and warm.",
      severity: "Critical",
    },
    {
      title: "Difficulty Breathing",
      description: "Keep airways clear. Transport to vet immediately in well-ventilated carrier.",
      severity: "Critical",
    },
    {
      title: "Seizures",
      description: "Do not restrain. Clear area of objects. Time the seizure duration.",
      severity: "High",
    },
  ]

  const getSeverityColor = (severity: string) => {
    return severity === "Critical" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
  }

  const getAvailabilityColor = (availability: string) => {
    return availability.includes("Now") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">🚨</span>
        <div>
          <h2 className="text-3xl font-bold text-red-600">Emergency Services</h2>
          <p className="text-gray-600 mt-2">24/7 emergency veterinary care and support</p>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-red-50 border border-red-200 rounded-lg">
          <div className="p-6 border-b border-red-200">
            <h3 className="text-lg font-semibold text-red-700 flex items-center space-x-2">
              <span>📞</span>
              <span>Emergency Hotline</span>
            </h3>
            <p className="text-red-600 text-sm">Direct connect to emergency veterinarian</p>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
              <span>📞</span>
              <span>Call Emergency: 911-VET-HELP</span>
            </button>
            <button className="w-full border border-red-300 text-red-700 hover:bg-red-50 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
              <span>💬</span>
              <span>WhatsApp Emergency</span>
            </button>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg">
          <div className="p-6 border-b border-orange-200">
            <h3 className="text-lg font-semibold text-orange-700">Quick Emergency Report</h3>
            <p className="text-orange-600 text-sm">Submit emergency details for faster response</p>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-colors duration-200">
              Submit Emergency Report
            </button>
            <p className="text-xs text-gray-500">
              Include pet details, symptoms, and location for immediate assistance
            </p>
          </div>
        </div>
      </div>

      {/* Nearest Available Vets */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>📍</span>
            <span>Nearest Available Veterinarians</span>
          </h3>
          <p className="text-gray-600 text-sm">Real-time availability status</p>
        </div>
        <div className="p-6 space-y-4">
          {nearbyVets.map((vet) => (
            <div key={vet.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{vet.name}</h3>
                  <p className="text-sm text-gray-500">{vet.clinic}</p>
                  <p className="text-sm font-medium text-blue-600">{vet.specialization}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getAvailabilityColor(vet.availability)}`}
                  >
                    {vet.availability}
                  </span>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <span className="mr-1">📍</span>
                    {vet.distance}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span>⭐ {vet.rating}</span>
                  <span className="text-gray-500">{vet.phone}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1">
                    <span>📞</span>
                    <span>Call</span>
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                    <span>📍</span>
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency First Aid Tips */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Emergency First Aid Tips</h3>
          <p className="text-gray-600 text-sm">Quick reference for common emergency situations</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {emergencyTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityColor(tip.severity)}`}>
                    {tip.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> These tips are for immediate first aid only. Always contact a veterinarian for
              proper medical treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
