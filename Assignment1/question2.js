const axios = require("axios");
const prompt = require("prompt-sync")();

var input = prompt("Enter your input (username/branchname) :");

async function getSpecificData(item) {
  let branch_data = await axios.get(
    `https://api.github.com/repos/${item.full_name}/branches`,
    {
      "Content-Type": "application/json",
    }
  );

  let owner_data = await axios.get(`${item["owner"]["url"]}`, {
    "Content-Type": "application/json",
  });

  const numberOfBranch = branch_data.data.length;
  const name = owner_data.data["name"];
  const followersCount = owner_data.data["followers"];
  const followingCount = owner_data.data["following"];
  const login = owner_data.data["login"];

  return {
    name: item["name"],
    full_name: item["full_name"],
    private: item["private"],
    owner: {
      login: login,
      name: name,
      followersCount: followersCount,
      followingCount: followingCount,
    },
    licenseName: item["license"],
    score: item["score"],
    numberOfBranch: numberOfBranch,
  };
}

async function getData() {
  try {
    let apiResponse = await axios.get(
      `https://api.github.com/search/repositories?q=${input}`,
      {
        "Content-Type": "application/json",
      }
    );

    const data = apiResponse.data["items"];
    let newData = await Promise.all(data.map(getSpecificData));
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}

getData();
