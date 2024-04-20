import axios from "axios";

async function getExchangeRate(currency: string): Promise<number | undefined> {
  const url = `https://eximin.net/rates.aspx?type=custom`;

  try {
    const response = await axios.get<string>(url);
    const data = response.data;

    // Split HTML content into rows
    const rows = data.split("<tr>");

    // Find the row containing the currency and export rate
    const row = rows.find((row) =>
      row.includes(`<strong>${currency}</strong>`),
    );
    console.log(row);

    if (row) {
      // Extract export rate value from the row
      const regex = /<td>\s*(\d+\.\d+)\s*<\/td>\s*<td>\s*(\d+\.\d+)\s*<\/td>/;
      const match = regex.exec(row);
      console.log(match);
      if (match && match.length >= 3) {
        // Extract the second rate value (export rate)
        return parseFloat(match[2]);
      }
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }

  return undefined;
}

// Example usage
(async () => {
  const euroRate = await getExchangeRate("Euro");
  const usdRate = await getExchangeRate("U. S. Dollar");

  if (euroRate !== undefined) {
    console.log(`Euro export rate: ${euroRate}`);
  } else {
    console.log("Euro export rate not found");
  }

  if (usdRate !== undefined) {
    console.log(`USD export rate: ${usdRate}`);
  } else {
    console.log("USD export rate not found");
  }
})();
