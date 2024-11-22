export const formatWalletAddress = (walletAddress) => {
  if (walletAddress) {
    const firstPart = walletAddress.slice(0, 4); // First 4 characters
    const lastPart = walletAddress.slice(-4); // Last 4 characters

    return `${firstPart}........${lastPart}`;
  }
};

export const calculateTimeAgo = (lastUpdate) => {
  const diffInMs = Date.now() - new Date(lastUpdate).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hrs ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

export const getPrivateKey = () => {
  let privatekey = localStorage?.getItem("privateKey");
  return privatekey;
};
