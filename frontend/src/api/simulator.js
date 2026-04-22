const BASE_URL = "https://api.mevguard.quest/api/v1";

export async function getSimulatorStatus() {
  const res = await fetch(`${BASE_URL}/simulator/status`);
  return res.json();
}

export async function startSimulator() {
  const res = await fetch(`${BASE_URL}/simulator/start`, {
    method: "POST",
  });
  return res.json();
}

export async function stopSimulator() {
  const res = await fetch(`${BASE_URL}/simulator/stop`, {
    method: "POST",
  });
  return res.json();
}

export async function resetSimulator() {
  const res = await fetch(`${BASE_URL}/simulator/reset`, {
    method: "POST",
  });
  return res.json();
}
