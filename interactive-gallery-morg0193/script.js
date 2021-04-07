const $imgGrid = document.getElementById('img-grid')
const imgSrcList = ['img/night-city.jpg', 'img/cold-creek.jpg', 'img/balloons.jpg', 'img/boating.jpg', 'img/cabin.jpg', 'img/fall.jpg', 'img/misty.jpg', 'img/mountain-lake.jpg', 'img/purple-sunset.jpg', 'img/purple-tree.jpg', 'img/rock-circle.jpg', 'img/snow-mountain.jpg']
const imgList = []
let altVal

for (let i = 0; i < imgSrcList.length; i++) {
  altVal = imgSrcList[i].slice(4, -4).replace(/-/g, ' ')
  imgList.push(`<div id="img-section"><img src="${imgSrcList[i]}" alt="${altVal}" class="landscape"><h1>${altVal}</h1></div>`)
}

$imgGrid.innerHTML += imgList.join(' ')

const $popup = document.getElementById('img-popup')
const displayImg = document.getElementById('popup-image')
const imgTag = document.getElementById('img-tag')

$imgGrid.addEventListener('click', function (e) {
  if (e.target.classList.contains('landscape')) {
    displayImg.src = e.target.src
    $popup.style.display = 'block'
    imgTag.innerHTML = e.target.alt
  }
})

$popup.addEventListener('click', function () {
  $popup.style.display = 'none'
})
