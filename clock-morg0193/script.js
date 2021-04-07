const $hours = $('#hours')
const $minutes = $('#minutes')
const $seconds = $('#seconds')
const $greeting = $('#greeting')
const $toggle = $('#dateToggle')
const $info = $('#dateInfo')
const $settingsPanel = $('#settingsPanel')
const $settings = $('#settings')
const $close = $('#closeSettings')
const $form = $('#settingsInput')
const $ampm = $('#ampm')
const $name = $('#name')
const $dotw = $('#dotw')
const $dotm = $('#dotm')
const $doty = $('#doty')
const $woty = $('#woty')
const $mdd = $('#moreDateData')
let changeDate
let greetingTime
let dateShown = false
let settingsShown = false
let formatSelection
let formatToggle
let userName = 'User'
let extraDateInfo
let dateToggle

const DateTime = luxon.DateTime
const today = DateTime.local()

function timeUpdate () {
  changeDate = DateTime.local()
  greetingTime = DateTime.fromISO(changeDate).toFormat('HH')

  if (localStorage.getItem('dateShow')) {
    dateToggle = localStorage.getItem('dateShow')
  }

  if (dateToggle === 'on') {
    $info.css('display', 'block')
  } else if (dateToggle === 'off') {
    $info.css('display', 'none')
  }

  // Handles 12 hour or 24 hour format depending on user selection
  if (localStorage.getItem('timeFormat')) {
    formatToggle = localStorage.getItem('timeFormat')
  }

  if (formatToggle === '12') {
    $hours.html(`${DateTime.fromISO(changeDate).toFormat('h')}`)
    $ampm.css('display', 'block')
  } else {
    $hours.html(`${DateTime.fromISO(changeDate).toFormat('H')}`)
  }

  // Sets AM or PM based on time of day
  if (greetingTime >= 12) {
    $ampm.html('PM')
  } else {
    $ampm.html('AM')
  }

  // Handles minutes and seconds
  $minutes.html(`${DateTime.fromISO(changeDate).toFormat('mm')}`)
  $seconds.html(`${DateTime.fromISO(changeDate).toFormat('ss')}`)

  // Displays additional date information
  $info.html(`${changeDate.toLocaleString(DateTime.DATE_HUGE)}`)

  if (localStorage.getItem('name')) {
    userName = localStorage.getItem('name')
  }

  // Displays custom greeting based on current time
  if (greetingTime >= 20 || greetingTime <= 5) {
    $greeting.html(`Good Night ${userName}! The time is:`)
  } else if (greetingTime < 20 && greetingTime >= 18) {
    $greeting.html(`Good Evening ${userName}! The time is:`)
  } else if (greetingTime < 18 && greetingTime >= 12) {
    $greeting.html(`Good Afternoon ${userName}! The time is:`)
  } else {
    $greeting.html(`Good Morning ${userName}! The time is:`)
  }
}

setInterval(timeUpdate, 1000)

// Event handler for additional date information toggle
$toggle.on('click', function () {
  $dotw.html(`<strong>Day of the Week</strong><br>${DateTime.fromISO(changeDate).toFormat('cccc')}`)
  $dotm.html(`<strong>Day of the Month</strong><br>${DateTime.fromISO(changeDate).toFormat('L')}`)
  $doty.html(`<strong>Day of the Year</strong><br>${DateTime.fromISO(changeDate).toFormat('o')}`)
  $woty.html(`<strong>Week of the Year</strong><br>${DateTime.fromISO(changeDate).toFormat('W')}`)
  if (dateShown === false) {
    $mdd.css('display', 'flex')
    dateShown = true
  } else {
    $mdd.css('display', 'none')
    dateShown = false
  }
})

// Opens setting panel
$settings.on('click', function () {
  if (settingsShown === false) {
    $settingsPanel.css('display', 'block')
    settingsShown = true
  } else {
    $settingsPanel.css('display', 'none')
    settingsShown = false
  }
})

// Closes setting panel
$close.on('click', function() {
  $settingsPanel.css('display', 'none')
  settingsShown = false
})

// Handles setting form submission
$form.on('submit', function (e) {
  e.preventDefault()

  // Handles user selection for time format
  formatSelection = $('input[name=timeFormat]:checked').val()
  extraDateInfo = $('input[name=dateShow]:checked').val()

  if (formatSelection === '12') {
    $ampm.css('display', 'block')
  } else if (formatSelection === '24') {
    $ampm.css('display', 'none')
  }

  localStorage.setItem('timeFormat', formatSelection)

  if (extraDateInfo === 'on') {
    $info.css('display', 'block')
  } else if (extraDateInfo === 'off') {
    $info.css('display', 'none')
  }

  localStorage.setItem('dateShow', extraDateInfo)

  // Handles user name
  if ($name.val()) {
    localStorage.setItem('name', $name.val())
  }
})

fetch('https://api.nasa.gov/planetary/apod?api_key=kfoU5R5UPBfLLEUFDRayWAEaHhbBpbtFOkh9wHeA')
  .then(function (response) {
    return response.json()
  })
  .then(function (json) {
    console.log(json)
    $('body').css('backgroundImage', `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${json.url})`)
  })
