let navigation = document.querySelector('.navigation');

document.querySelector('#menu-btn').onclick = () => {
    navigation.classList.toggle('active')
    
}

window.onscroll = () => {
    navigation.classList.remove('active')
}

