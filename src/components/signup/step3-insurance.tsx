"use client";

import { SignupFormData } from "@/types";

interface Step3Props {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Insurance({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step3Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Insurance Information
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Please provide your insurance details for coverage verification
        </p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="insuranceProvider"
              className="block text-sm font-medium text-gray-700"
            >
              Insurance provider *
            </label>
            <div className="mt-1">
              <select
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) =>
                  updateFormData({ insuranceProvider: e.target.value })
                }
                className="min-h-[44px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your insurance provider</option>
                <option value="aetna">Aetna</option>
                <option value="anthem">Anthem Blue Cross</option>
                <option value="blue-cross">Blue Cross Blue Shield</option>
                <option value="cigna">Cigna</option>
                <option value="humana">Humana</option>
                <option value="kaiser">Kaiser Permanente</option>
                <option value="medicare">Medicare</option>
                <option value="medicaid">Medicaid</option>
                <option value="molina">Molina Healthcare</option>
                <option value="united">UnitedHealthcare</option>
                <option value="other">Other</option>
                <option value="none">No insurance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="policyNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Policy number *
              </label>
              <div className="mt-1">
                <input
                  id="policyNumber"
                  name="policyNumber"
                  type="text"
                  value={formData.policyNumber}
                  onChange={(e) =>
                    updateFormData({ policyNumber: e.target.value })
                  }
                  placeholder="Policy/Member ID"
                  className="min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="groupNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Group number
              </label>
              <div className="mt-1">
                <input
                  id="groupNumber"
                  name="groupNumber"
                  type="text"
                  value={formData.groupNumber}
                  onChange={(e) =>
                    updateFormData({ groupNumber: e.target.value })
                  }
                  placeholder="Group number (if applicable)"
                  className="min-h-[44px]"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="subscriberName"
              className="block text-sm font-medium text-gray-700"
            >
              Primary subscriber name *
            </label>
            <div className="mt-1">
              <input
                id="subscriberName"
                name="subscriberName"
                type="text"
                value={formData.subscriberName}
                onChange={(e) =>
                  updateFormData({ subscriberName: e.target.value })
                }
                placeholder="Name on insurance card"
                className="min-h-[44px]"
              />
              <p className="mt-1 text-xs text-gray-500">
                This is the person whose name appears as the primary on the
                insurance card
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subscriberDateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Subscriber date of birth
              </label>
              <div className="mt-1">
                <input
                  id="subscriberDateOfBirth"
                  name="subscriberDateOfBirth"
                  type="date"
                  value={formData.subscriberDateOfBirth}
                  onChange={(e) =>
                    updateFormData({ subscriberDateOfBirth: e.target.value })
                  }
                  className="min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="relationshipToSubscriber"
                className="block text-sm font-medium text-gray-700"
              >
                Relationship to subscriber *
              </label>
              <div className="mt-1">
                <select
                  id="relationshipToSubscriber"
                  name="relationshipToSubscriber"
                  value={formData.relationshipToSubscriber}
                  onChange={(e) =>
                    updateFormData({ relationshipToSubscriber: e.target.value })
                  }
                  className="min-h-[44px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Insurance verification
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    We will verify your insurance coverage and benefits after
                    you complete registration. You may be contacted if
                    additional information is needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md bg-gray-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Continue to Medical History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
