function calculateDifference() {
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const interestRateInput = document.getElementById('interestRate');
  const principalAmountInput = document.getElementById('principalAmount');

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const interestRate = parseFloat(interestRateInput.value);
  const principalAmount = parseFloat(principalAmountInput.value);

  // Calculate the difference in milliseconds
  const timeDiff = endDate - startDate;

  // Convert the difference to days (adding +2 to count the start and end days)
  let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 2);

  // Calculate the number of months and remaining days
  const months = Math.floor(daysDiff / 30);
  const remainingDays = daysDiff % 30;

  // Adjust the number of days by subtracting the upper bound of (months / 2)
  const adjustedDays = daysDiff - Math.ceil(months / 2);

  // Calculate the number of months and remaining days after adjustment
  const adjustedMonths = Math.floor(adjustedDays / 30);
  const adjustedRemainingDays = adjustedDays % 30;

  // Calculate the interest for adjusted months and days
  const interestForMonths = (principalAmount * interestRate * adjustedMonths) / 100;
  const interestForDays = (principalAmount * interestRate * adjustedRemainingDays) / (100 * 30);

  // Calculate the total interest by summing the interests for months and days
  const totalInterest = interestForMonths + interestForDays;

  // Calculate the total amount including interest
  const totalAmount = principalAmount + totalInterest;

  // Calculate the starting day and ending day
  const startingDay = startDate.toLocaleDateString(undefined, { weekday: 'long' });
  const endingDay = endDate.toLocaleDateString(undefined, { weekday: 'long' });

  const resultDiv = document.getElementById('result');
  resultDiv.innerText = `Start Date: ${formatDate(startDate)} (${startingDay})
    \nEnd Date: ${formatDate(endDate)} (${endingDay})
    \nDifference: ${adjustedMonths} months and ${adjustedRemainingDays} days
    \nPrincipal Amount: ${principalAmount}
    \nInterest Rate per Month: ${interestRate}%
    \nInterest for ${adjustedMonths} months: ${interestForMonths.toFixed(2)}
    \nInterest for ${adjustedRemainingDays} days: ${interestForDays.toFixed(2)}
    \nTotal Interest: ${totalInterest.toFixed(2)}
    \nTotal Amount: ${totalAmount.toFixed(2)}`;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

