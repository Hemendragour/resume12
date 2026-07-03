import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useResumeStore } from "../../../../store/resume.store";

import {
  getResumeById,
} from "../../services/resume.service";

import type {
  Resume,
} from "../../types/resume.types";

export const useResume = () => {

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const resume = useResumeStore(
  (state) => state.resume
);

const setResume = useResumeStore(
  (state) => state.setResume
);

  const fetchResume = async () => {

    if (!id) return;

    try {

      const data =
        await getResumeById(id);

      setResume(data);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchResume();

  }, [id]);

  return {

    loading,

    resume,

    setResume,

    refetch: fetchResume,

  };

};