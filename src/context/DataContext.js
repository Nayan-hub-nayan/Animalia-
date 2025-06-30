"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [pets, setPets] = useState([])
  const [opdRecords, setOpdRecords] = useState([])
  const [appointments, setAppointments] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPets = localStorage.getItem("vetcare_pets")
    const savedOpdRecords = localStorage.getItem("vetcare_opd_records")
    const savedAppointments = localStorage.getItem("vetcare_appointments")

    if (savedPets) {
      setPets(JSON.parse(savedPets))
    }
    if (savedOpdRecords) {
      setOpdRecords(JSON.parse(savedOpdRecords))
    }
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("vetcare_pets", JSON.stringify(pets))
  }, [pets])

  useEffect(() => {
    localStorage.setItem("vetcare_opd_records", JSON.stringify(opdRecords))
  }, [opdRecords])

  useEffect(() => {
    localStorage.setItem("vetcare_appointments", JSON.stringify(appointments))
  }, [appointments])

  const addPet = (petData) => {
    const newPet = {
      id: Date.now().toString(),
      ...petData,
      registrationDate: new Date().toISOString(),
      lastVisit: new Date().toISOString().split("T")[0],
    }
    setPets((prev) => [...prev, newPet])
  }

  const addOPDRecord = (recordData) => {
    const newRecord = {
      id: Date.now().toString(),
      ...recordData,
      date: new Date().toISOString().split("T")[0],
      submittedAt: new Date().toISOString(),
    }
    setOpdRecords((prev) => [...prev, newRecord])
  }

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      bookingDate: new Date().toISOString(),
      status: "Pending",
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  const getStats = () => {
    const today = new Date().toISOString().split("T")[0]
    return {
      totalPets: pets.length,
      todayAppointments: appointments.filter((apt) => apt.date === today).length,
      pendingRecords: opdRecords.filter((record) => record.status === "Pending").length,
      emergencyCases: opdRecords.filter((record) => record.severity === "Critical").length,
    }
  }

  const value = {
    pets,
    opdRecords,
    appointments,
    addPet,
    addOPDRecord,
    addAppointment,
    getStats,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
