import type { Resume } from "../hooks/useResumes";

interface Props {

  resume: Resume;

}

export default function ResumeCard({

  resume,

}: Props) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold">

        {resume.title}

      </h2>

      <p className="text-gray-500 mt-2">

        Template : {resume.templateId}

      </p>

      <p className="text-gray-500">

        Version : {resume.version}

      </p>

      <div className="mt-5 flex gap-3">

        <button className="bg-blue-600 text-white px-4 py-2 rounded">

          Edit

        </button>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded">

          Duplicate

        </button>

        <button className="bg-red-600 text-white px-4 py-2 rounded">

          Delete

        </button>

      </div>

    </div>

  );

}