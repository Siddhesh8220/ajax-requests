const axios = require("axios");

async function getData() {
  let res = await axios.get(
    `https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json`,
    {
      "Content-Type": "application/json",
    }
  );

  const data = res.data;
  const newArr = data.map(getSpecificData);

  function getSpecificData(input) {
    airportData = input["Airport"];
    flightData = input["Statistics"]["Flights"];

    return {
      Airport: airportData,
      Flights: flightData,
      SumEqualsTotal:
        flightData["Cancelled"] +
          flightData["Delayed"] +
          flightData["Diverted"] +
          flightData["On Time"] ===
        flightData["Total"],
    };
  }
  console.log(newArr);
}

getData();
