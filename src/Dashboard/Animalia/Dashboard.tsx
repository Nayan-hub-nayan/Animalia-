"use client"
import { Link,  } from "react-router-dom";

import { useData } from "../../context/DataContext"
import { useEffect, useState } from "react"

export default function DashboardContent() {
  const { getStats, pets, opdRecords, appointments } = useData()
  const [currentTime, setCurrentTime] = useState(new Date())
  const stats = getStats()

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

 const quickActions = [
    { title: "Add New Pet", description: "Register a new pet profile", icon: "➕", path: "/dashboard/add-pets" },
    { title: "Schedule Appointment", description: "Book a new appointment", icon: "📅", path: "/dashboard/appoinment", },
    { title: "Emergency Service", description: "Access emergency services", icon: "🚨" ,  path: "/dashboard/service"},
    { title: "View Health Records", description: "Browse pet health records", icon: "📊", path: "/dashboard/opd-record", },
  ]

  const recentActivities = [
    ...pets.slice(-3).map((pet) => ({
      type: "pet",
      message: `New pet registered: ${pet.name} (${pet.species})`,
      time: `${Math.floor(Math.random() * 24)} hours ago`,
      icon: "🐾",
    })),
    ...opdRecords.slice(-2).map((record) => ({
      type: "record",
      message: `OPD record submitted for ${record.petName}`,
      time: `${Math.floor(Math.random() * 12)} hours ago`,
      icon: "📋",
    })),
    ...appointments.slice(-2).map((appointment) => ({
      type: "appointment",
      message: `Appointment scheduled for ${appointment.petName}`,
      time: `${Math.floor(Math.random() * 6)} hours ago`,
      icon: "📅",
    })),
  ].slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header with Live Time */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">Welcome to the Veterinary Management System</p>
      </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{currentTime.toLocaleTimeString()}</div>
            <div className="text-purple-600">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Pets</h3>
            <div className="p-3 rounded-full bg-blue-100">
              <span className="text-2xl">🐾</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalPets}</div>
          <p className="text-xs text-green-600 flex items-center">
            <span className="mr-1">📈</span>
            Live count
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Today's Appointments</h3>
            <div className="p-3 rounded-full bg-green-100">
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.todayAppointments}</div>
          <p className="text-xs text-green-600 flex items-center">
            <span className="mr-1">🔄</span>
            Updated live
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Pending Records</h3>
            <div className="p-3 rounded-full bg-orange-100">
              <span className="text-2xl">📋</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingRecords}</div>
          <p className="text-xs text-orange-600 flex items-center">
            <span className="mr-1">⏳</span>
            Awaiting review
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Emergency Cases</h3>
            <div className="p-3 rounded-full bg-red-100">
              <span className="text-2xl">🚨</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.emergencyCases}</div>
          <p className="text-xs text-red-600 flex items-center">
            <span className="mr-1">🔴</span>
            Critical cases
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="mr-2">⚡</span>
              Quick Actions
            </h3>
            <p className="text-gray-600 text-sm">Frequently used actions</p>
          </div>
          <div className="p-6 space-y-3">
            {quickActions.map((action, index) => (
               <Link
                    to={action.path}>
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 ">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="mr-2">📊</span>
              Recent Activities
            </h3>
            <p className="text-gray-600 text-sm">Latest system activities</p>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-00">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">📝</span>
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
