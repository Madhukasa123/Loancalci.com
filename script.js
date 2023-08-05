function calculateLoan() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

    if (isNaN(interestRate) || isNaN(principalAmount)) {
        alert("Please enter valid numbers for interest rate and principal amount.");
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
        Number of Months: ${numMonths}<br><br>
        Number of Days: ${numDays}<br><br><hr>
        Interest: ${totalInterest.toFixed(2)}<br><br>
        Total Amount: ${totalAmount.toFixed(2)} <br><br>
    `;
}
