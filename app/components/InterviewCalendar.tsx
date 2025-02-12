"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useInterviewStore } from "../../store/interviewStore"
import { useNotification } from "./Notification"
import { toZonedTime } from "date-fns-tz"

export default function InterviewCalendar() {
  const { interviews, moveInterview } = useInterviewStore()
  const { showNotification } = useNotification()

  const events = interviews.map((interview: { id: any; candidateName: any; type: any; dateTime: string | number | Date; timeZone: any }) => ({
    id: interview.id,
    title: `${interview.candidateName} - ${interview.type}`,
    start: toZonedTime(new Date(interview.dateTime), interview.timeZone),
    allDay: false,
  }))

  const handleEventDrop = (info: any) => {
    const { event } = info
    moveInterview(event.id, event.start.toISOString())
    showNotification("Interview rescheduled successfully", "success")
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        droppable={true}
        eventDrop={handleEventDrop}
      />
    </div>
  )
}

