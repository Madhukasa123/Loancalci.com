function calculateDifference() {
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const interestRateInput = document.getElementById('interestRate');
  const principalAmountInput = document.getElementById('principalAmount');

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const interestRate = parseFloat(interestRateInput.value);
  const principalAmount = parseFloat(principalAmountInput.value);

  // Calculate the difference in months and remaining days
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  let monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
  const daysDiff = endDay - startDay;

  // Adjust the months difference based on days
  if (daysDiff < 0) {
    monthsDiff--;
  }

  // Calculate the interest for complete months
  const interestForCompleteMonths = (principalAmount * interestRate * monthsDiff) / 100;

  // Calculate the interest for remaining days
  const interestForRemainingDays = (principalAmount * interestRate * Math.abs(daysDiff)) / (100 * 30);

  // Calculate the total interest by summing the interests for complete months and remaining days
  const totalInterest = interestForCompleteMonths + interestForRemainingDays;

  // Format the dates in the desired output format
  const formattedStartDate = startDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

  // Prepare the output message
  const outputMessage = `The given dates:
Start Date: ${formattedStartDate}
End Date: ${formattedEndDate}

Difference:
Months: ${monthsDiff} month(s)
Days: ${Math.abs(daysDiff)} day(s)

Interests:
Interest for ${monthsDiff} month(s): ${interestForCompleteMonths.toFixed(2)}
Interest for ${Math.abs(daysDiff)} day(s): ${interestForRemainingDays.toFixed(2)}

Principle Amount: ${principalAmount.toFixed(2)}
Total Interest: ${totalInterest.toFixed(2)}
Total Amount: ${(principalAmount + totalInterest).toFixed(2)}`;

  const resultDiv = document.getElementById('result');
  resultDiv.innerText = outputMessage;
}


