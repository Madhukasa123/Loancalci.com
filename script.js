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

  // Telugu month names array
  const teluguMonthNames = [
    'జనవరి',
    'ఫిబ్రవరి',
    'మార్చి',
    'ఏప్రిల్',
    'మే',
    'జూన్',
    'జూలై',
    'ఆగస్టు',
    'సెప్టెంబర్',
    'అక్టోబర్',
    'నవంబర్',
    'డిసెంబర్'
  ];

  // Format the dates with Telugu month names
  const formattedStartDate = `${startDate.getDate()} ${teluguMonthNames[startMonth]} ${startDate.getFullYear()}`;
  const formattedEndDate = `${endDate.getDate()} ${teluguMonthNames[endMonth]} ${endDate.getFullYear()}`;

  // Prepare the output message in Telugu
  const outputMessage = `ఇవ్వబడిన తేదీలు:
  ప్రారంభ తేదీ: ${formattedStartDate}
  ముగింపు తేదీ: ${formattedEndDate}
  
  తేడా:
  ${monthsDiff} నెలల , ${Math.abs(daysDiff)}  రోజులు.
  
  వడ్డీ:
  ${monthsDiff} నెలలకి వడ్డీ : ${ interestForCompleteMonths.toFixed(2)}
  ${Math.abs(daysDiff)} రోజులకి వడ్డీ : ${ interestForRemainingDays.toFixed(2)}
  
  అసలు: ${principalAmount.toFixed(2)}
  వడ్డీ: ${totalInterest.toFixed(2)}
 
  మొత్తం: ${(principalAmount + totalInterest).toFixed(2)} /-`;
  
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = outputMessage;
}
