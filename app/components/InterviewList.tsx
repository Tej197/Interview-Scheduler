"use client"
import { Link } from "react-router-dom"
import { useInterviewStore } from "../../store/interviewStore"
import { useNotification } from "./Notification"
import { toZonedTime, format } from "date-fns-tz"
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"

export default function InterviewList() {
  const { interviews, deleteInterview } = useInterviewStore()
  const { showNotification } = useNotification()

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      deleteInterview(id)
      showNotification("Interview deleted successfully", "success")
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {interviews.map((interview: { id: Key | null | undefined; candidateName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; type: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; interviewerName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; dateTime: string | number | Date; timeZone: any }) => (
          <li key={interview.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {interview.candidateName} - {interview.type}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {interview.interviewerName}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {format(toZonedTime(new Date(interview.dateTime), interview.timeZone), "PPpp", {
                      timeZone: interview.timeZone,
                    })}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <Link to={`/edit/${interview.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button onClick={() => interview.id && handleDelete(interview.id.toString())} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

