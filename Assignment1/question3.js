const axios = require("axios");

async function getData() {
  let res = await axios.get(`http://api.nobelprize.org/v1/prize.json`, {
    "Content-Type": "application/json",
  });

  const data = res.data.prizes;

  const yearFilter = data.filter((prize) => {
    return prize.year >= 2000 && prize.year <= 2019;
  });

  const chemistryFilter = yearFilter.filter((prize) => {
    return prize.category === "chemistry";
  });

  console.log(chemistryFilter);
}

getData();
