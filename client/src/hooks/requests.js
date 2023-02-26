const API_PATH = "v1";
async function httpGetPlanets() {
  const response = await fetch(`${API_PATH}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const res = await fetch(`${API_PATH}/launches`);
  const data = await res.json();
  return data.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  console.log(launch);
  try {
    return await fetch(`${API_PATH}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_PATH}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
