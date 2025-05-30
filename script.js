function calculateLoan() {
    const startInput = document.getElementById("startDate").value;
    const endInput = document.getElementById("endDate").value;
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

    const startDate = parseDDMMYYYY(startInput);
    const endDate = parseDDMMYYYY(endInput);

    if (!startDate || !endDate) {
        alert("తప్పు తేది. దయచేసి DDMMYYYY ఫార్మాట్‌లో సరైన తేది నమోదు చేయండి.");
        return;
    }

    if (isNaN(interestRate) || isNaN(principalAmount)) {
        alert("దయచేసి వడ్డీ రేటు మరియు అసలు మొత్తం కోసం చెల్లుబాటు అయ్యే నంబర్‌లను నమోదు చేయండి.");
        return;
    }

    const teluguMonths = [
        "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
        "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"
    ];

    const formatDate = (date) => {
        const day = date.getDate();
        const month = teluguMonths[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                       (endDate.getMonth() - startDate.getMonth());
    const diffDays = endDate.getDate() - startDate.getDate();

    const numMonths = diffDays >= 0 ? diffMonths : diffMonths - 1;
    const numDays = diffDays >= 0 ? diffDays : 30 + diffDays;

    const interestForMonths = (interestRate / 100) * principalAmount * numMonths;
    const interestForDays = (interestRate / 100 / 30) * principalAmount * numDays;
    const totalInterest = interestForMonths + interestForDays;
    const totalAmount = principalAmount + totalInterest;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        ${formatDate(startDate)} --నుండి-- ${formatDate(endDate)} వరకు<hr>
        ${numMonths} నెలల ${numDays} రోజులు<hr>
        వడ్డీ: &#x20B9;${totalInterest.toFixed(2)}<hr>
        మొత్తం: &#x20B9;${totalAmount.toFixed(2)}
    `;
}

// ✅ Parse DDMMYYYY format
function parseDDMMYYYY(input) {
    const raw = input.replace(/\D/g, "");
    if (raw.length !== 8) return null;

    const dd = parseInt(raw.slice(0, 2));
    const mm = parseInt(raw.slice(2, 4));
    const yyyy = parseInt(raw.slice(4, 8));

    if (isNaN(dd) || isNaN(mm) || isNaN(yyyy)) return null;
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

    const date = new Date(yyyy, mm - 1, dd);
    // Validate: Make sure the date is really the same as user input
    if (date.getDate() !== dd || date.getMonth() !== mm - 1 || date.getFullYear() !== yyyy) return null;

    return date;
}
