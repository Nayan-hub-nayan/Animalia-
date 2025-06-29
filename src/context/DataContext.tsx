"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: string
  weight: string
  color: string
  gender: string
  owner: string
  phone: string
  email: string
  address: string
  image: string
  dateAdded: string
  lastVisit: string
  medicalHistory: string[]
  vaccinations: string[]
}

interface OPDRecord {
  id: string
  petId: string
  petName: string
  owner: string
  symptoms: string
  severity: string
  duration: string
  images: string[]
  documents: string[]
  status: string
  doctor: string
  date: string
  diagnosis?: string
  treatment?: string
}

interface Appointment {
  id: string
  petId: string
  petName: string
  owner: string
  service: string
  date: string
  time: string
  doctor: string
  location: string
  status: string
  notes: string
  phone: string
}

interface DataContextType {
  pets: Pet[]
  opdRecords: OPDRecord[]
  appointments: Appointment[]
  addPet: (pet: Omit<Pet, "id" | "dateAdded" | "lastVisit">) => void
  addOPDRecord: (record: Omit<OPDRecord, "id" | "date">) => void
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  updatePet: (id: string, updates: Partial<Pet>) => void
  getPetById: (id: string) => Pet | undefined
  getStats: () => {
    totalPets: number
    todayAppointments: number
    pendingRecords: number
    emergencyCases: number
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([])
  const [opdRecords, setOpdRecords] = useState<OPDRecord[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPets = localStorage.getItem("vet-pets")
    const savedOPDRecords = localStorage.getItem("vet-opd-records")
    const savedAppointments = localStorage.getItem("vet-appointments")

    if (savedPets) setPets(JSON.parse(savedPets))
    if (savedOPDRecords) setOpdRecords(JSON.parse(savedOPDRecords))
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments))

    // Add sample data if no data exists
    if (!savedPets) {
      const samplePets: Pet[] = [
        {
          id: "1",
          name: "Max",
          species: "Dog",
          breed: "Golden Retriever",
          age: "3 years",
          weight: "30 kg",
          color: "Golden",
          gender: "Male",
          owner: "John Smith",
          phone: "+1-234-567-8901",
          email: "john@example.com",
          address: "123 Main St, City",
          image: "",
          dateAdded: "2024-01-01",
          lastVisit: "2024-01-15",
          medicalHistory: ["Vaccination completed", "Regular checkup"],
          vaccinations: ["Rabies", "DHPP"],
        },
        {
          id: "2",
          name: "Bella",
          species: "Cat",
          breed: "Persian",
          age: "2 years",
          weight: "4 kg",
          color: "White",
          gender: "Female",
          owner: "Sarah Johnson",
          phone: "+1-234-567-8902",
          email: "sarah@example.com",
          address: "456 Oak Ave, City",
          image: "",
          dateAdded: "2024-01-05",
          lastVisit: "2024-01-10",
          medicalHistory: ["Spaying completed", "Dental cleaning"],
          vaccinations: ["FVRCP", "Rabies"],
        },
      ]
      setPets(samplePets)
      localStorage.setItem("vet-pets", JSON.stringify(samplePets))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("vet-pets", JSON.stringify(pets))
  }, [pets])

  useEffect(() => {
    localStorage.setItem("vet-opd-records", JSON.stringify(opdRecords))
  }, [opdRecords])

  useEffect(() => {
    localStorage.setItem("vet-appointments", JSON.stringify(appointments))
  }, [appointments])

  const addPet = (petData: Omit<Pet, "id" | "dateAdded" | "lastVisit">) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toISOString().split("T")[0],
      medicalHistory: [],
      vaccinations: [],
    }
    setPets((prev) => [...prev, newPet])
  }

  const addOPDRecord = (recordData: Omit<OPDRecord, "id" | "date">) => {
    const newRecord: OPDRecord = {
      ...recordData,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    }
    setOpdRecords((prev) => [...prev, newRecord])
    console.log("New OPD Record:", JSON.stringify(newRecord, null, 2))
  }

  const addAppointment = (appointmentData: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
    }
    setAppointments((prev) => [...prev, newAppointment])
    console.log("New Appointment:", JSON.stringify(newAppointment, null, 2))
  }

  const updatePet = (id: string, updates: Partial<Pet>) => {
    setPets((prev) => prev.map((pet) => (pet.id === id ? { ...pet, ...updates } : pet)))
  }

  const getPetById = (id: string) => {
    return pets.find((pet) => pet.id === id)
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

  return (
    <DataContext.Provider
      value={{
        pets,
        opdRecords,
        appointments,
        addPet,
        addOPDRecord,
        addAppointment,
        updatePet,
        getPetById,
        getStats,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
