// index.js
let currId = 0

const fetchData = async () => { //fetch data from db
  const resp = await fetch('http://localhost:3000/ramens')
  const data = await resp.json()
  return data
}

const patchData = (rating, comment) => {
  fetch(`http://localhost:3000/ramens/${currId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "rating": rating,
      "comment": comment
    })
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}
const addUpdateListener = () => {
  const form = document.querySelector('#edit-ramen')
  form.addEventListener('submit', (e) => handleUpdate(e))
}

const handleUpdate= (e) => {
  e.preventDefault()

  const newRating = e.target.rating.value
  const newComment = e.target.querySelector('#new-comment').value

  patchData(newRating, newComment)
  console.log(newRating)
  console.log(newComment)
  console.log(e)
}

// Callbacks
const handleClick = (id, ramenArr) => { //handles the render of data when you click ramen image
  // Add code
  console.log(`click at ${id}`)
  currId = id //just sets current id so I can use it
  console.log(`${ramenArr}`)
  console.log(`${ramenArr.name}`)
  const target = document.getElementById('ramen-detail')

  const image = target.querySelector('.detail-image')
  image.src = `${ramenArr.image}`

  const name = target.querySelector('.name')
  name.innerHTML = `${ramenArr.name}`

  const restaurant = target.querySelector('.restaurant')
  restaurant.innerHTML = `${ramenArr.restaurant}`

  const rating = document.getElementById('rating-display')
  rating.innerHTML = `${ramenArr.rating}`

  const comment = document.getElementById('comment-display')
  comment.innerHTML = `${ramenArr.comment}`
  console.log(ramenArr.rating)
  //rating.setHTML = `${ramenArr.rating}`

  //const comment = target.querySelector('comment-display')
  //comment.innerHTML = `${ramenArr.rating}`
  console.log(image)
  console.log(` the current ID is :${currId}`)
}

const addSubmitListener = () => { //just the event listener for submit button that triggers the handle
  // Add code
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => handleSubmit(e))
}

const handleSubmit = (e) => { //handles the submit button
  e.preventDefault()

  const newRamenObj = {
    id: 6,
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target.querySelector('#new-comment').value
  }
  //const newRamenArr = Object.entries(newRamenObj)
  //console.log([newRamenObj])
  displayRamens([newRamenObj])
}

const displayRamens = (ramenArr) => { //displays the ramen pictures
  const container = document.getElementById('ramen-menu')

  ramenArr.forEach(ramenObj => {
    const image = document.createElement('img')
    image.classList.add('ramen-image')
    image.src=`${ramenObj.image}`
    image.setAttribute('id', `${ramenObj.id}`)

    container.appendChild(image)
  })

}

const deleteListener = () => { //deletes one element correctly but doesn't work right after that missing logic 
  //console.log(deleteTarget)
  const deleteBtn = document.querySelector('#deletebtn')
  deleteBtn.addEventListener('click', (e) => {
    let actualIndex = currId - 1
    const deleteTarget = document.getElementsByClassName('ramen-image')
    console.log(deleteTarget)
    deleteTarget[actualIndex].remove()
  })
}


const main = async () => {
  const ramenDataArray = await fetchData()
  displayRamens(ramenDataArray)
  console.log(ramenDataArray)

  document.querySelectorAll('.ramen-image').forEach((item, index) => { //event listener for click to display ramen info
    item.addEventListener('click', event => handleClick(item.id, ramenDataArray[index]))
  })

  addSubmitListener()

  document.getElementsByClassName('ramen-image')[0].click() //simulates a click to show first ramen info

  addUpdateListener()

  deleteListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
