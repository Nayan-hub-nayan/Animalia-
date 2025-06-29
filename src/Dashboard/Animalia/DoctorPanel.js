"use client"

import { useState } from "react"

export default function DoctorPanelContent() {
  const [activeTab, setActiveTab] = useState("cases")

  const pendingCases = [
    {
      id: 1,
      petName: "Max",
      owner: "John Smith",
      species: "Dog",
      symptoms: "Loss of appetite, lethargy",
      submittedDate: "2024-01-15",
      priority: "Medium",
    },
    {
      id: 2,
      petName: "Bella",
      owner: "Sarah Johnson",
      species: "Cat",
      symptoms: "Coughing, difficulty breathing",
      submittedDate: "2024-01-14",
      priority: "High",
    },
  ]

  const todayAppointments = [
    {
      id: 1,
      time: "10:00 AM",
      petName: "Charlie",
      owner: "Mike Wilson",
      service: "General Checkup",
      status: "Confirmed",
    },
    {
      id: 2,
      time: "2:00 PM",
      petName: "Luna",
      owner: "Emma Davis",
      service: "Vaccination",
      status: "Pending",
    },
  ]

  const getPriorityColor = (priority: string) => {
    return priority === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
  }

  const getStatusColor = (status: string) => {
    return status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-4xl">👨‍⚕️</span>
        <div>
          <h2 className="text-3xl font-bold text-blue-600">Doctor Panel</h2>
          <p className="text-gray-600 mt-2">Veterinarian dashboard and case management</p>
        </div>
      </div>

      {/* Doctor Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Today's Cases</h3>
            <span className="text-2xl">📅</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <p className="text-xs text-gray-500">2 pending review</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Appointments</h3>
            <span className="text-2xl">🩺</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">5</div>
          <p className="text-xs text-gray-500">Today's schedule</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Reports Pending</h3>
            <span className="text-2xl">📋</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <p className="text-xs text-gray-500">Awaiting submission</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Certificates</h3>
            <span className="text-2xl">📄</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <p className="text-xs text-gray-500">Issued this week</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "cases", label: "Pending Cases" },
              { id: "appointments", label: "Today's Appointments" },
              { id: "reports", label: "Submit Reports" },
              { id: "certificates", label: "Health Certificates" },
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
          {activeTab === "cases" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cases Awaiting Review</h3>
                <p className="text-gray-600 text-sm mb-4">Pet cases submitted for medical review</p>
              </div>
              <div className="space-y-4">
                {pendingCases.map((case_) => (
                  <div key={case_.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {case_.petName} ({case_.species})
                        </h3>
                        <p className="text-sm text-gray-500">Owner: {case_.owner}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(case_.priority)}`}
                      >
                        {case_.priority} Priority
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-900">Symptoms:</p>
                      <p className="text-sm text-gray-600">{case_.symptoms}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Submitted: {case_.submittedDate}</p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Start Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Schedule</h3>
                <p className="text-gray-600 text-sm mb-4">Appointments scheduled for today</p>
              </div>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appointment.time} - {appointment.petName}
                        </h3>
                        <p className="text-sm text-gray-500">Owner: {appointment.owner}</p>
                        <p className="text-sm text-blue-600">{appointment.service}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          View Records
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Checkup Report</h3>
                <p className="text-gray-600 text-sm mb-4">Complete and submit medical examination reports</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Pet</label>
                    <input
                      type="text"
                      placeholder="Search pet name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Examination Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                  <textarea
                    placeholder="Enter diagnosis details..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Prescribed</label>
                  <textarea
                    placeholder="Enter treatment plan and medications..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Instructions</label>
                  <textarea
                    placeholder="Enter follow-up care instructions..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                  <span>📋</span>
                  <span>Submit Report</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Health Certificate</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Issue health certificates for travel, shows, or general purposes
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                    <input
                      type="text"
                      placeholder="Enter pet name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Health Certificate</option>
                      <option>Vaccination Certificate</option>
                      <option>Travel Certificate</option>
                      <option>Show Certificate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Status</label>
                  <textarea
                    placeholder="Describe current health status..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                  <span>📄</span>
                  <span>Generate Certificate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
