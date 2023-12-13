import { useState, useEffect } from "react";
import { SlPlus } from "react-icons/sl";

const StateForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLokSabha, setSelectedLokSabha] = useState("");
  const [filtredData, setFiltredData] = useState([]);
  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [lokSabhas, setLokSabhas] = useState([]);

  const textColor = "#0F0F0F";

  const handleClick = async () => {
    // Check if all dropdowns are selected
    if (selectedState && selectedDistrict && selectedLokSabha) {
      try {
        const response = await fetch(
          `http://localhost:3000/getcandidates/${selectedState}/${selectedDistrict}/${selectedLokSabha}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const candidatesData = await response.json();
        setFiltredData(candidatesData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/vote/${candidateId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh candidate data after voting
      handleClick();
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  //getting the data from the backend
  const getData = async () => {
    const response = await fetch("http://localhost:3000/getdata");
    const data = await response.json();

    //adding the state
    const uniqueStates = [...new Set(data.map((candidate) => candidate.state))];
    setStates(uniqueStates);

    setData(data);
  };

  const handleStateChange = async (selectedState) => {
    console.log("Selected State:", selectedState);
    setSelectedState(selectedState);
    setSelectedDistrict("");
    setSelectedLokSabha("");
    // Fetch districts based on the selected state
    if (selectedState) {
      try {
        const response = await fetch(
          `http://localhost:3000/getdistricts/${selectedState}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const districtData = await response.json();
        setDistricts(districtData); // Make sure to set the districts state here
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
  };

  const handleDistrictChange = async (selectedDistrict) => {
    console.log("Selected District:", selectedDistrict);
    setSelectedDistrict(selectedDistrict);
    setSelectedLokSabha("");

    // Fetch Lok Sabha names based on the selected district
    if (selectedDistrict) {
      try {
        const response = await fetch(
          `http://localhost:3000/getlokSabhas/${selectedDistrict}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const lokSabhaData = await response.json();
        setLokSabhas(lokSabhaData);
      } catch (error) {
        console.error("Error fetching Lok Sabha names:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex items-center  h-screen">
      <div
        className="p-6 rounded-md text-center"
        style={{ width: "700px", height: "600px", color: textColor }}
      >
        {/* State Dropdown */}
        <div className="flex mb-4 justify-between" style={{ width: "400px" }}>
          <label className="block mb-2 text-3xl font-bold bg-white">
            Select State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              handleStateChange(e.target.value);
            }}
            className="p-2"
            style={{ color: textColor, width: "200px", height: "40px" }}
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
          <div className="flex mb-4 justify-between" style={{ width: "400px" }}>
            <label className="block mb-2 text-3xl font-bold bg-white">
              Select District:
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                handleDistrictChange(e.target.value);
              }}
              className="p-2"
              style={{ color: textColor, width: "200px", height: "40px" }}
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
          <div className="flex mb-4 justify-between" style={{ width: "400px" }}>
            <label className="block mb-2 text-2xl font-bold bg-white">
              Select Lok Sabha:
            </label>
            <select
              value={selectedLokSabha}
              onChange={(e) => setSelectedLokSabha(e.target.value)}
              className="p-2"
              style={{ color: textColor, width: "200px", height: "40px" }}
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
          <div className="flex pl-40">
            <button
              className="bg-white text-black p-3 rounded-md "
              onClick={handleClick}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      {/* Display filtered candidates */}
      {filtredData.length > 0 && (
        <div
          className="pt-20 pl-20 pr-20"
          style={{ width: "60%", height: "100%" }}
        >
          {filtredData.map((candidate) => (
            <div
              key={candidate.name}
              className="bg-white p-6 mb-4 rounded-md flex items-center border border-black"
              style={{ fontFamily: "inherit", height: "100px" }}
            >
              <div className="w-16 h-16 bg-gray-300 mr-4 rounded-full"></div>

              {/* Candidate Information */}
              <div className="flex flex-col">
                <div className="text-xl font-semibold mb-2">
                  {candidate.name_of_candidate}
                </div>
                <div className="text-lg mb-2">{candidate.name_of_party}</div>
              </div>

              {/* Voting Buttons */}
              <div className="flex items-center ml-auto">
                <button
                  className="bg-green-500 text-white p-2 rounded-full mr-2"
                  onClick={() => handleVote(candidate._id)}
                >
                  <SlPlus />
                </button>
              </div>
              {/* Total Votes */}
              <div className="ml-4">{`Total Votes: ${candidate.votes}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateForm;
