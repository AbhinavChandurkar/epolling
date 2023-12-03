import  { useState } from 'react';

const StateForm = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLokSabha, setSelectedLokSabha] = useState('');

  const states = ['State1', 'State2', 'State3']; 
  const districts = ['District1', 'District2', 'District3']; 
  const lokSabhas = ['LokSabha1', 'LokSabha2', 'LokSabha3']; 

  const textColor = '#0F0F0F';

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-secondary p-6 rounded-md text-center" style={{ width: '700px', height: '600px', color: textColor }}>
        <h1 className="text-3xl font-bold mb-2">E-POLLING</h1>
        <h2 className="text-lg font-semibold mb-4">India Decides 2024: Your Voice, Your Vote, Our Future</h2>

        {/* State Dropdown */}
        <div className="mb-4">
          <label className="block mb-2">Select State:</label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict('');
              setSelectedLokSabha('');
            }}
            className="p-2"
            style={{ color: textColor }}
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        {selectedState && (
          <div className="mb-4">
            <label className="block mb-2">Select District:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedLokSabha('');
              }}
              className="p-2"
              style={{ color: textColor }}
            >
              <option value="">Select</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Lok Sabha Dropdown */}
        {selectedState && selectedDistrict && (
          <div className="mb-4">
            <label className="block mb-2">Select Lok Sabha:</label>
            <select
              value={selectedLokSabha}
              onChange={(e) => setSelectedLokSabha(e.target.value)}
              className="p-2"
              style={{ color: textColor }}
            >
              <option value="">Select</option>
              {lokSabhas.map((lokSabha) => (
                <option key={lokSabha} value={lokSabha}>
                  {lokSabha}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        {selectedState && selectedDistrict && selectedLokSabha && (
          <button className="bg-primary text-white p-2 rounded-md" onClick={() => console.log('Submit')}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default StateForm;
