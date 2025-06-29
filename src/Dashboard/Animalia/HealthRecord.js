"use client"

import { useState } from "react"

export default function HealthRecordsContent() {
  const [activeTab, setActiveTab] = useState("records")
  const [searchTerm, setSearchTerm] = useState("")

  const healthRecords = [
    {
      id: 1,
      petName: "Max",
      date: "2024-01-15",
      type: "General Checkup",
      doctor: "Dr. Sarah Wilson",
      diagnosis: "Healthy, minor ear infection treated",
      medications: "Antibiotic ear drops",
      nextVisit: "2024-02-15",
    },
    {
      id: 2,
      petName: "Bella",
      date: "2024-01-10",
      type: "Vaccination",
      doctor: "Dr. Mike Brown",
      diagnosis: "Annual vaccination completed",
      medications: "Rabies, DHPP vaccines",
      nextVisit: "2025-01-10",
    },
    {
      id: 3,
      petName: "Charlie",
      date: "2024-01-08",
      type: "Surgery",
      doctor: "Dr. Emily Davis",
      diagnosis: "Successful tumor removal",
      medications: "Pain medication, antibiotics",
      nextVisit: "2024-01-22",
    },
  ]

  const vaccinations = [
    {
      petName: "Max",
      vaccine: "Rabies",
      date: "2024-01-15",
      nextDue: "2025-01-15",
      status: "Current",
    },
    {
      petName: "Max",
      vaccine: "DHPP",
      date: "2024-01-15",
      nextDue: "2025-01-15",
      status: "Current",
    },
    {
      petName: "Bella",
      vaccine: "FVRCP",
      date: "2024-01-10",
      nextDue: "2025-01-10",
      status: "Current",
    },
  ]

  const testReports = [
    {
      id: 1,
      petName: "Max",
      testType: "Blood Work",
      date: "2024-01-15",
      results: "Normal",
      doctor: "Dr. Sarah Wilson",
    },
    {
      id: 2,
      petName: "Charlie",
      testType: "X-Ray",
      date: "2024-01-08",
      results: "Tumor identified",
      doctor: "Dr. Emily Davis",
    },
  ]

  const getResultsColor = (results: string) => {
    return results === "Normal" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">❤️</span>
        <div>
          <h2 className="text-3xl font-bold text-red-600">Health Records & Certificates</h2>
          <p className="text-gray-600 mt-2">Complete medical history and downloadable certificates</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by pet name, doctor, or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <span>🔍</span>
            <span>Search</span>
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <span>📥</span>
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "records", label: "Medical Records" },
              { id: "vaccinations", label: "Vaccinations" },
              { id: "tests", label: "Test Reports" },
              { id: "certificates", label: "Certificates" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "records" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Visit History</h3>
                <p className="text-gray-600 text-sm mb-4">Complete record of all veterinary visits</p>
              </div>
              <div className="space-y-4">
                {healthRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{record.petName}</h3>
                        <p className="text-sm text-blue-600">{record.type}</p>
                        <p className="text-sm text-gray-500">Dr: {record.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{record.date}</p>
                        <button className="mt-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1">
                          <span>📥</span>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="font-medium text-gray-900">Diagnosis:</p>
                        <p className="text-gray-600">{record.diagnosis}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Medications:</p>
                        <p className="text-gray-600">{record.medications}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm flex items-center">
                        <span className="mr-1">📅</span>
                        <span className="font-medium">Next Visit:</span>
                        <span className="ml-1">{record.nextVisit}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "vaccinations" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vaccination Records</h3>
                <p className="text-gray-600 text-sm mb-4">Track vaccination history and upcoming schedules</p>
              </div>
              <div className="space-y-4">
                {vaccinations.map((vaccination, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <span className="text-xl">💉</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{vaccination.petName}</h3>
                          <p className="text-sm text-gray-500">{vaccination.vaccine} Vaccine</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full mb-1 block">
                          {vaccination.status}
                        </span>
                        <p className="text-xs text-gray-500">Given: {vaccination.date}</p>
                        <p className="text-xs text-gray-500">Next Due: {vaccination.nextDue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tests" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Laboratory & Test Reports</h3>
                <p className="text-gray-600 text-sm mb-4">Diagnostic test results and reports</p>
              </div>
              <div className="space-y-4">
                {testReports.map((test) => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <span className="text-xl">📋</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{test.petName}</h3>
                          <p className="text-sm text-blue-600">{test.testType}</p>
                          <p className="text-sm text-gray-500">Dr: {test.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{test.date}</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getResultsColor(test.results)}`}>
                          {test.results}
                        </span>
                        <div className="mt-2">
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-1">
                            <span>📥</span>
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Certificates</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Downloadable health certificates for travel, shows, and official purposes
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Travel Health Certificate</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Valid
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Official health certificate for domestic and international travel
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                      <span>📥</span>
                      <span>Download PDF</span>
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Generate New
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Vaccination Certificate</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Complete vaccination record certificate</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                      <span>📥</span>
                      <span>Download PDF</span>
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Update
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Show/Competition Certificate</h4>
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Health certificate for pet shows and competitions</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Generate Certificate
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">General Health Certificate</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Valid
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">General health status certificate for various purposes</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                      <span>📥</span>
                      <span>Download PDF</span>
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Renew
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
