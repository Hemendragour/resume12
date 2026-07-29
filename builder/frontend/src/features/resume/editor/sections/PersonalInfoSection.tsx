import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useResumeStore } from "../../../../store/resume.store";

export interface PersonalInfoFormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoSection() {
  const resume = useResumeStore((state) => state.resume);

  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo,
  );

  const { register, reset } = useForm<PersonalInfoFormData>({
    defaultValues: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
  });

  // Existing resume load
  // useEffect(() => {
  //   if (!resume) return;

  //   reset(resume.personalInfo);
  // }, [resume, reset]);

  // Watch all form values

  return (
    <div className="space-y-8">
      <label className="cursor-pointer">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300 hover:bg-slate-50">
          Upload
        </div>

        <input type="file" className="hidden" />
      </label>
      <div className="flex justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-300">
          <span className="text-sm text-gray-500">Photo</span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Full Name</label>

          <input
            {...register("fullName", {
              onChange: (e) =>
                updatePersonalInfo({
                  fullName: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Hemendra Gour"
          />
        </div>

        <div>
          <label className="font-medium">Professional Title</label>

          <input
            {...register("title", {
              onChange: (e) =>
                updatePersonalInfo({
                  title: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>

          <input
            type="email"
            {...register("email", {
              onChange: (e) =>
                updatePersonalInfo({
                  email: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="hemendra@gmail.com"
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>

          <input
            type="tel"
            {...register("phone", {
              onChange: (e) =>
                updatePersonalInfo({
                  phone: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="+91 9876543210"
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Address</label>

          <input
            {...register("address", {
              onChange: (e) =>
                updatePersonalInfo({
                  address: e.target.value,
                }),
            })}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="Bhopal, India"
          />
        </div>

        <div>
          <label className="font-medium">LinkedIn</label>

          <input
           {...register("linkedIn", {
  onChange: (e) =>
    updatePersonalInfo({
      linkedIn: e.target.value,
    }),
})}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <label className="font-medium">GitHub</label>

          <input
           {...register("github", {
  onChange: (e) =>
    updatePersonalInfo({
      github: e.target.value,
    }),
})}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://github.com/..."
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Portfolio</label>

          <input
            type="url"
          {...register("portfolio", {
  onChange: (e) =>
    updatePersonalInfo({
      portfolio: e.target.value,
    }),
})}
            className="mt-2 h-12 w-full rounded-lg border px-4"
            placeholder="https://portfolio.com"
          />
        </div>
      </div>
    </div>
  );
}
