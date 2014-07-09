n = document.getElementById('navigation')
navi = ->
	if window.innerWidth<720 and !document.getElementById("toggle-nav")?
		n.classList.add('is-closed')
		n.insertAdjacentHTML('afterBegin','<div id="toggle-nav"><p class="visually-hidden">&#9776;</p></div>')
		t = document.getElementById('toggle-nav')  
		t.onclick = -> n.classList.toggle('is-closed')
	if window.innerWidth>=720 and document.getElementById("toggle-nav")
		n.classList.remove('is-closed')
		document.getElementById("toggle-nav").outerHTML=""
navi()
window.addEventListener('resize', navi)
