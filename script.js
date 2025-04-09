var cw = window.innerWidth,
    ch = window.innerHeight,
    nWaves = 5,
    waves = [],
    amp = 10,
    speed = 0.4,
    detail = 30,
    waveY = 0;

for (var w=0; w<nWaves; w++) {
    var p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    waves.push(p);
    $('#m').append(p);
     gsap.set(p, {attr:()=>{ return (w==0) ? {fill:'#fff'} : {fill:'none', stroke:'#fff', 'stroke-dasharray':'2 4', 'stroke-width':3-w/nWaves*3}}});
}


gsap.timeline({defaults:{duration:1}, delay:0.9})
    .from('.txt1', {opacity:0, ease:'power2.inOut'}, 0)
    .to(window, {scrollTo:ch/2}, 0);

gsap.ticker.add(drawWave);

function drawWave(t) { 
  if (waveY!=-$(window).scrollTop()) gsap.to(window, {duration:1, waveY:Math.round($(window).scrollTop())});
  
  for (var k=0; k<nWaves; k++) {
    var p = waves[k],
        offset = (1 - k/nWaves) * nWaves/6,
        pts = '';
    
    for(var i=-1; i<(cw+detail); i+=detail) {
      var y = ch-waveY;
      y += Math.sin(i * 0.003 - t/speed + offset) * amp;
      y += Math.sin(i * 0.004 - t/speed + offset) * amp;
      y += Math.sin(i * -0.011 - t/speed + 20+offset) * amp;
      pts += i.toFixed(2)+','+y.toFixed(2)+' ';
    }
    
    gsap.set(p, {attr:{points:'-20,-20 -20,'+ch/2+' '+pts+' '+cw+',-20'}});
  }  
}

$(window).on('resize', ()=>{ cw=window.innerWidth; ch=window.innerHeight; })

// Menu and Social Icons Interaction
var $menuIcon = $('.menu-icon');
var $menuItems = $('.menu-items');
var $contactSection = $('.contact-section');
var isMenuOpen = false;

$menuIcon.on('click', function() {
  if (!isMenuOpen) {
    // Open menu
    $menuItems.css('display', 'block');
    setTimeout(function() {
      $menuItems.addClass('visible');
    }, 10);
    
    // Animate menu icon
    $('.menu-line').each(function(index) {
      $(this).css('transform', index === 1 ? 'scaleX(0)' : 
        `rotate(${index === 0 ? '45' : '-45'}deg) translate(${index === 0 ? '0, 15' : '0, -15'})`);
    });
  } else {
    // Close menu
    $menuItems.removeClass('visible');
    setTimeout(function() {
      $menuItems.css('display', 'none');
    }, 300);
    
    // Reset menu icon
    $('.menu-line').css('transform', 'none');
  }
  isMenuOpen = !isMenuOpen;
});

// Handle contact link click
$('.contact-link').on('click', function(e) {
  e.preventDefault();
  $contactSection.css('display', 'block');
  setTimeout(function() {
    $contactSection.addClass('visible');
  }, 10);
  
  // Close menu
  $menuItems.removeClass('visible');
  setTimeout(function() {
    $menuItems.css('display', 'none');
  }, 300);
  $('.menu-line').css('transform', 'none');
  isMenuOpen = false;
});

// Close contact section when clicking outside
$(document).on('click', function(e) {
  if ($contactSection.hasClass('visible') && 
      !$(e.target).closest('.contact-section').length && 
      !$(e.target).closest('.contact-link').length) {
    $contactSection.removeClass('visible');
    setTimeout(function() {
      $contactSection.css('display', 'none');
    }, 300);
  }
});

// Scroll animation
var $window = $(window);
var $document = $(document);
var scrollDistance = $document.height() - $window.height();
var scrollPercent = 0;

$window.on('scroll', function() {
  scrollPercent = $window.scrollTop() / scrollDistance;
  
  // Update mask based on scroll
  var maskHeight = 1000 - (scrollPercent * 1000);
  var maskPath = `M0,0 L1000,0 L1000,${maskHeight} L0,${maskHeight} Z`;
  $('#m rect').attr('height', maskHeight);
});