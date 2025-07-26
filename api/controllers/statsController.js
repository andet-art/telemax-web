let activeUserCount = 0;

export function incrementActiveUsers() {
  activeUserCount++;
}

export function decrementActiveUsers() {
  if (activeUserCount > 0) activeUserCount--;
}

export const getActiveUsers = (req, res) => {
  res.json({ count: activeUserCount });
};
