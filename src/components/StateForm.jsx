import { useState } from "react";
import candidateInfo from "../mockData/sample.json";
import { SlPlus } from "react-icons/sl";

const StateForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLokSabha, setSelectedLokSabha] = useState("");
  const [filtredData, setFiltredData] = useState([]);

  const states = ["Maharashtra", "Goa", "UP"];
  const districts = ["pune", "Goa-East", "UP-East"];
  const lokSabhas = ["alandi", "goa-east", "UP-east"];

  const textColor = "#0F0F0F";

  const handleClick = () => {
    const filteredCandidates = candidateInfo.filter((candidate) => {
      return (
        candidate.state === selectedState &&
        candidate.district === selectedDistrict &&
        candidate.loksabha === selectedLokSabha
      );
    });
    setFiltredData(filteredCandidates);
  };

  const handleVote = (candidateName, action) => {
    const updatedData = filtredData.map((candidate) => {
      if (candidate.name === candidateName) {
        return {
          ...candidate,
          votes: action === "up" ? candidate.votes + 1 : candidate.votes - 1,
        };
      }
      return candidate;
    });
    setFiltredData(updatedData);
  };

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
              setSelectedState(e.target.value);
              setSelectedDistrict("");
              setSelectedLokSabha("");
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
                setSelectedDistrict(e.target.value);
                setSelectedLokSabha("");
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
                  {candidate.name}
                </div>
                <div className="text-lg mb-2">{candidate.party}</div>
              </div>

              {/* Voting Buttons */}
              <div className="flex items-center ml-auto">
                <button
                  className="bg-green-500 text-white p-2 rounded-full mr-2"
                  onClick={() => handleVote(candidate.name, "up")}
                >
                  <SlPlus />
                </button>
                {/* <button
                  className="bg-red-500 text-white p-2 rounded-full"
                  onClick={() => handleVote(candidate.name, "down")}
                >
                  <SlMinus />
                </button> */}
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
