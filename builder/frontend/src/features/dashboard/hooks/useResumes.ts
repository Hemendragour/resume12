import { useEffect, useState } from "react";

import { getAllResumes } from "../services/resume.service";

export interface Resume {

  _id: string;

  title: string;

  version: number;

  templateId: string;

  updatedAt: string;
}

export const useResumes = () => {

  const [loading, setLoading] = useState(true);

  const [resumes, setResumes] = useState<Resume[]>([]);

  const fetchResumes = async () => {

    try {

      const data = await getAllResumes();

      setResumes(data.resumes);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchResumes();

  }, []);

  return {

    resumes,

    loading,

    refetch: fetchResumes,

  };

};