import axios from "axios";

interface ExchangeRate {
  currency: string;
  rate: number;
}

async function getExchangeRate(currency: string): Promise<ExchangeRate | null> {
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

    if (row) {
      // Extract export rate value from the row
      const regex = /<td>\s*(\d+\.\d+)\s*<\/td>\s*<td>\s*(\d+\.\d+)\s*<\/td>/;
      const match = regex.exec(row);

      if (match && match.length >= 3) {
        // Extract the second rate value (export rate)
        const rate = parseFloat(match[2]);
        return { currency: currency === "Euro" ? "EUR" : "USD", rate };
      }
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }

  return null;
}

// Example usage
(async () => {
  const euroRate = await getExchangeRate("Euro");
  const usdRate = await getExchangeRate("U. S. Dollar");

  const exchangeRates = [];

  if (euroRate) {
    exchangeRates.push(euroRate);
  } else {
    console.log("Euro export rate not found");
  }

  if (usdRate) {
    exchangeRates.push(usdRate);
  } else {
    console.log("USD export rate not found");
  }

  console.log(JSON.stringify(exchangeRates));
})();
