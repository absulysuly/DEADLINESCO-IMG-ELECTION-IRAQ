'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample data - replace with your real 7,769 candidates
  useEffect(() => {
    const sampleCandidates = generateSampleCandidates(100);
    setCandidates(sampleCandidates);
    setFilteredCandidates(sampleCandidates);
    setLoading(false);
  }, []);

  // Filter candidates
  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.name_en && c.name_en.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDistrict) {
      filtered = filtered.filter(c => c.district === selectedDistrict);
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, selectedDistrict, candidates]);

  const districts = [...new Set(candidates.map(c => c.district))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-white text-2xl">⏳ جاري التحميل...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen gradient-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl p-8 mb-8 shadow-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            🇮🇶 منصة الانتخابات العراقية
          </h1>
          <p className="text-xl text-gray-600 mb-2">Iraqi Election Platform</p>
          <p className="text-lg text-gray-500">
            قارن بين جميع المرشحين في مكان واحد
          </p>
          <div className="mt-6 inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold">
            ✅ النظام يعمل بنجاح | System Online
          </div>
        </header>

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ابحث عن مرشح بالاسم... | Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-primary-500 focus:outline-none"
            />
            
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="">جميع المحافظات | All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedDistrict) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDistrict('');
              }}
              className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
            >
              مسح الفلاتر | Clear Filters
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-500">
                {candidates.length.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-2">إجمالي المرشحين<br />Total Candidates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">
                {filteredCandidates.length.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-2">المرشحون المعروضون<br />Shown</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">18</div>
              <div className="text-gray-600 mt-2">محافظة<br />Governorates</div>
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        {filteredCandidates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              😔 لا توجد نتائج
            </h2>
            <p className="text-gray-600">No candidates found matching your search</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl p-6 shadow-lg card-hover"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {candidate.name}
                </h3>
                {candidate.name_en && (
                  <p className="text-gray-600 mb-3">{candidate.name_en}</p>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-primary-500 ml-2">المحافظة:</span>
                    <span className="text-gray-700">{candidate.district}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-primary-500 ml-2">الحزب:</span>
                    <span className="text-gray-700">{candidate.party}</span>
                  </div>
                  {candidate.listNumber && (
                    <div className="flex items-center">
                      <span className="font-semibold text-primary-500 ml-2">رقم القائمة:</span>
                      <span className="text-gray-700">{candidate.listNumber}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                    {candidate.district}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    {candidate.party}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-white mt-12 py-8">
          <p className="text-lg font-semibold">منصة الانتخابات العراقية | Iraqi Election Platform</p>
          <p className="mt-2">© 2025 | مجاني • غير حزبي • مفتوح للجميع</p>
          <p>Free • Non-partisan • Open to All</p>
        </footer>
      </div>
    </main>
  );
}

// Generate sample candidates
function generateSampleCandidates(count) {
  const districts = [
    'بغداد', 'البصرة', 'نينوى', 'الأنبار', 'ديالى',
    'صلاح الدين', 'كركوك', 'ذي قار', 'واسط', 'ميسان',
    'بابل', 'النجف', 'كربلاء', 'القادسية', 'المثنى',
    'دهوك', 'أربيل', 'السليمانية'
  ];

  const parties = [
    'تحالف الفتح', 'التيار الصدري', 'دولة القانون', 'تحالف النصر',
    'ائتلاف الوطنية', 'الديمقراطي الكردستاني', 'الاتحاد الوطني',
    'تيار الحكمة', 'عزم', 'الحل', 'مستقل'
  ];

  const candidates = [];

  for (let i = 1; i <= count; i++) {
    candidates.push({
      id: i,
      name: `مرشح رقم ${i}`,
      name_en: `Candidate ${i}`,
      district: districts[Math.floor(Math.random() * districts.length)],
      party: parties[Math.floor(Math.random() * parties.length)],
      listNumber: Math.floor(Math.random() * 300) + 1,
      position: Math.floor(Math.random() * 20) + 1
    });
  }

  return candidates;
}
