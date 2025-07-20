"use client";

import { useState } from "react";
import { SignupFormData } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Step4Props {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4MedicalHistory({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4Props) {
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");

  const addAllergy = () => {
    if (newAllergy.trim()) {
      updateFormData({
        allergies: [...formData.allergies, newAllergy.trim()],
      });
      setNewAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    updateFormData({
      allergies: formData.allergies.filter((_, i) => i !== index),
    });
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      updateFormData({
        medications: [...formData.medications, newMedication.trim()],
      });
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    updateFormData({
      medications: formData.medications.filter((_, i) => i !== index),
    });
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      updateFormData({
        medicalConditions: [...formData.medicalConditions, newCondition.trim()],
      });
      setNewCondition("");
    }
  };

  const removeCondition = (index: number) => {
    updateFormData({
      medicalConditions: formData.medicalConditions.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
        <p className="mt-1 text-sm text-gray-600">
          Help us provide better care by sharing your medical background
        </p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies (medications, foods, environmental)
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add an allergy"
                className="min-h-[44px] flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAllergy())
                }
              />
              <button
                type="button"
                onClick={addAllergy}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {formData.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeAllergy(index)}
                      className="ml-2 text-red-600 hover:text-red-800 cursor-pointer hover:cursor-pointer"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {formData.allergies.length === 0 && (
              <p className="text-sm text-gray-500">No allergies listed</p>
            )}
          </div>

          {/* Current Medications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current medications (including over-the-counter)
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add a medication"
                className="min-h-[44px] flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addMedication())
                }
              />
              <button
                type="button"
                onClick={addMedication}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {formData.medications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.medications.map((medication, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {medication}
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer hover:cursor-pointer"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {formData.medications.length === 0 && (
              <p className="text-sm text-gray-500">No medications listed</p>
            )}
          </div>

          {/* Medical Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical conditions/diagnoses
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add a medical condition"
                className="min-h-[44px] flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCondition())
                }
              />
              <button
                type="button"
                onClick={addCondition}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {formData.medicalConditions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.medicalConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                  >
                    {condition}
                    <button
                      type="button"
                      onClick={() => removeCondition(index)}
                      className="ml-2 text-yellow-600 hover:text-yellow-800 cursor-pointer hover:cursor-pointer"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {formData.medicalConditions.length === 0 && (
              <p className="text-sm text-gray-500">No conditions listed</p>
            )}
          </div>

          {/* Primary Care Physician */}
          <div>
            <label
              htmlFor="primaryCarePhysician"
              className="block text-sm font-medium text-gray-700"
            >
              Primary care physician (if applicable)
            </label>
            <div className="mt-1">
              <input
                id="primaryCarePhysician"
                name="primaryCarePhysician"
                type="text"
                value={formData.primaryCarePhysician}
                onChange={(e) =>
                  updateFormData({ primaryCarePhysician: e.target.value })
                }
                placeholder="Dr. Name or Clinic name"
                className="min-h-[44px]"
              />
            </div>
          </div>

          {/* Emergency Medical Information */}
          <div>
            <label
              htmlFor="emergencyMedicalInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Emergency medical information
            </label>
            <div className="mt-1">
              <textarea
                id="emergencyMedicalInfo"
                name="emergencyMedicalInfo"
                rows={3}
                value={formData.emergencyMedicalInfo}
                onChange={(e) =>
                  updateFormData({ emergencyMedicalInfo: e.target.value })
                }
                placeholder="Any critical medical information for emergency situations (e.g., severe allergies, medical devices, conditions requiring immediate attention)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              This information will be accessible to emergency responders and
              healthcare providers in urgent situations
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Medical information privacy
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    All medical information is protected under HIPAA
                    regulations. This information will only be shared with your
                    authorized healthcare providers and will be kept
                    confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Continue to Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
