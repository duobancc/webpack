export default () => {

    const element = document.createElement('h2')
    element.textContent= "Hello webpack"
    element.addEventListener('click', () => {
        console.log( '你好webpack')
    })

    return element

}