// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', (e) => {
    // always hide result
    document.querySelector('#results').style.display = 'none';
    // Show loader
    document.querySelector('#loader').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();

});

// Calculate results
function calculateResults() {
    console.log('calculating');

    // UI variables
    const UIamount = document.querySelector('#amount');
    const UIinterest = document.querySelector('#interest');
    const UIyears = document.querySelector('#years');
    const UImonthlyPayment = document.querySelector('#monthly-payment');
    const UItotalPayment = document.querySelector('#total-payment');
    const UItotalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/100/12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;
    
    // Compute monthly payment
    const X = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthlyPayment = (principal * X * calculatedInterest)/(X-1);

    if(isFinite(monthlyPayment)) {
        UImonthlyPayment.value = monthlyPayment.toFixed(2);
        UItotalPayment.value = (monthlyPayment * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthlyPayment * calculatedPayments) - principal).toFixed(2);
        // show results
        document.querySelector('#results').style.display = 'block';
        // hide loader
        document.querySelector('#loader').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

}

// Show error
function showError(message) {
      // hide loader
      document.querySelector('#loader').style.display = 'none';
      document.querySelector('#results').style.display = 'none';
    // create a div
    const errorDiv = document.createElement('div');
    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errorDiv.className = 'alert alert-danger';
    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(message));

    // Insert error
    card.insertBefore(errorDiv, heading);
    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}