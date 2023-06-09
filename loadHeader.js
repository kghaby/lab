// loadHeader.js

function getRepositoryName() {
  var url = window.location.href;
  var repoName = url.split('/')[3];
  return repoName;
}

function setDataPathAttributes() {
  var headerLinks = document.querySelectorAll("nav a, #home-link");
  headerLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    link.setAttribute("data-path", href);
  });
}

function updateHeaderLinks() {
  var repoName = getRepositoryName();
  var headerLinks = document.querySelectorAll("[data-path]");

  headerLinks.forEach(function (link) {
    var relativePath = link.getAttribute("data-path");
    link.href = "/" + repoName + "/" + relativePath;
    console.log("Updating header link to:", link.href); 
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var headerPlaceholder = document.getElementById("header-placeholder");

  var repoName = getRepositoryName();
  var headerPath = "/" + repoName + "/" +"header.html";

  console.log("Fetching header from:", headerPath); 

  fetch(headerPath)
    .then((response) => response.text())
    .then((html) => {
      headerPlaceholder.innerHTML = html;
      setDataPathAttributes();
      updateHeaderLinks();
    })
    .catch((err) => {
      console.warn("Something went wrong with loading the header:", err);
      headerPlaceholder.innerHTML = '<div class="error-message">Error loading header: ' + err + '</div>';
    });
});