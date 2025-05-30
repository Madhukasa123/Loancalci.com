function calculateLoan() {
    const startDate = parseSlashDate(document.getElementById("startDate").value);
    const endDate = parseSlashDate(document.getElementById("endDate").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

    if (!startDate || !endDate || isNaN(interestRate) || isNaN(principalAmount)) {
        alert("దయచేసి సరైన తేదీలు, వడ్డీ రేటు మరియు అసలు మొత్తం నమోదు చేయండి.");
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

// 🧠 Parse MM/DD/YYYY into Date object
function parseSlashDate(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const [mm, dd, yyyy] = parts.map(p => parseInt(p));
    if (isNaN(mm) || isNaN(dd) || isNaN(yyyy)) return null;

    const date = new Date(yyyy, mm - 1, dd);
    return isNaN(date.getTime()) ? null : date;
}

// 🎯 Auto-format as MM/DD/YYYY while typing
function formatDateInput(input) {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '').slice(0, 8);

        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length >= 3) formatted += '/' + value.slice(2, 4);
        if (value.length >= 5) formatted += '/' + value.slice(4, 8);

        input.value = formatted;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    formatDateInput(document.getElementById('startDate'));
    formatDateInput(document.getElementById('endDate'));
});
