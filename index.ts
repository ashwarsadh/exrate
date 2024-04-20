async function getExchangeRate(currency: string): Promise<{ currency: string; rate: number } | null> {
    const url = `https://eximin.net/rates.aspx?type=custom`;

    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false); // Synchronous request
        xhr.send();

        if (xhr.status === 200) {
            const data = xhr.responseText;
            const rows = data.split("<tr>");
            const row = rows.find((row) => row.includes(`<strong>${currency}</strong>`));

            if (row) {
                const regex = /<td>\s*(\d+\.\d+)\s*<\/td>\s*<td>\s*(\d+\.\d+)\s*<\/td>/;
                const match = regex.exec(row);

                if (match && match.length >= 3) {
                    const rate = parseFloat(match[2]);
                    return { currency: currency === "Euro" ? "EUR" : "USD", rate };
                }
            }
        } else {
            throw new Error(`Failed to fetch exchange rate. Status: ${xhr.status}`);
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
