(function($) {

  $('select[name="language-select"]').change(function(ev) {
    var $this = $(this);
    if($this.val() == 'en')
      document.cookie = 'locale=en_US';
    else if ($this.val() == 'ch')
      document.cookie = 'locale=zh_CN';
    else
      return false;

    window.location.href = window.location.href;
  });

})(jQuery);