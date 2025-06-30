import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Dashboard/Admin/Home";
import Dashboard from "./Dashboard";
// import CreditDebitForm from "./Dashboard/Admin/CreditDebitForm";
// import VehicleEntryForm from "./Dashboard/Admin/VehicleEntryForm";
// import DrillingEntryForm from "./Dashboard/Admin/DrillingForm";
// import StockEntryForm from "./Dashboard/Admin/StockEntryForm";
// import AgentProfileForm from "./Dashboard/Admin/AgentProfileForm";

// import BillingForm from "./Dashboard/Admin/BillingForm";
// import PetrolPumpProfile from "./Dashboard/Admin/PetrolPumpProfile";
// import ProfileForm from "./Dashboard/Admin/ProfileForm";
import DashboardOverview from "./Dashboard/Animalia/Dashboard";
import AppointmentsContent from "./Dashboard/Animalia/Appointment";
import DoctorPanelContent from "./Dashboard/Animalia/DoctorPanel";
import EmergencyContent from "./Dashboard/Animalia/Emergency";
import HealthRecordsContent from "./Dashboard/Animalia/HealthRecord";
import OPDRecordContent from "./Dashboard/Animalia/OPDRecord";
import PaymentContent from "./Dashboard/Animalia/Payment";
import PetProfileContent from "./Dashboard/Animalia/AddPets";
import ServicesContent from "./Dashboard/Animalia/Services";
import SettingsContent from "./Dashboard/Animalia/Setting";
import { DataProvider } from "./context/DataContext"
import PetsContent  from "./Dashboard/Animalia/PetContent"






const App = () => {

  return (
    <DataProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Home test="Jadoo"/>} />
  
          <Route element={<Dashboard />}>
            {(
              <>
                <Route path="/dashboard" element={<DashboardOverview/>} />
                <Route path="/dashboard/appoinment" element={<AppointmentsContent/>} />
                <Route path="/dashboard/doctor-panel" element={<DoctorPanelContent />} />
                <Route path="/dashboard/emergency" element={<EmergencyContent />} />
                <Route path="/dashboard/health-record" element={< HealthRecordsContent/>} />
                <Route path="/dashboard/opd-record" element={<OPDRecordContent/>} />
                <Route path="/dashboard/billing" element={<PaymentContent/>} />
                <Route path="/dashboard/add-pets" element={<PetProfileContent />} />
                <Route path="/dashboard/service" element={<ServicesContent/>} />
                <Route path="/dashboard/setting" element={<SettingsContent/>} />
                <Route path="/dashboard/pet-profile" element={<PetsContent/>} />

         
              </>
            )}


          </Route>
        </Routes>
    </Router>
        </DataProvider>

  );
};

const RootApp = () => (
    <App />
);

export default RootApp;
