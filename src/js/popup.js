import $ from 'jquery';
import axios from 'axios';

function normalizeProfileId(a){return a.trim().toLowerCase()}document.getElementById("addprofilebtn").addEventListener("click",function(){var a=normalizeProfileId(document.getElementById("profileid").value);window.open("https://www.google.com/maps/search/"+encodeURIComponent(a))});
$(document).ready(function(){});
