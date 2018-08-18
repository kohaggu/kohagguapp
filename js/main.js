// all client side js will be written here

    
$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('select').material_select();
});
CKEDITOR.replace('body',{
  plugins:'wysiwygarea,toolbar,basicstyles,link'
});