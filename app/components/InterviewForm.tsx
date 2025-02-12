"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useInterviewStore, type Interview } from "../../store/interviewStore"
import { useNotification } from "./Notification"
import { toZonedTime } from "date-fns-tz"

export default function InterviewForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addInterview, updateInterview, getInterview } = useInterviewStore()
  const { showNotification } = useNotification()

  const [interview, setInterview] = useState<Interview>({
    id: "",
    candidateName: "",
    interviewerName: "",
    dateTime: "",
    type: "Technical",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  useEffect(() => {
    if (id) {
      const existingInterview = getInterview(id)
      if (existingInterview) {
        setInterview(existingInterview)
      }
    }
  }, [id, getInterview])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInterview((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedInterview = {
      ...interview,
      dateTime: toZonedTime(new Date(interview.dateTime), interview.timeZone).toISOString(),
    }
    if (id) {
      updateInterview(id, updatedInterview)
      showNotification("Interview updated successfully", "success")
    } else {
      addInterview({ ...updatedInterview, id: Date.now().toString() })
      showNotification("Interview scheduled successfully", "success")
    }
    navigate("/")
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">{id ? "Edit Interview" : "Schedule Interview"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
            Candidate Name
          </label>
          <input
            type="text"
            id="candidateName"
            name="candidateName"
            value={interview.candidateName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="interviewerName" className="block text-sm font-medium text-gray-700">
            Interviewer Name
          </label>
          <input
            type="text"
            id="interviewerName"
            name="interviewerName"
            value={interview.interviewerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={interview.dateTime.slice(0, 16)}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Interview Type
          </label>
          <select
            id="type"
            name="type"
            value={interview.type}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
            Time Zone
          </label>
          <select
            id="timeZone"
            name="timeZone"
            value={interview.timeZone}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Intl.supportedValuesOf("timeZone").map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id ? "Update Interview" : "Schedule Interview"}
          </button>
        </div>
      </form>
    </div>
  )
}

