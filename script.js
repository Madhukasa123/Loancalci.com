function calculateLoan() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

    if (isNaN(interestRate) || isNaN(principalAmount)) {
        alert("దయచేసి వడ్డీ రేటు మరియు అసలు మొత్తం కోసం చెల్లుబాటు అయ్యే నంబర్‌లను నమోదు చేయండి.");
        return;
    }

    // Calculate the difference in months and days
    const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const diffDays = endDate.getDate() - startDate.getDate();

    // Adjust the number of months based on the remaining days
    const numMonths = diffDays >= 0 ? diffMonths : diffMonths - 1;
    const numDays = diffDays >= 0 ? diffDays : 30 + diffDays;

    // Calculate interest for full months and additional days
    const interestForMonths = (interestRate / 100) * principalAmount * numMonths;
    const interestForDays = (interestRate / 100 / 30) * principalAmount * numDays;
    const totalInterest = interestForMonths + interestForDays;

    const totalAmount = principalAmount + totalInterest;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        ${numMonths} నెలల ${numDays} రోజులు<hr>
        వడ్డీ: &#x20B9;${totalInterest.toFixed(2)}<br>
        మొత్తం: &#x20B9;${totalAmount.toFixed(2)}
    `;
}
