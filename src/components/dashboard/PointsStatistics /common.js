
const epochPoints = [
  {
    created: "2024-09-30T08:12:46.616Z",
    total: 528,
    network: 250,
    referral: 100,
    rank: 25,
    space: 153,
  },
  {
    created: "2024-09-29T07:52:45.553Z",
    total: 484,
    network: 302,
    referral: 182,
    rank: 0,
    space: 0,
  },
  {
    created: "2024-09-28T10:55:18.718Z",
    total: 358,
    network: 100,
    referral: 0,
    rank: 158,
    space: 100,
  },
  {
    created: "2024-09-27T06:29:18.647Z",
    total: 613,
    network: 303,
    referral: 0,
    rank: 110,
    space: 200,
  },
  {
    created: "2024-09-26T07:47:49.406Z",
    total: 505,
    network: 505,
    referral: 0,
    rank: 0,
    space: 0,
  },
  {
    created: "2024-09-25T06:50:23.536Z",
    total: 771,
    network: 471,
    referral: 0,
    rank: 0,
    space: 300,
  },
  {
    created: "2024-09-24T05:19:41.302Z",
    total: 345,
    network: 100,
    referral: 200,
    rank: 45,
    space: 0,
  },
  {
    created: "2024-09-23T07:31:41.045Z",
    total: 422,
    network: 112,
    referral: 0,
    rank: 130,
    space: 182,
  },
  {
    created: "2024-09-22T07:33:30.244Z",
    total: 683,
    network: 603,
    referral: 0,
    rank: 180,
    space: 0,
  },
  {
    created: "2024-09-21T10:18:20.504Z",
    total: 603,
    network: 400,
    referral: 103,
    rank: 100,
    space: 0,
  },
];

// Function to calculate the percentage
export const calculatePercentage = (value, total) => (value / total) * 10;

// Step 1: Find the maximum total value
export const maxTotal = (data) => {
  return Math.max(...data.map((point) => point?.agg_points))
};

// Step 2: Calculate rem values based on the ratio to the maximum total
export const epochPointsWithHeight = (data, maximumTotal) => {
  const newData = data.map((point) => {
    const chartHeight = (point.agg_points / maximumTotal) * 10;
    return {
      ...point,
      chartHeight: `${chartHeight}rem`, // Add the calculated rem value to the object
    };
  })
  return newData;
};

// Step 1: Find the most recent entry by comparing dates
export const latestEntry = (data) => {
  if (data.length === 0) return null; // Return null if data is empty

  return data.reduce((latest, current) => {
    return new Date(current?.date) > new Date(latest?.date)
      ? current
      : latest;
  });
};

