/* Navigation
 * ----------------------------------------------- */
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site__nav');

menuToggle.addEventListener('click', function() {
    navigation.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.querySelector('.site').classList.toggle('lock');
});