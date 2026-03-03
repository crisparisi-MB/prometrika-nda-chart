import React from 'react';
import { useIndications } from '../hooks/useIndications';
import { GradientCheckIcon } from './GradientCheckIcon';
import { AsteriskIcon } from './AsteriskIcon';

interface Indication {
  id: string;
  name: string;
  category_id: string;
  has_iss: string;
  has_ise: string;
  has_clinical_summaries: string;
  has_regulatory_meeting_attendance: string;
  footnote?: string;
}

interface Category {
  id: string;
  name: string;
  display_order: number;
}

export function MedicalIndicationsChart() {
  const { categories, indications, loading, error } = useIndications();

  const groupIndicationsByCategory = () => {
    const filtered = indications.filter(
      indication => (indication.has_iss && indication.has_iss !== '-') || (indication.has_ise && indication.has_ise !== '-') || (indication.has_clinical_summaries && indication.has_clinical_summaries !== '-')
    );

    const grouped = categories
      .sort((a, b) => a.display_order - b.display_order)
      .map(category => ({
        category,
        indications: filtered.filter(ind => ind.category_id === category.id)
      }))
      .filter(group => group.indications.length > 0);

    return grouped;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#7B6BA4] text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        Error loading data: {error}
      </div>
    );
  }

  const groupedData = groupIndicationsByCategory();

  // Check if any indication has a footnote
  const hasFootnotes = indications.some(ind => ind.footnote);
  const footnoteText = indications.find(ind => ind.footnote)?.footnote;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#4A3B6B] text-white">
              <th className="text-left py-4 px-6 font-bold text-lg border-r border-white/20">
                INDICATIONS
              </th>
              <th className="text-center py-4 px-6 font-bold text-lg border-r border-white/20 w-32">
                ISS
              </th>
              <th className="text-center py-4 px-6 font-bold text-lg border-r border-white/20 w-32">
                ISE
              </th>
              <th className="text-center py-4 px-6 font-bold text-lg border-r border-white/20 w-40">
                CLINICAL<br />SUMMARIES
              </th>
              <th className="text-center py-4 px-6 font-bold text-lg w-48">
                REGULATORY AGENCY<br />MEETING ATTENDANCE
              </th>
            </tr>
          </thead>

          <tbody>
            {groupedData.map((group) => {
              let rowIndex = 0;
              return (
                <React.Fragment key={group.category.id}>
                  <tr className="bg-[#E8B55D]">
                    <td colSpan={5} className="py-3 px-6 font-bold text-gray-800 uppercase text-sm tracking-wide">
                      {group.category.name}
                    </td>
                  </tr>

                  {group.indications.map((indication) => {
                    const bgColor = rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#D5D0E3]';
                    const borderColor = rowIndex % 2 === 0 ? 'border-gray-300' : 'border-[#B8B0CC]';
                    rowIndex++;

                    return (
                      <tr key={indication.id} className={bgColor}>
                        <td className={`relative py-4 px-6 text-gray-800 border-r ${borderColor}`}>
                          {indication.name}
                        </td>
                        <td className={`relative border-r ${borderColor}`}>
                          <div className="flex items-center justify-center h-full py-4 px-6">
                            {indication.has_iss && indication.has_iss !== '-' ? (
                              indication.has_iss === '*' ? (
                                <AsteriskIcon className="w-10 h-10" />
                              ) : (
                                <GradientCheckIcon className="w-10 h-10" />
                              )
                            ) : (
                              <span className="text-gray-500 text-2xl font-bold">-</span>
                            )}
                          </div>
                        </td>
                        <td className={`relative border-r ${borderColor}`}>
                          <div className="flex items-center justify-center h-full py-4 px-6">
                            {indication.has_ise && indication.has_ise !== '-' ? (
                              indication.has_ise === '*' ? (
                                <AsteriskIcon className="w-10 h-10" />
                              ) : (
                                <GradientCheckIcon className="w-10 h-10" />
                              )
                            ) : (
                              <span className="text-gray-500 text-2xl font-bold">-</span>
                            )}
                          </div>
                        </td>
                        <td className={`relative border-r ${borderColor}`}>
                          <div className="flex items-center justify-center h-full py-4 px-6">
                            {indication.has_clinical_summaries && indication.has_clinical_summaries !== '-' ? (
                              indication.footnote ? (
                                <AsteriskIcon className="w-10 h-10" />
                              ) : (
                                <GradientCheckIcon className="w-10 h-10" />
                              )
                            ) : (
                              <span className="text-gray-500 text-2xl font-bold">-</span>
                            )}
                          </div>
                        </td>
                        <td className="relative">
                          <div className="flex items-center justify-center h-full py-4 px-6">
                            {indication.has_regulatory_meeting_attendance && indication.has_regulatory_meeting_attendance !== '-' ? (
                              indication.has_regulatory_meeting_attendance === '*' ? (
                                <AsteriskIcon className="w-10 h-10" />
                              ) : (
                                <GradientCheckIcon className="w-10 h-10" />
                              )
                            ) : (
                              <span className="text-gray-500 text-2xl font-bold">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {/* Footnote Section for Desktop */}
        {hasFootnotes && footnoteText && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 italic">
              {footnoteText}
            </p>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Card View - Hidden on desktop */}
      <div className="lg:hidden space-y-6">
        {groupedData.map((group) => (
          <div key={group.category.id} className="space-y-3">
            {/* Category Header */}
            <div className="bg-[#E8B55D] py-3 px-4 rounded-lg">
              <h2 className="font-bold text-gray-800 uppercase text-sm tracking-wide">
                {group.category.name}
              </h2>
            </div>

            {/* Indication Cards */}
            <div className="space-y-3">
              {group.indications.map((indication, index) => {
                const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-[#D5D0E3]';

                return (
                  <div key={indication.id} className={`${bgColor} rounded-lg border border-gray-300 p-4`}>
                    {/* Indication Name */}
                    <h3 className="font-semibold text-gray-800 mb-3 text-base">
                      {indication.name}
                    </h3>

                    {/* Documentation Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      {/* ISS */}
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-600 mb-2 uppercase">ISS</div>
                        <div className="flex justify-center items-center h-10">
                          {indication.has_iss && indication.has_iss !== '-' ? (
                            indication.has_iss === '*' ? (
                              <AsteriskIcon className="w-10 h-10" />
                            ) : (
                              <GradientCheckIcon className="w-10 h-10" />
                            )
                          ) : (
                            <span className="text-gray-500 text-2xl font-bold">-</span>
                          )}
                        </div>
                      </div>

                      {/* ISE */}
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-600 mb-2 uppercase">ISE</div>
                        <div className="flex justify-center items-center h-10">
                          {indication.has_ise && indication.has_ise !== '-' ? (
                            indication.has_ise === '*' ? (
                              <AsteriskIcon className="w-10 h-10" />
                            ) : (
                              <GradientCheckIcon className="w-10 h-10" />
                            )
                          ) : (
                            <span className="text-gray-500 text-2xl font-bold">-</span>
                          )}
                        </div>
                      </div>

                      {/* Clinical Summaries */}
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-600 mb-2 uppercase">Clinical</div>
                        <div className="flex justify-center items-center h-10">
                          {indication.has_clinical_summaries && indication.has_clinical_summaries !== '-' ? (
                            indication.footnote ? (
                              <AsteriskIcon className="w-10 h-10" />
                            ) : (
                              <GradientCheckIcon className="w-10 h-10" />
                            )
                          ) : (
                            <span className="text-gray-500 text-2xl font-bold">-</span>
                          )}
                        </div>
                      </div>

                      {/* Regulatory Agency Meeting Attendance */}
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-600 mb-2 uppercase">Regulatory</div>
                        <div className="flex justify-center items-center h-10">
                          {indication.has_regulatory_meeting_attendance && indication.has_regulatory_meeting_attendance !== '-' ? (
                            indication.has_regulatory_meeting_attendance === '*' ? (
                              <AsteriskIcon className="w-10 h-10" />
                            ) : (
                              <GradientCheckIcon className="w-10 h-10" />
                            )
                          ) : (
                            <span className="text-gray-500 text-2xl font-bold">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footnote Section for Mobile */}
        {hasFootnotes && footnoteText && (
          <div className="mt-6 px-4">
            <p className="text-sm text-gray-600 italic">
              {footnoteText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
