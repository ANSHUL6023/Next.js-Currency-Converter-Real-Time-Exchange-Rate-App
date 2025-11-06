import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://api.frankfurter.app/latest?from=${currency}`)
            .then((res) => res.json()) 
            .then((res) => setData(res.rates)) 
            .catch((error) => console.error("Error fetching currency data:", error)); 
    }, [currency]); 
    return data;
}

export default useCurrencyInfo;