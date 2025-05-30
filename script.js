function calculateLoan() {
    const startDateString = document.getElementById("startDate").value;
    const endDateString = document.getElementById("endDate").value;

    // Convert MM/DD/YYYY to Date
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

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

// 🆕 Slash-Formatting Date Input (MM/DD/YYYY)
function formatDateInput(input) {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '');

        if (value.length > 8) value = value.slice(0, 8); // limit to 8 digits

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
