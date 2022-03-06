let data = require("./battles.json");

let attacker_kings = {};
let defender_kings = {};
let regions = {};
let win = 0;
let loss = 0;
let battle_type = new Set();
let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;
let name = new Set();
let total = 0;

async function findData(battle) {
  // store all attcker kings with name as key and count as value in object
  attacker_kings[battle["attacker_king"]] = attacker_kings[
    battle["attacker_king"]
  ]
    ? attacker_kings[battle["attacker_king"]] + 1
    : 1;

  // store all defender kings with name as key and count as value in object
  defender_kings[battle["defender_king"]] = defender_kings[
    battle["defender_king"]
  ]
    ? defender_kings[battle["defender_king"]] + 1
    : 1;

  // store all regions with name as key and count as value in object
  regions[battle["region"]] = regions[battle["region"]]
    ? regions[battle["region"]] + 1
    : 1;

  //Store battle type in set
  battle_type.add(battle["battle_type"]);

  name.add(battle["name"]);

  min =
    min > battle["defender_size"] && battle["defender_size"] != null
      ? battle["defender_size"]
      : min;

  max = max < battle["defender_size"] ? battle["defender_size"] : max;

  total = total + battle["defender_size"];

  battle["attacker_outcome"] === "win" ? win++ : loss++;
}

async function getSpecificData() {
  data.forEach(findData);

  //get attacker king with most battle(most active attacker king)
  attacker = Object.keys(attacker_kings).reduce(function (a, b) {
    return attacker_kings[a] > attacker_kings[b] ? a : b;
  });

  //get defender king with most battle(most active defender king)
  defender = Object.keys(defender_kings).reduce(function (a, b) {
    return defender_kings[a] > defender_kings[b] ? a : b;
  });

  active_region = Object.keys(regions).reduce(function (a, b) {
    return regions[a] > regions[b] ? a : b;
  });

  return {
    most_active: {
      attacker_king: attacker,
      defender_king: defender,
      region: active_region,
      name: Array.from(name), // all battles have unique names so there is no specific most active name
    },
    attacker_outcome: {
      win: win,
      loss: loss,
    },
    battle_type: Array.from(battle_type),
    defender_size: {
      average: total / data.length,
      min: min,
      max: max,
    },
  };
}

async function getData() {
  try {
    newData = await getSpecificData();
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}

getData();
