const alarmForm = document.getElementById('alarm-form');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const amPmSelect = document.getElementById('am-pm');
const alarmList = document.querySelector('.alarm-list');
const clock = document.getElementById('clock');
let alarmRinging = false;


// Update the clock display every second
setInterval(updateClock, 1000); 


// Function to update the clock display
function updateClock() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const displayHours = hours > 12 ? hours - 12 : hours;
  const period = hours >= 12 ? 'PM' : 'AM';


  clock.textContent = `${displayHours}:${formatTime(minutes)}:${formatTime(seconds)} ${period}`;

  
  // Check if any alarms are ringing
  if (!alarmRinging) {
    checkAlarms(currentTime);
  }
}


// Function to add leading zero for single-digit time values
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}


// Function to handle setting an alarm
function setAlarm(event) {
  event.preventDefault();

  if (hoursInput.value === '' || minutesInput.value ===  '' || secondsInput.value === '') {
    alert('Please select all input for the alarm.');
    return;
  }

  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);
  const amPm = amPmSelect.value;

  const alarmTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)} ${amPm}`;

  const newAlarm = document.createElement('div');
  newAlarm.textContent = alarmTime;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    this.parentNode.remove();
    // alert(`Alarm ${alarmTime} has been deleted.`);
  });

  newAlarm.appendChild(deleteButton);
  alarmList.appendChild(newAlarm);

  // Clear the form inputs
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  amPmSelect.selectedIndex = 0;

  alert(`Alarm is set for ${alarmTime}`);
  checkAlarms(); // Add this line
}

// Get the set button element
const setButton = document.getElementById('set');

// Add event listener to the set button for clicks
setButton.addEventListener('click', (event) => {
    event.preventDefault();
    setAlarm(event);
});

// Function to handle canceling the alarm
function cancelAlarm() {
    // Alert when alarm is canceled
    alert('Alarm is canceled');
    alarmRinging = false;
}
function checkAlarms(currentTime) {
    // Get the current time  AM/PM format
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    const displayHours = currentHours > 12 ? currentHours - 12 : currentHours;
    const period = currentHours >=12 ? 'PM' : 'AM';
    const currentTimeString =
        `${formatTime(displayHours)}:${formatTime(currentMinutes)}:${formatTime(currentSeconds)} ${period.toLowerCase()}`;

    // Get all alarms in the list
    const alarms = alarmList.querySelectorAll('div');
    for (let alarm of alarms) {
    alarm.style.color = 'white';
    }

    // Check if any alarms match the current time
    alarms.forEach((alarm) => {
      console.log(alarm.firstChild.textContent);
      console.log(currentTimeString);
        if (alarm.firstChild.textContent === currentTimeString) {
            alarmRinging = true;
            alert(`Alarm ${currentTimeString} is ringing!`);
        }
    });
}

//  Get the stop button element 
const stopButton = document.getElementById('stop');

// Add event listener to the stop button for clicks
stopButton.addEventListener('click', cancelAlarm);
