"use client";

import { SignupFormData } from "@/types";

interface Step2Props {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2PersonalInfo({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Personal Information
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about yourself to create your health profile
        </p>
      </div>
      <div className="p-6">
        {/* ...existing form content will be replaced */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name *
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) =>
                    updateFormData({ firstName: e.target.value })
                  }
                  placeholder="First name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name *
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  placeholder="Last name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of birth *
              </label>
              <div className="mt-1">
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  autoComplete="bday"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    updateFormData({ dateOfBirth: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender *
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                  className="min-h-[44px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number *
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Address</h3>

            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street address *
              </label>
              <div className="mt-1">
                <input
                  id="street"
                  name="street"
                  type="text"
                  autoComplete="street-address"
                  value={formData.address.street}
                  onChange={(e) =>
                    updateFormData({
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  placeholder="123 Main St"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City *
                </label>
                <div className="mt-1">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.address.city}
                    onChange={(e) =>
                      updateFormData({
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    placeholder="City"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State *
                </label>
                <div className="mt-1">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    value={formData.address.state}
                    onChange={(e) =>
                      updateFormData({
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                    placeholder="CA"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP code *
                </label>
                <div className="mt-1">
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      updateFormData({
                        address: {
                          ...formData.address,
                          zipCode: e.target.value,
                        },
                      })
                    }
                    placeholder="12345"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="emergencyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="emergencyName"
                    name="emergencyName"
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) =>
                      updateFormData({
                        emergencyContact: {
                          ...formData.emergencyContact,
                          name: e.target.value,
                        },
                      })
                    }
                    placeholder="Emergency contact name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="emergencyRelationship"
                  className="block text-sm font-medium text-gray-700"
                >
                  Relationship
                </label>
                <div className="mt-1">
                  <input
                    id="emergencyRelationship"
                    name="emergencyRelationship"
                    type="text"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) =>
                      updateFormData({
                        emergencyContact: {
                          ...formData.emergencyContact,
                          relationship: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Spouse, Parent"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="emergencyPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) =>
                    updateFormData({
                      emergencyContact: {
                        ...formData.emergencyContact,
                        phone: e.target.value,
                      },
                    })
                  }
                  placeholder="(555) 123-4567"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-10 px-4 py-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
            >
              Continue to Insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
