"use client"

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import InterviewCalendar from "./components/InterviewCalendar"
import InterviewForm from "./components/InterviewForm"
import InterviewList from "./components/InterviewList"
import { NotificationProvider } from "./components/Notification"
import { CalendarIcon, ListBulletIcon, PlusIcon } from "@heroicons/react/24/outline"

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-800">Interview Scheduler</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      <CalendarIcon className="mr-1 h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/schedule"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      <PlusIcon className="mr-1 h-5 w-5" />
                      Schedule Interview
                    </Link>
                    <Link
                      to="/list"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      <ListBulletIcon className="mr-1 h-5 w-5" />
                      Interview List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="py-10">
            <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<InterviewCalendar />} />
                  <Route path="/schedule" element={<InterviewForm />} />
                  <Route path="/edit/:id" element={<InterviewForm />} />
                  <Route path="/list" element={<InterviewList />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </NotificationProvider>
    </Router>
  )
}

