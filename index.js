'use strict'

let userName;

function getHandle() {
    fetch('https://api.github.com/users/' + userName +'/repos')
        .then(response => response.json())
        .then(responseJson => showResults(responseJson))
        .catch(error => alert('No luck on our end.  Try again later'));
}

function showResults(responseJson) {
    $('.results-container').html(getHtmlList(responseJson));
}

function getHtmlList(repos) {
    const html = `<ul>${repos.reduce((listItems, currentItem) => {
        return listItems + 
        `<li>
            <a href="https://github.com/${currentItem.full_name}" target="_blank">
                ${currentItem.name}
            </a>
        </li>`;
    }, '')}</ul>`;
    return html;
}

function formListener() {
    $('form').submit(e => {
        e.preventDefault();
        userName = $('#handle-entry').val();
        getHandle();
    });
}

$(function() {
    console.log('App loaded! Waiting for submit');
    formListener();
});